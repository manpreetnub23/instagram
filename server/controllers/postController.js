import Post from "../models/Post.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
	try {
		const { userId, caption, imageUrl } = req.body;
		console.log("Post create request:", { userId, caption, imageUrl }); // 👈 Add this

		if (!userId || !imageUrl || !caption) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const post = new Post({
			userId: new mongoose.Types.ObjectId(userId),
			caption,
			imageUrl,
		});
		await post.save();

		res.status(201).json(post);
	} catch (err) {
		console.error("Error in createPost:", err); // 👈 Add this
		res.status(500).json({ error: err.message });
	}
};

export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find()
			.sort({ createdAt: -1 })
			.populate("userId", "username profilePic");
		res.json(posts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Like a post
export const likePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) return res.status(404).json({ error: "Post not found" });

		if (!Array.isArray(post.likes)) post.likes = [];

		if (post.likes.some((id) => id.toString() === req.user.id)) {
			// Unlike
			post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
		} else {
			// Like
			post.likes.push(req.user.id);
		}

		await post.save();
		res.json(post);
	} catch (err) {
		console.error("Like Error:", err);
		res.status(500).json({ error: "Failed to like/unlike post" });
	}
};

// Add comment
export const comments = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) return res.status(404).json({ error: "Post not found" });

		const comment = {
			userId: req.user.id,
			username: req.user.username, // if stored in token
			text: req.body.text,
		};

		post.comments.push(comment);
		await post.save();

		res.status(201).json(comment);
	} catch (err) {
		res.status(500).json({ error: "Server error" });
	}
};

// get comments.
export const getComments = async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId).populate(
			"comments.userId",
			"username"
		);

		if (!post) return res.status(404).json({ error: "Post not found" });

		res.status(200).json(post.comments);
	} catch (err) {
		console.error("Error getting comments:", err);
		res.status(500).json({ error: "Server error" });
	}
};
