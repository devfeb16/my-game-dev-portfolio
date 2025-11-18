import connectDB from '@/lib/mongodb';
import User, { UserRole } from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const adminEmail = 'admin@UnityDevs.com';
    const adminPassword = 'temp123';
    const adminName = 'Admin User';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        message: 'Admin user already exists',
        exists: true,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin user
    const adminUser = await User.create({
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
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





