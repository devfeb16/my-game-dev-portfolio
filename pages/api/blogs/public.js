import connectDB from '@/lib/mongodb';
import Blog, { BlogStatus } from '@/models/Blog';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectDB();

  try {
    const { page = '1', limit = '10', tag, category, slug } = req.query;

    // If slug is provided, return single blog
    if (slug) {
      const blog = await Blog.findOne({
        slug,
        status: BlogStatus.PUBLISHED,
        published: true,
      })
        .populate('author', 'name email')
        .populate('relatedPosts', 'title slug featuredImage excerpt')
        .lean();

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Increment views
      await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

      return res.status(200).json({
        success: true,
        blog,
      });
    }

    // Otherwise, return paginated list
    const query = {
      status: BlogStatus.PUBLISHED,
      published: true, // Only published blogs for public access
    };

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
      .select('-content') // Don't send full content in list view
      .sort({ publishedAt: -1, createdAt: -1 })
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
    console.error('Get public blogs error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

