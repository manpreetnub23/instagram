// server/api/config/cloudinary.config.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
	cloud_name: "dcz9nhtrk",
	api_key: "212162432985637",
	api_secret: process.env.API_SECRET,
});

export default cloudinary;
