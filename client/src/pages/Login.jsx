import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const uri = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/feed");
		}
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${uri}/api/auth/login`, {
				email,
				password,
			});

			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			localStorage.setItem("auth", "true"); // 👈 add this for ProtectedRoute check

			navigate("/feed");
		} catch (err) {
			console.error("Login Error:", err?.response?.data || err.message);
			alert("Login failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-cream px-4">
			<div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
				<h1 className="text-3xl text-center text-igBlue font-retro mb-4">
					Instagram
				</h1>
				<p className="text-center text-sm text-gray-500 mb-6 font-retro">
					A beautiful way to share your world
				</p>

				<form onSubmit={handleLogin} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 rounded-md border border-lightBrown focus:outline-none focus:ring-2 focus:ring-igBlue"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 rounded-md border border-lightBrown focus:outline-none focus:ring-2 focus:ring-igBlue"
					/>
					<button
						type="submit"
						className="hover:cursor-pointer hover:bg-[#4f6595] w-full bg-[#3b5998] text-white font-semibold py-2 rounded-md shadow-md hover:bg-opacity-90 transition"
					>
						Log in
					</button>
				</form>

				<div className="mt-6 text-center text-sm text-gray-600 font-retro">
					Don't have an account?{" "}
					<Link to="/signup" className="text-igBlue font-bold">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
