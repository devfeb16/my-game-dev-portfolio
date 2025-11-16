import connectDB from '@/lib/mongodb';
import Blog, { BlogStatus } from '@/models/Blog';
import { requireAuth } from '@/middleware/auth';
import { UserRole } from '@/models/User';

export default requireAuth(async (req, res, user) => {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findById(id).populate('author', 'name email').populate('relatedPosts', 'title slug featuredImage');

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Check permissions - handle both populated and non-populated author
      const authorId = typeof blog.author === 'object' && blog.author !== null 
        ? blog.author._id.toString() 
        : blog.author.toString();
      
      // Only published blogs are public, unless user is author or admin
      if (blog.status !== BlogStatus.PUBLISHED && authorId !== user.userId && user.role !== UserRole.ADMIN) {
        return res.status(403).json({ error: 'Forbidden - This blog is not published' });
      }

      // Increment views only for published blogs
      if (blog.status === BlogStatus.PUBLISHED) {
        blog.views += 1;
        await blog.save();
      }

      return res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      console.error('Get blog error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Check permissions - blog.author is ObjectId, not populated
      const isAuthor = blog.author.toString() === user.userId;
      const isAdmin = user.role === UserRole.ADMIN;

      if (!isAuthor && !isAdmin) {
        return res.status(403).json({ error: 'Forbidden - You can only edit your own blogs' });
      }

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
        published,
      } = req.body;

      // Update fields
      if (title) blog.title = title;
      if (content) blog.content = content;
      if (excerpt !== undefined) blog.excerpt = excerpt;
      if (slug) blog.slug = slug;
      if (featuredImage !== undefined) blog.featuredImage = featuredImage;
      if (featuredImageAlt !== undefined) blog.featuredImageAlt = featuredImageAlt;
      if (ogImage !== undefined) blog.ogImage = ogImage;
      if (ogImageAlt !== undefined) blog.ogImageAlt = ogImageAlt;
      if (metaTitle !== undefined) blog.metaTitle = metaTitle;
      if (metaDescription !== undefined) blog.metaDescription = metaDescription;
      if (metaKeywords !== undefined) blog.metaKeywords = metaKeywords;
      if (focusKeyword !== undefined) blog.focusKeyword = focusKeyword;
      if (ogTitle !== undefined) blog.ogTitle = ogTitle;
      if (ogDescription !== undefined) blog.ogDescription = ogDescription;
      if (ogType !== undefined) blog.ogType = ogType;
      if (twitterCard !== undefined) blog.twitterCard = twitterCard;
      if (twitterTitle !== undefined) blog.twitterTitle = twitterTitle;
      if (twitterDescription !== undefined) blog.twitterDescription = twitterDescription;
      if (twitterImage !== undefined) blog.twitterImage = twitterImage;
      if (category !== undefined) blog.category = category;
      if (tags !== undefined) blog.tags = tags;
      if (canonicalUrl !== undefined) blog.canonicalUrl = canonicalUrl;
      if (schemaType !== undefined) blog.schemaType = schemaType;
      if (relatedPosts !== undefined) blog.relatedPosts = relatedPosts;

      // Handle status and publishing - only admins can directly publish
      if (isAdmin) {
        if (status !== undefined) {
          blog.status = status;
          if (status === BlogStatus.PUBLISHED) {
            blog.published = true;
            if (!blog.publishedAt) {
              blog.publishedAt = new Date();
            }
          } else if (status !== BlogStatus.PUBLISHED) {
            blog.published = false;
          }
        } else if (published !== undefined) {
          blog.published = published;
          if (published) {
            blog.status = BlogStatus.PUBLISHED;
            if (!blog.publishedAt) {
              blog.publishedAt = new Date();
            }
          }
        }
      } else if (isAuthor) {
        // Authors can submit for review
        if (status === BlogStatus.PENDING_REVIEW || published === true) {
          blog.status = BlogStatus.PENDING_REVIEW;
          blog.published = false;
        } else if (status === BlogStatus.DRAFT) {
          blog.status = BlogStatus.DRAFT;
          blog.published = false;
        }
        // Authors cannot directly publish
        if (status === BlogStatus.PUBLISHED) {
          blog.status = BlogStatus.PENDING_REVIEW;
          blog.published = false;
        }
      }

      await blog.save();

      const populatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

      return res.status(200).json({
        success: true,
        blog: populatedBlog,
        message: blog.status === BlogStatus.PENDING_REVIEW && !isAdmin
          ? 'Blog updated and submitted for review.'
          : 'Blog updated successfully.',
      });
    } catch (error) {
      console.error('Update blog error:', error);
      
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Slug already exists' });
      }

      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Check permissions - blog.author is ObjectId, not populated
      if (blog.author.toString() !== user.userId && user.role !== UserRole.ADMIN) {
        return res.status(403).json({ error: 'Forbidden - You can only delete your own blogs' });
      }

      await Blog.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
      });
    } catch (error) {
      console.error('Delete blog error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
});

