import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const Comments = () => {
	const { postId } = useParams();
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

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

			setComments([...comments, res.data]); // add new comment to list
			setNewComment(""); // clear input
		} catch (err) {
			console.error("Error posting comment", err);
		}
	};

	return (
		<div className="max-w-md mx-auto p-4">
			<h2 className="text-xl font-bold mb-4">Comments</h2>

			<form onSubmit={handleCommentSubmit} className="mb-4 flex gap-2">
				<input
					type="text"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					className="flex-1 p-2 border rounded"
					placeholder="Add a comment..."
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Post
				</button>
			</form>

			<ul className="space-y-2">
				{comments.map((comment, idx) => (
					<li key={idx} className="bg-white p-2 rounded shadow text-sm">
						<strong>{comment.username || "Anonymous"}</strong>: {comment.text}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Comments;
