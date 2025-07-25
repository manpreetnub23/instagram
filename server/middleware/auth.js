import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ error: "No token, unauthorized" });

	try {
		console.log(token);
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded, "yahan tak toh pahuncha hi nahi hai");
		req.user = {
			id: decoded.id,
			username: decoded.username || null, // optional fallback
		};
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid token" });
	}
};
