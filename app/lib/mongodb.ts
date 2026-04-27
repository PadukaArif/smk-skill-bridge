import mongoose from "mongoose";

const connectMongoDB = async () => {
  let isConnect = false
  if(!isConnect){
    try {
      if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected");
        isConnect = true
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }
}

export default connectMongoDB;
