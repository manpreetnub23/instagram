// components/FeedCard.jsx
import React from "react";

const FeedCard = ({ username, image, caption, profileImage }) => {
	return (
		<div className="bg-white rounded-md shadow-sm border border-gray-200">
			<div className="flex items-center gap-3 px-3 py-2">
				<img
					src={profileImage}
					alt={username}
					className="w-8 h-8 rounded-full object-cover"
				/>
				<span className="font-semibold text-sm">{username}</span>
			</div>

			<img src={image} alt="Post" className="w-full object-cover" />

			<div className="px-3 py-2">
				<p className="text-sm">
					<span className="font-semibold mr-1">{username}</span>
					{caption}
				</p>
			</div>
		</div>
	);
};

export default FeedCard;
