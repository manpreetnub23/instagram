import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const FeedCard = ({
	postId,
	username,
	image,
	caption,
	likes = [],
	comments = [],
}) => {
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(
		Array.isArray(likes) ? likes.length : 0
	);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (Array.isArray(likes) && userId) {
			setIsLiked(likes.includes(userId));
		}
	}, [likes]);

	const handleLike = async () => {
		try {
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");

			await axios.put(
				`/posts/${postId}/like`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Optimistically update UI
			if (isLiked) {
				setLikeCount((prev) => prev - 1);
			} else {
				setLikeCount((prev) => prev + 1);
			}
			setIsLiked(!isLiked);
		} catch (err) {
			console.error("Error liking post", err);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow overflow-hidden mt-6">
			<div className="px-4 py-2 font-semibold">{username}</div>

			<img
				src={image}
				alt="post"
				className="w-full h-80 object-cover rounded-3xl p-3" // 👈 fixed height, full width, cropped
			/>

			<div className="px-4 py-2 space-y-2">
				<div className="flex items-center gap-4 text-lg">
					{isLiked ? (
						<FaHeart
							className="text-red-500 cursor-pointer"
							onClick={handleLike}
						/>
					) : (
						<FaRegHeart className="cursor-pointer" onClick={handleLike} />
					)}
					<Link to={`/comments/${postId}`}>
						<FaRegComment className="cursor-pointer" />
					</Link>
				</div>
				<p className="text-sm font-semibold">{likeCount} likes</p>
				<p className="text-sm">{caption}</p>
			</div>
		</div>
	);
};

export default FeedCard;
