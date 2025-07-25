// import React, { useEffect, useState } from "react";
// import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
// import axios from "../api/axios";
// import { Link } from "react-router-dom";

// const uri = import.meta.env.VITE_BASE_URL;

// const FeedCard = ({ postId, username, image, caption, likes = [] }) => {
// 	const [likeList, setLikeList] = useState([]);
// 	const [isLiked, setIsLiked] = useState(false);

// 	useEffect(() => {
// 		// ✅ safely get userId inside useEffect
// 		const user = JSON.parse(localStorage.getItem("user"));
// 		const userId = user?.id?.toString();

// 		if (userId) {
// 			const likeArray = likes.map((id) => id.toString());
// 			setLikeList(likeArray);
// 			setIsLiked(likeArray.includes(userId));
// 		}
// 	}, []); // ✅ run only once on mount

// 	const handleLike = async () => {
// 		try {
// 			const token = localStorage.getItem("token");
// 			const user = JSON.parse(localStorage.getItem("user"));
// 			const userId = user?.id?.toString();

// 			const res = await axios.put(
// 				`${uri}/api/posts/${postId}/like`,
// 				{},
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			);

// 			const updatedLikes = res.data.likes.map((id) => id.toString());
// 			setLikeList(updatedLikes);
// 			setIsLiked(updatedLikes.includes(userId));
// 		} catch (err) {
// 			console.error("Error liking post", err);
// 		}
// 	};

// 	return (
// 		<div className="bg-white rounded-lg shadow overflow-hidden mt-6">
// 			<div className="px-4 py-2 font-semibold">{username}</div>

// 			<img
// 				src={image}
// 				alt="post"
// 				className="w-full h-80 object-cover rounded-3xl p-3"
// 			/>

// 			<div className="px-4 py-2 space-y-2">
// 				<div className="flex items-center gap-4 text-lg">
// 					{isLiked ? (
// 						<FaHeart
// 							className="text-red-500 cursor-pointer"
// 							onClick={handleLike}
// 						/>
// 					) : (
// 						<FaRegHeart className="cursor-pointer" onClick={handleLike} />
// 					)}
// 					<Link to={`/comments/${postId}`}>
// 						<FaRegComment className="cursor-pointer" />
// 					</Link>
// 				</div>
// 				<p className="text-sm font-semibold">{likeList.length} likes</p>
// 				<p className="text-sm">{caption}</p>
// 			</div>
// 		</div>
// 	);
// };

// export default FeedCard;

import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const uri = import.meta.env.VITE_BASE_URL;

const FeedCard = ({ postId, username, image, caption, likes = [] }) => {
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
			const userId = user?.id?.toString();

			const res = await axios.put(
				`${uri}/api/posts/${postId}/like`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const updatedLikes = res.data.likes.map((id) => id.toString());
			setLikeList(updatedLikes);
			setIsLiked(updatedLikes.includes(userId));
		} catch (err) {
			console.error("Error liking post", err);
		}
	};

	return (
		<div className="bg-white shadow overflow-hidden mt-6">
			<div className="px-4 py-2 font-semibold">{username}</div>

			<img
				src={image}
				alt="post"
				className="w-full h-100 object-cover rounded-3xl p-3"
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
