import mongoose from "mongoose";

type ConnectionObejct = {
  isConnected?: number;
};

const connection: ConnectionObejct = {};

const connectDB = async () => {
  if (connection.isConnected) {
    console.log("DB Already Connected!");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    const res = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = res.connections[0].readyState;

    console.log("DB Connection Successfull..!");
  } catch (error) {
    console.log("Error while connecting DB", error);
    process.exit(1);
  }
};

export default connectDB;
