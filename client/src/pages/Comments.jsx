import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const Comments = () => {
	const { postId } = useParams();
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	const user = JSON.parse(localStorage.getItem("user"));

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await axios.get(`/posts/${postId}/comments`);
				setComments(res.data);
			} catch (err) {
				console.error("Error fetching comments", err);
			}
		};
		fetchComments();
	}, [postId]);

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		try {
			const token = localStorage.getItem("token");

			const res = await axios.post(
				`/posts/${postId}/comments`,
				{ text: newComment },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setComments([
				...comments,
				{
					...res.data,
					userId: { username: user?.username || "You" },
				},
			]);

			setNewComment("");
		} catch (err) {
			console.error("Error posting comment", err);
		}
	};

	return (
		<div className="max-w-xl mx-auto pt-12 px-4">
			<h2 className="text-xl font-semibold mb-4">Comments</h2>

			<div className="bg-white border border-gray-200 shadow p-4 space-y-3 max-h-[65vh] overflow-y-auto">
				{comments.length === 0 ? (
					<p className="text-gray-500 text-sm">No comments yet.</p>
				) : (
					comments.map((comment, idx) => (
						<div
							key={idx}
							className="p-3 bg-gray-100 border border-gray-300 text-sm"
						>
							<strong className="block mb-1">
								{comment.userId?.username || "Anonymous"}
							</strong>
							<p>{comment.text}</p>
						</div>
					))
				)}
			</div>

			<form
				onSubmit={handleCommentSubmit}
				className="mt-4 flex gap-2 items-center"
			>
				<input
					type="text"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					className="flex-1 p-2 border border-gray-300"
					placeholder="Add a comment..."
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-gradient-to-r from-[#315d94] to-[#6191c2] text-white hover:cursor-pointer"
				>
					Post
				</button>
			</form>
		</div>
	);
};

export default Comments;
