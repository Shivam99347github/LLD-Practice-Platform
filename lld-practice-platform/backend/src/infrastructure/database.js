import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("MONGODB_URI not set. Using in-memory repository.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.warn("MongoDB unavailable. Falling back to in-memory repository.");
  }
}
