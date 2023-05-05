import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URL=process.env.mongodb;

export const dbConnect = async () => {
    try{
        mongoose.set("strictQuery", false);
        mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB Atlas!");
    }
    catch(err){
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(err);
    }
  }

