import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "instagram-posts", // You can change the folder name
		allowed_formats: ["jpg", "png", "jpeg"],
		transformation: [{ width: 500, height: 500, crop: "limit" }],
	},
});

const parser = multer({ storage });

export default parser;
