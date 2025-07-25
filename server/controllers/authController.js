import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ error: "User already exists" });
		}

		const hashed = await bcrypt.hash(password, 10);
		const newUser = new User({ username, email, password: hashed });
		await newUser.save();

		res.status(201).json({ message: "User registered" });
	} catch (err) {
		console.error("Register Error:", err);
		res.status(500).json({ error: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: "User not found" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

		console.log(process.env.JWT_SECRET);
		const token = jwt.sign(
			{ id: user._id, username: user.username }, // 👈 add username here
			process.env.JWT_SECRET,
			{ expiresIn: "7d" }
		);

		res.json({
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		console.error("Login Error:", err);
		res.status(500).json({ error: err.message });
	}
};
