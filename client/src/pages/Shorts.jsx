// src/pages/Shorts.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Shorts = () => {
	const [videos, setVideos] = useState([]);
	const iframeRefs = useRef([]);

	useEffect(() => {
		const fetchShorts = async () => {
			try {
				const { data } = await axios.get(
					"https://www.googleapis.com/youtube/v3/search",
					{
						params: {
							part: "snippet",
							q: "shorts",
							type: "video",
							videoDuration: "short",
							maxResults: 50,
							key: import.meta.env.VITE_YOUTUBE_API_KEY,
						},
					}
				);
				setVideos(data.items);
			} catch (error) {
				console.error("Failed to fetch shorts:", error);
			}
		};
		fetchShorts();
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const iframe = entry.target;
					const videoId = iframe.dataset.videoid;

					if (entry.isIntersecting) {
						iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1&controls=0&modestbranding=1&enablejsapi=1`;
					} else {
						iframe.src = "";
					}
				});
			},
			{ threshold: 0.9 }
		);

		iframeRefs.current.forEach((iframe) => {
			if (iframe) observer.observe(iframe);
		});

		return () => {
			iframeRefs.current.forEach((iframe) => {
				if (iframe) observer.unobserve(iframe);
			});
		};
	}, [videos]);

	return (
		<div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black relative">
			{videos.map((video, index) => (
				<div
					key={video.id.videoId}
					className="w-full h-screen snap-start flex items-center justify-center relative"
				>
					<iframe
						ref={(el) => (iframeRefs.current[index] = el)}
						data-index={index}
						data-videoid={video.id.videoId}
						title={video.snippet.title}
						className="w-full h-full object-cover"
						frameBorder="0"
						allow="autoplay; encrypted-media"
						allowFullScreen
					></iframe>
					<p className="text-white text-center p-2 text-sm bg-black bg-opacity-60 w-full absolute bottom-0 z-10">
						{video.snippet.title}
					</p>
				</div>
			))}
		</div>
	);
};

export default Shorts;
