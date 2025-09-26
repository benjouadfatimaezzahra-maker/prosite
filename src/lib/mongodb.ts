import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

/**
 * Extend the global type so TypeScript knows
 * about our cached mongoose connection
 */
declare global {
  // `var` because we'll assign on runtime
  // eslint-disable-next-line no-var
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

// Create or reuse the cache object
const cached =
  globalThis.mongooseCache ||
  (globalThis.mongooseCache = { conn: null, promise: null });

/**
 * Connect to MongoDB (reuse connection across hot reloads)
 */
export async function connectDB() {
  if (cached.conn) {
    // Already connected
    return cached.conn;
  }

  if (!cached.promise) {
    // First time connecting
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  // Await and store the live connection
  cached.conn = await cached.promise;
  return cached.conn;
}
