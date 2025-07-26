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

export const followUser = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.id);
		const targetUser = await User.findById(req.params.id);

		if (!targetUser || !currentUser) {
			return res.status(404).json({ error: "User not found" });
		}

		if (!targetUser.followers.includes(currentUser._id)) {
			targetUser.followers.push(currentUser._id);
			currentUser.following.push(targetUser._id);

			await targetUser.save();
			await currentUser.save();
		}

		res.status(200).json({ success: true, message: "Followed" });
	} catch (err) {
		console.error("Follow error:", err);
		res.status(500).json({ error: "Failed to follow user" });
	}
};

// @desc   Unfollow a user
// @route  POST /api/users/:id/unfollow
export const unfollowUser = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.id);
		const targetUser = await User.findById(req.params.id);

		if (!targetUser || !currentUser) {
			return res.status(404).json({ error: "User not found" });
		}

		targetUser.followers = targetUser.followers.filter(
			(id) => id.toString() !== currentUser._id.toString()
		);
		currentUser.following = currentUser.following.filter(
			(id) => id.toString() !== targetUser._id.toString()
		);

		await targetUser.save();
		await currentUser.save();

		res.status(200).json({ success: true, message: "Unfollowed" });
	} catch (err) {
		console.error("Unfollow error:", err);
		res.status(500).json({ error: "Failed to unfollow user" });
	}
};
