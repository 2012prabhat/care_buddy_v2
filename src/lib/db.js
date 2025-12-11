import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "appointment", // your DB name
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB connected ✔️");
  } catch (err) {
    console.error("MongoDB connection error ❌", err.message);
    throw err;
  }
}
