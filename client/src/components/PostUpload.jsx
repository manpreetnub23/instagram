import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
const uri = import.meta.env.VITE_BASE_URL;

const PostUpload = () => {
	const [image, setImage] = useState(null);
	const [caption, setCaption] = useState("");
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState(null);

	const [user, setUser] = useState(null);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		console.log("user", storedUser);
		if (storedUser?.id) {
			setUserId(storedUser.id);
			console.log("userId", storedUser.id);
		} else {
			console.log("User data invalid or missing 'id'");
		}
	}, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleUpload = async () => {
		if (!image || !caption) return alert("Image and caption required");
		setLoading(true);

		try {
			const formData = new FormData();
			formData.append("file", image);
			formData.append("upload_preset", "instagram");
			formData.append("cloud_name", "dcz9nhtrk");

			const cloudRes = await axios.post(
				`https://api.cloudinary.com/v1_1/dcz9nhtrk/image/upload`,
				formData
			);

			const imageUrl = cloudRes.data.secure_url;

			const postRes = await axios.post(`${uri}/api/posts`, {
				userId,
				caption,
				imageUrl,
			});

			alert("Post uploaded!");
			setImage(null);
			setCaption("");
			setPreview(null);
		} catch (err) {
			console.error(err);
			alert("Upload failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto p-4 text-white bg-[#121212] rounded-lg shadow-md">
			<h2 className="text-xl font-bold mb-4">Create a New Post</h2>

			<label className="flex flex-col items-center border-2 border-dashed border-gray-500 p-6 rounded-lg cursor-pointer hover:border-white transition">
				{preview ? (
					<img src={preview} alt="preview" className="w-full rounded-lg" />
				) : (
					<>
						<FaCamera className="text-4xl mb-2" />
						<span>Select an image</span>
					</>
				)}
				<input type="file" onChange={handleImageChange} className="hidden" />
			</label>

			<textarea
				className="w-full mt-4 p-2 bg-[#1e1e1e] border border-gray-600 rounded text-white"
				rows="3"
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
				placeholder="Write a caption..."
			/>

			<button
				onClick={handleUpload}
				disabled={loading}
				className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
			>
				{loading ? "Posting..." : "Post"}
			</button>
		</div>
	);
};

export default PostUpload;
