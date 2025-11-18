import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Since we're in a .mjs file, we need to load environment variables manually
// or use dotenv. For simplicity, we'll require it from process.env
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my-game-dev-portfolio';

// User Schema (matches the model)
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'marketing', 'blogger', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(String(this.password), salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models?.User || mongoose.model('User', UserSchema);

async function seedAdmin() {
  if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI environment variable is not set');
    console.error('Please set MONGODB_URI in your .env.local file');
    console.error('Or export it: export MONGODB_URI="your-connection-string"');
    process.exit(1);
  }

  try {
    console.log('🔌 Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to database');

    // Get admin credentials from environment variables (with fallback defaults)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@UnityDevs.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'temp123';
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() }).select('+password');

    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      console.log('   Skipping creation...');
    } else {
      // Create admin user - password will be hashed by pre-save hook
      const adminUser = await User.create({
        email: adminEmail.toLowerCase(),
        password: adminPassword, // Will be hashed automatically
        name: adminName,
        role: 'admin',
      });

      console.log('✅ Admin user created successfully!');
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Name: ${adminUser.name}`);
      console.log(`   Role: ${adminUser.role}`);
      console.log(`   Password: ${adminPassword}`);
      console.log('\n⚠️  IMPORTANT: Please change the default password after first login!');
    }

    await mongoose.disconnect();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message || error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

seedAdmin();





