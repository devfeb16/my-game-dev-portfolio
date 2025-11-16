import connectDB from '@/lib/mongodb';
import Blog, { BlogStatus } from '@/models/Blog';
import { requireAuth } from '@/middleware/auth';
import { UserRole } from '@/models/User';

// Admin-only endpoint for approving/rejecting blogs
export default requireAuth(async (req, res, user) => {
  await connectDB();

  // Only admins can access this endpoint
  if (user.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: 'Forbidden - Admin access required' });
  }

  const { id } = req.query;

  if (req.method === 'POST') {
    try {
      const { action, rejectionReason, adminNotes } = req.body;

      if (!action || !['approve', 'reject'].includes(action)) {
        return res.status(400).json({ error: 'Action must be either "approve" or "reject"' });
      }

      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      if (action === 'approve') {
        blog.status = BlogStatus.PUBLISHED;
        blog.published = true;
        if (!blog.publishedAt) {
          blog.publishedAt = new Date();
        }
        if (adminNotes) {
          blog.adminNotes = adminNotes;
        }
        blog.rejectionReason = undefined; // Clear rejection reason if approving
      } else if (action === 'reject') {
        blog.status = BlogStatus.REJECTED;
        blog.published = false;
        if (rejectionReason) {
          blog.rejectionReason = rejectionReason;
        }
        if (adminNotes) {
          blog.adminNotes = adminNotes;
        }
      }

      await blog.save();

      const populatedBlog = await Blog.findById(blog._id).populate('author', 'name email');

      return res.status(200).json({
        success: true,
        blog: populatedBlog,
        message: action === 'approve'
          ? 'Blog approved and published successfully.'
          : 'Blog rejected successfully.',
      });
    } catch (error) {
      console.error('Approve/reject blog error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
});

