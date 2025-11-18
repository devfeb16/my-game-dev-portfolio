import mongoose from 'mongoose';
import { ensureAdminUser } from './init-admin';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my-game-dev-portfolio';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose || { conn: null, promise: null };
let adminInitPromise = null;

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (mongoose) => {
      // Auto-initialize admin user on first connection
      if (!adminInitPromise) {
        adminInitPromise = ensureAdminUser().catch((err) => {
          console.error('Failed to initialize admin user:', err);
        });
      }
      await adminInitPromise;
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;

