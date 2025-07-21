// pages/Feed.jsx
import React from "react";
import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomNavbar";
import FeedCard from "../components/FeedCard";

const Feed = () => {
	return (
		<div className="bg-cream min-h-screen pt-16 pb-20">
			<Navbar />

			<div className="max-w-md mx-auto px-4 space-y-6">
				<FeedCard
					username="du_an"
					image="pp.jpg"
					caption="Life's a beach 🌊"
					profileImage="pp.jpg"
				/>
				<FeedCard
					username="retro_insta"
					image="pp.jpg"
					caption="Golden hour vibes ☀️"
					profileImage="pp.jpg"
				/>
			</div>

			<BottomNavbar />
		</div>
	);
};

export default Feed;
