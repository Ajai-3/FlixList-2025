import mongoose from "mongoose";

//=====================================================================================================================//
//  CONNECT TO MONGODB
//=====================================================================================================================//
// This function connects to MongoDB using the MONGO_URL environment variable
//=====================================================================================================================//
const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not defined");
    }

    await mongoose.connect(mongoUrl!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
