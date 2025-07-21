import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		const storedUser = JSON.parse(localStorage.getItem("user"));

		if (
			storedUser &&
			storedUser.email === email &&
			storedUser.password === password
		) {
			localStorage.setItem("auth", "true");
			navigate("/feed");
		} else {
			alert("Invalid credentials!");
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
					<a href="/signup" className="text-igBlue font-bold">
						Sign up
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
