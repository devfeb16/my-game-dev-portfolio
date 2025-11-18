import connectDB from '@/lib/mongodb';
import User, { UserRole } from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Get admin credentials from environment variables (with fallback defaults)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@UnityDevs.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'temp123';
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        message: 'Admin user already exists',
        exists: true,
        user: {
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role,
        },
      });
    }

    // Create admin user - password will be hashed automatically by pre-save hook
    const adminUser = await User.create({
      email: adminEmail.toLowerCase(),
      password: adminPassword, // Will be hashed by pre-save hook
      name: adminName,
      role: UserRole.ADMIN,
    });

    return res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
      note: 'Please change the default password after first login',
    });
  } catch (error) {
    console.error('Init admin error:', error);
    
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: 'Admin user already exists',
        exists: true,
      });
    }

    return res.status(500).json({ 
      error: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}





