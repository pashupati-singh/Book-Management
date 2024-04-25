import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const connected = mongoose.connect(process.env.URL)