import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineSearch } from "react-icons/md";
import { FaPlusSquare, FaHeart, FaUser } from "react-icons/fa";

const BottomNavbar = () => {
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem("user"));

	const navItems = [
		{ icon: <AiFillHome />, to: "/feed" },
		{ icon: <MdOutlineSearch />, to: "/search" },
		{ icon: <FaPlusSquare />, to: "/upload" },
		{ icon: <FaHeart />, to: "/likes" },
		{ icon: <FaUser />, to: user ? `/profile/${user.username}` : "/login" },
	];

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-[#2f2f2f] px-6 py-3 flex justify-between items-center z-50 shadow-inner">
			{navItems.map((item, index) => (
				<div
					key={index}
					className="text-white text-2xl cursor-pointer"
					onClick={() => navigate(item.to)}
				>
					{item.icon}
				</div>
			))}
		</div>
	);
};

export default BottomNavbar;
