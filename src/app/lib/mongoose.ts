
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

let isConnected: boolean = false;

const dbConnect = async () => {
    if (isConnected) {
      return;
    }
  
    try {
      const db = await mongoose.connect(MONGODB_URI);
  
      isConnected = db.connections[0].readyState === 1;
      console.log("MongoDB conectado con éxito!");
    } catch (error) {
      console.error("Error conectando a MongoDB:", error);
      throw error;
    }
  };

export default dbConnect;
