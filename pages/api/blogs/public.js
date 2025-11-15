import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectDB();

  try {
    const { page = '1', limit = '10', tag } = req.query;

    const query = {
      published: true, // Only published blogs for public access
    };

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find(query)
      .populate('author', 'name email')
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

