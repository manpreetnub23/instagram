import express from "express";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import postRoutes from "../routes/postRoutes.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use(
	cors({
		origin: ["https://instagram-plum-eight.vercel.app/"],
		credentials: true,
	})
);

export default app;
