import mongoose from "mongoose";

const MONGODB_URI:string = process.env.MONGODB_URI!;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState > 1) {
      return;
    }
    await mongoose.connect(MONGODB_URI)
    console.log("mongoDB tersambung")
  } catch (error) {
    console.error(error);
  }
};
