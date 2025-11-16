import connectDB from '@/lib/mongodb';
import Blog, { BlogStatus } from '@/models/Blog';
import { requireAuth } from '@/middleware/auth';
import { UserRole } from '@/models/User';

export default requireAuth(async (req, res, user) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { status, published, page = '1', limit = '10', author, tag, category } = req.query;

      const query = {};

      // Role-based filtering
      if (user.role === UserRole.ADMIN) {
        // Admins can see all blogs, filter by status if provided
        if (status) {
          query.status = status;
        } else if (published !== undefined) {
          query.published = published === 'true';
        }
      } else {
        // Non-admins can only see published blogs or their own unpublished blogs
        query.$or = [
          { published: true, status: BlogStatus.PUBLISHED },
          { author: user.userId },
        ];
      }

      if (author) {
        query.author = author;
      }

      if (tag) {
        query.tags = { $in: [tag] };
      }

      if (category) {
        query.category = category;
      }

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;

      const blogs = await Blog.find(query)
        .populate('author', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean();

      const total = await Blog.countDocuments(query);

      return res.status(200).json({
        success: true,
        blogs,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      console.error('Get blogs error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        title,
        content,
        excerpt,
        slug,
        featuredImage,
        featuredImageAlt,
        ogImage,
        ogImageAlt,
        metaTitle,
        metaDescription,
        metaKeywords,
        focusKeyword,
        ogTitle,
        ogDescription,
        ogType,
        twitterCard,
        twitterTitle,
        twitterDescription,
        twitterImage,
        category,
        tags,
        canonicalUrl,
        schemaType,
        relatedPosts,
        status,
      } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      // Determine initial status
      let initialStatus = status || BlogStatus.DRAFT;
      let shouldPublish = false;

      // Only admins can directly publish or set status
      if (user.role === UserRole.ADMIN) {
        if (status === BlogStatus.PUBLISHED) {
          shouldPublish = true;
        }
      } else {
        // Non-admins: if they try to publish, set to pending_review
        if (status === BlogStatus.PUBLISHED || req.body.published) {
          initialStatus = BlogStatus.PENDING_REVIEW;
        }
      }

      const blogData = {
        title,
        content,
        excerpt,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        featuredImage,
        featuredImageAlt,
        ogImage,
        ogImageAlt,
        metaTitle,
        metaDescription,
        metaKeywords: metaKeywords || [],
        focusKeyword,
        ogTitle,
        ogDescription,
        ogType: ogType || 'article',
        twitterCard: twitterCard || 'summary_large_image',
        twitterTitle,
        twitterDescription,
        twitterImage,
        category,
        tags: tags || [],
        canonicalUrl,
        schemaType: schemaType || 'Article',
        relatedPosts: relatedPosts || [],
        status: initialStatus,
        published: shouldPublish,
        author: user.userId,
      };

      const blog = await Blog.create(blogData);

      const populatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

      return res.status(201).json({
        success: true,
        blog: populatedBlog,
        message: initialStatus === BlogStatus.PENDING_REVIEW
          ? 'Blog submitted for review. It will be published after admin approval.'
          : 'Blog created successfully.',
      });
    } catch (error) {
      console.error('Create blog error:', error);
      
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Slug already exists' });
      }

      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
});

