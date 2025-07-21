import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "../config/db.js";

dotenv.config();

const startServer = async () => {
	try {
		await connectDB();
		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`✅ Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error("Error starting server:", err.message);
	}
};

startServer();
