import mongoose from "mongoose"



export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);

    console.log("DB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};