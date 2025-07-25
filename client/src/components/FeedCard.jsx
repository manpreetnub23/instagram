import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const uri = import.meta.env.VITE_BASE_URL;

const FeedCard = ({ postId, username, image, caption, likes = [], avatar }) => {
	const [likeList, setLikeList] = useState([]);
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		const userId = user?.id?.toString();

		if (userId) {
			const likeArray = likes.map((id) => id.toString());
			setLikeList(likeArray);
			setIsLiked(likeArray.includes(userId));
		}
	}, []);

	const handleLike = async () => {
		try {
			const token = localStorage.getItem("token");
			const user = JSON.parse(localStorage.getItem("user"));
			console.log("usrr is : ", user);
			const userId = user?.id?.toString();
			console.log("user id is : ", userId);

			const res = await axios.put(
				`${uri}/api/posts/${postId}/like`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("UserId:", userId);
			console.log("LikeList:", likeList);
			console.log("IsLiked:", isLiked);

			const updatedLikes = res.data.likes.map((id) => id.toString());
			setLikeList(updatedLikes);
			setIsLiked(updatedLikes.includes(userId));
		} catch (err) {
			console.error("Error liking post", err);
		}
	};

	return (
		<div className="bg-white shadow rounded-lg overflow-hidden mt-6">
			{/* Top User Info */}
			<div className="flex items-center gap-3 px-4 py-2">
				<img
					src={
						avatar ||
						"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
					}
					alt="avatar"
					className="w-8 h-8 rounded-full object-cover"
				/>
				{/* <p className="font-semibold text-sm">{username}</p> */}
				{/* yahan kuch changes kar raha hun main */}
				<Link
					to={`/profile/${username}`}
					className="font-semibold text-sm hover:underline"
				>
					{username}
				</Link>
			</div>

			<img
				src={image}
				alt="post"
				className="w-full h-auto object-cover rounded-3xl p-3"
			/>

			<div className="px-4 py-2 space-y-2">
				<div className="flex items-center gap-4 text-2xl">
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
				<p className="text-sm font-semibold">{likeList.length} likes</p>
				<p className="text-sm">{caption}</p>
			</div>
		</div>
	);
};

export default FeedCard;
