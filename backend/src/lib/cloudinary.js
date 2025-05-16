import { v2 as cloudinary } from "cloudinary"; // Getting version 2 of the cloudinary api
import { config } from "dotenv";

// For env variables
config();

// Basically using dotenv to get env variables for cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
