import express from "express";
import {
	createPost,
	getAllPosts,
	likePost,
	comments,
} from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";
import { getComments } from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost); // ✅ plain JSON
router.get("/", getAllPosts);
router.put("/:postId/like", likePost);
router.post("/:postId/comments", protect, comments);
router.get("/:postId/comments", getComments);

export default router;
