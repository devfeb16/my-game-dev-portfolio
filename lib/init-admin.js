import User from '@/models/User';
import { UserRole } from '@/lib/constants';

let adminInitialized = false;

/**
 * Ensures the default admin user exists in the database
 * This runs automatically on server startup
 */
export async function ensureAdminUser() {
  // Prevent multiple initializations
  if (adminInitialized) {
    return;
  }

  try {
    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@UnityDevs.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'temp123';
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.email);
      adminInitialized = true;
      return { exists: true, user: existingAdmin };
    }

    // Create admin user - password will be hashed automatically by pre-save hook
    const adminUser = await User.create({
      email: adminEmail.toLowerCase(),
      password: adminPassword, // Will be hashed by pre-save hook
      name: adminName,
      role: UserRole.ADMIN,
    });

    console.log('✅ Admin user created successfully:', adminUser.email);
    adminInitialized = true;
    return { created: true, user: adminUser };
  } catch (error) {
    // If user already exists (race condition), that's fine
    if (error.code === 11000) {
      console.log('✅ Admin user already exists (duplicate key)');
      adminInitialized = true;
      return { exists: true };
    }
    
    console.error('❌ Error ensuring admin user:', error.message);
    // Don't throw - we don't want to crash the app if admin init fails
    return { error: error.message };
  }
}

