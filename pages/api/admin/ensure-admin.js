import connectDB from '@/lib/mongodb';
import User, { UserRole } from '@/models/User';
import bcrypt from 'bcryptjs';

// This endpoint ensures the default admin user exists and can be used to reset it
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

    // Check if admin user exists
    let adminUser = await User.findOne({ email: adminEmail.toLowerCase() }).select('+password');

    if (adminUser) {
      // Verify password works - if not, reset it
      const passwordValid = await adminUser.comparePassword(adminPassword);
      
      if (!passwordValid) {
        // Password doesn't match - reset it
        adminUser.password = adminPassword; // Will be re-hashed by pre-save hook
        adminUser.role = UserRole.ADMIN; // Ensure role is correct
        await adminUser.save();
        
        return res.status(200).json({
          success: true,
          message: 'Admin user password reset successfully',
          action: 'reset',
          user: {
            email: adminUser.email,
            name: adminUser.name,
            role: adminUser.role,
          },
        });
      }

      // User exists and password is correct
      return res.status(200).json({
        success: true,
        message: 'Admin user exists and is ready',
        action: 'exists',
        user: {
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
        },
      });
    }

    // Create admin user - password will be hashed automatically by pre-save hook
    adminUser = await User.create({
      email: adminEmail.toLowerCase(),
      password: adminPassword, // Will be hashed by pre-save hook
      name: adminName,
      role: UserRole.ADMIN,
    });

    return res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      action: 'created',
      user: {
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
      credentials: {
        email: adminEmail,
        password: adminPassword,
      },
      note: 'Please change the default password after first login',
    });
  } catch (error) {
    console.error('Ensure admin error:', error);
    
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: 'Admin user already exists',
        action: 'exists',
      });
    }

    return res.status(500).json({ 
      error: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

