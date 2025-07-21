import Post from "../models/Post.js";

export const createPost = async (req, res) => {
	try {
		const { userId, caption } = req.body;
		const imageUrl = `/uploads/${req.file.filename}`;

		const post = new Post({ userId, caption, imageUrl });
		await post.save();

		res.status(201).json(post);
	} catch (err) {
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
