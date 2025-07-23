import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomNavbar";
import FeedCard from "../components/FeedCard";
import axios from "../api/axios";

const Feed = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await axios.get("/posts");
				setPosts(res.data);
			} catch (err) {
				console.error("Error fetching posts", err);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div className="bg-cream min-h-screen pt-16 pb-20">
			<Navbar />

			<div className="max-w-md mx-auto px-4 space-y-6">
				{posts.map((post) => (
					<FeedCard
						key={post._id}
						postId={post._id}
						username={post.userId?.username || "unknown"}
						image={post.imageUrl}
						caption={post.caption}
						likes={post.likes}
						comments={post.comments}
					/>
				))}
			</div>

			<BottomNavbar active="home" />
		</div>
	);
};

export default Feed;
