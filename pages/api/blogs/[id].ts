import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { requireAuth } from '@/middleware/auth';
import { UserRole } from '@/models/User';

export default requireAuth(async (req, res, user) => {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findById(id).populate('author', 'name email');

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Check permissions - handle both populated and non-populated author
      const authorId = typeof blog.author === 'object' && blog.author !== null 
        ? (blog.author as any)._id.toString() 
        : blog.author.toString();
      
      if (!blog.published && authorId !== user.userId && user.role !== UserRole.ADMIN) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Increment views
      blog.views += 1;
      await blog.save();

      return res.status(200).json({
        success: true,
        blog,
      });
    } catch (error: any) {
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
      if (blog.author.toString() !== user.userId && user.role !== UserRole.ADMIN) {
        return res.status(403).json({ error: 'Forbidden - You can only edit your own blogs' });
      }

      const { title, content, excerpt, slug, featuredImage, tags, published } = req.body;

      if (title) blog.title = title;
      if (content) blog.content = content;
      if (excerpt !== undefined) blog.excerpt = excerpt;
      if (slug) blog.slug = slug;
      if (featuredImage !== undefined) blog.featuredImage = featuredImage;
      if (tags) blog.tags = tags;
      if (published !== undefined) blog.published = published;

      await blog.save();

      const populatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

      return res.status(200).json({
        success: true,
        blog: populatedBlog,
      });
    } catch (error: any) {
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
    } catch (error: any) {
      console.error('Delete blog error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
});

