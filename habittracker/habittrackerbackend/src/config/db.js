import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("db connected successfully");
  } catch (error) {
    console.log("error while connecting to db ", error);
  }
};
