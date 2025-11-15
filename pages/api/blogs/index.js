import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { requireAuth } from '@/middleware/auth';
import { UserRole } from '@/models/User';

export default requireAuth(async (req, res, user) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { published, page = '1', limit = '10', author, tag } = req.query;

      const query = {};

      // Role-based filtering
      if (user.role !== UserRole.ADMIN) {
        // Non-admins can only see published blogs or their own
        query.$or = [
          { published: true },
          { author: user.userId },
        ];
      } else if (published !== undefined) {
        // Admins can filter by published status
        query.published = published === 'true';
      }

      if (author) {
        query.author = author;
      }

      if (tag) {
        query.tags = { $in: [tag] };
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
      const { title, content, excerpt, slug, featuredImage, tags, published } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const blog = await Blog.create({
        title,
        content,
        excerpt,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        featuredImage,
        tags: tags || [],
        published: published || false,
        author: user.userId,
      });

      const populatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

      return res.status(201).json({
        success: true,
        blog: populatedBlog,
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

