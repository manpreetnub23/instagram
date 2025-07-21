// components/BottomNavbar.jsx
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineSearch } from "react-icons/md";
import { FaPlusSquare, FaHeart, FaUser } from "react-icons/fa";

const BottomNavbar = () => {
	return (
		<div className="fixed bottom-0 left-0 right-0 bg-[#2f2f2f] px-6 py-2 flex justify-between items-center z-50 shadow-inner">
			<AiFillHome className="text-2xl text-white" />
			<MdOutlineSearch className="text-2xl text-white" />
			<FaPlusSquare className="text-2xl text-white" />
			<FaHeart className="text-2xl text-white" />
			<FaUser className="text-2xl text-white" />
		</div>
	);
};

export default BottomNavbar;
