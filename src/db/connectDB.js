import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connectionIntance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(
      `MongoDB Connected Successfully: ${connectionIntance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed:`, error);
  }
}
