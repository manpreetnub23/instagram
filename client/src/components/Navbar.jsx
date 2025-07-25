// components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full bg-gradient-to-r from-[#315d94] to-[#6191c2] text-center py-5 shadow-sm fixed top-0 left-0 z-50 border-b border-lightBrown">
			<h1
				className="text-2xl text-white font-retro tracking-wide"
				onClick={() => navigate("/")}
			>
				Instagram
			</h1>
		</div>
	);
};

export default Navbar;
