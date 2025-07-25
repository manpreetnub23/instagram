import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Pencil } from "lucide-react";

const uri = import.meta.env.VITE_BASE_URL;

const Profile = () => {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const [editBio, setEditBio] = useState(false);
	const [newBio, setNewBio] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await axios.get(`${uri}/api/users/${username}`);
				setUser(res.data.user);
				setPosts(res.data.posts);
			} catch (err) {
				console.error("Error fetching profile", err);
			}
		};

		fetchProfile();
	}, [username]);

	const handleBioUpdate = async () => {
		try {
			const res = await axios.put(
				`${uri}/api/users/${user._id}/bio`,
				{ bio: newBio },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUser((prev) => ({ ...prev, bio: res.data.bio }));
			setEditBio(false);
		} catch (err) {
			console.error("Failed to update bio", err);
		}
	};

	const handleAvatarClick = () => {
		document.getElementById("avatarInput").click();
	};

	const handleAvatarChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("avatar", file);

		try {
			const res = await axios.put(
				`${uri}/api/users/${user._id}/avatar`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`, // 👈 THIS WAS MISSING
					},
				}
			);
			setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
		} catch (err) {
			console.error("Avatar update failed", err);
		}
	};

	if (!user) return <p className="text-center pt-10">Loading...</p>;

	return (
		<div className="max-w-md mx-auto pt-16 pb-20 p-4">
			{/* Profile Info */}
			<div className="flex items-center gap-4 mt-6 mb-6">
				<div className="relative group">
					<img
						src={
							user.avatar ||
							"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
						}
						alt="dp"
						className="w-20 h-20 rounded-full object-cover cursor-pointer"
						onClick={handleAvatarClick}
					/>
					<input
						type="file"
						id="avatarInput"
						className="hidden"
						accept="image/*"
						onChange={handleAvatarChange}
					/>
				</div>

				<div>
					<h2 className="text-lg font-bold">{user.username}</h2>
					<p className="text-sm text-gray-600">{user.email}</p>

					{/* Bio */}
					{editBio ? (
						<div className="flex items-center mt-1 gap-2">
							<input
								type="text"
								value={newBio}
								onChange={(e) => setNewBio(e.target.value)}
								className="border px-2 py-1 text-sm rounded"
							/>
							<button
								className="text-blue-600 text-sm"
								onClick={handleBioUpdate}
							>
								Save
							</button>
						</div>
					) : user.bio ? (
						<div className="flex items-center gap-1 mt-1">
							<p className="text-sm">{user.bio}</p>
							<button
								onClick={() => {
									setEditBio(true);
									setNewBio(user.bio);
								}}
							>
								<Pencil className="w-4 h-4 text-gray-500" />
							</button>
						</div>
					) : (
						<button
							className="text-xs text-blue-500 mt-1"
							onClick={() => setEditBio(true)}
						>
							Add bio
						</button>
					)}
				</div>
			</div>

			{/* Posts Grid */}
			<h3 className="text-md font-semibold mb-2">Posts</h3>
			{posts.length === 0 ? (
				<p className="text-gray-500 text-sm">No posts yet</p>
			) : (
				<div className="grid grid-cols-3 gap-2">
					{posts.map((post) => (
						<img
							key={post._id}
							src={post.imageUrl}
							alt="user post"
							className="w-full h-28 object-cover rounded"
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Profile;
