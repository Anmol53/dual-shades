import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database using the provided URI.
 * Implements connection pooling and caching to prevent unnecessary connections.
 *
 * @returns {Promise<mongoose.Connection>} - A promise that resolves to the MongoDB connection.
 *
 * @throws {Error} - Throws an error if the MONGODB_URI environment variable is not defined.
 *
 * @example
 * import connectToDatabase from './database';
 *
 * (async () => {
 *   try {
 *     const db = await connectToDatabase();
 *     const users = await db.collection('users').find().toArray();
 *     console.log('Fetched users:', users);
 *   } catch (error) {
 *     console.error('Failed to connect to the database:', error.message);
 *   }
 * })();
 */
async function connectToDatabase() {
  // Check if a connection is already cached
  if (cached.conn) {
    return cached.conn;
  }

  // Check if a connection promise is already in progress
  if (!cached.promise) {
    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // Await the connection promise and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
