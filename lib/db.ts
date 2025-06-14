import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Define interface for the mongoose cache
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Define global mongoose cache type
declare global {
  var mongoose: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      tls: true
    };

    try {
      cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts).catch(err => {
        console.error('Mongoose Connection Error:', err);
        throw err;
      });
    } catch (error) {
      console.error('MongoDB Connection Error:', error);
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB Connected Successfully');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
} 