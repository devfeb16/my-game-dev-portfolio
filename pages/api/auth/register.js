import connectDB from '@/lib/mongodb';
import User, { UserRole } from '@/models/User';
import { generateToken, setAuthCookie } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user - always default to USER role
    const user = await User.create({
      email,
      password,
      name,
      role: UserRole.USER,
    });

    // Generate token
    const token = generateToken(user);

    // Set cookie
    setAuthCookie(res, token);

    // Return user data (without password)
    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

