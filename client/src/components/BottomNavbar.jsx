import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineSearch } from "react-icons/md";
import { FaPlusSquare, FaHeart, FaUser } from "react-icons/fa";

const BottomNavbar = () => {
	const navigate = useNavigate();

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-[#2f2f2f] px-6 py-4 flex justify-between items-center z-50 shadow-inner">
			<AiFillHome
				className="text-3xl text-white"
				onClick={() => navigate("/feed")}
			/>
			<MdOutlineSearch className="text-3xl text-white" />
			<FaPlusSquare
				className="text-3xl text-white"
				onClick={() => navigate("/upload")} // 👈 GO TO UPLOAD PAGE
			/>
			<FaHeart className="text-3xl text-white" />
			<FaUser className="text-3xl text-white" />
		</div>
	);
};

export default BottomNavbar;
