import User from "../models/User.js";
import Post from "../models/Post.js";

export const getUserProfile = async (req, res) => {
	try {
		const { username } = req.params;

		const user = await User.findOne({ username }).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 });

		res.json({
			user,
			posts,
		});
	} catch (err) {
		console.error("Error fetching profile:", err);
		res.status(500).json({ message: "Server error" });
	}
};

// ✅ Secure bio update
export const updateUserBio = async (req, res) => {
	try {
		const { bio } = req.body;
		const userId = req.user.id;

		const user = await User.findByIdAndUpdate(
			userId,
			{ bio },
			{ new: true }
		).select("-password");

		res.json(user);
	} catch (err) {
		console.error("Bio update failed:", err);
		res.status(500).json({ message: "Error updating bio" });
	}
};

// ✅ Secure avatar update
export const updateUserAvatar = async (req, res) => {
	try {
		const userId = req.user.id;

		if (!req.file || !req.file.path) {
			return res.status(400).json({ message: "No file uploaded" });
		}

		const user = await User.findByIdAndUpdate(
			userId,
			{ avatar: req.file.path },
			{ new: true }
		).select("-password");

		res.json({ avatar: user.avatar });
	} catch (err) {
		console.error("Avatar upload error:", err);
		res.status(500).json({ message: "Error uploading avatar" });
	}
};

// controllers/userController.js

export const updateUsername = async (req, res) => {
	try {
		const userId = req.user.id;
		const { username } = req.body;

		// check if username is taken
		const existingUser = await User.findOne({ username });
		if (existingUser && existingUser._id.toString() !== userId) {
			return res.status(400).json({ message: "Username already taken" });
		}

		const user = await User.findByIdAndUpdate(
			userId,
			{ username },
			{ new: true }
		).select("-password");

		res.json(user);
	} catch (err) {
		console.error("Username update failed:", err);
		res.status(500).json({ message: "Error updating username" });
	}
};
