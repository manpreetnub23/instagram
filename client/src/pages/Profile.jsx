import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Pencil } from "lucide-react";

const uri = import.meta.env.VITE_BASE_URL;

const Profile = () => {
	const { username } = useParams();
	const navigate = useNavigate();

	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);
	const [editBio, setEditBio] = useState(false);
	const [newBio, setNewBio] = useState("");
	const [editUsername, setEditUsername] = useState(false);
	const [newUsername, setNewUsername] = useState("");
	const [selectedPost, setSelectedPost] = useState(null);
	const [showAvatarOptions, setShowAvatarOptions] = useState(false);
	const [selectedAvatar, setSelectedAvatar] = useState(null);

	const token = localStorage.getItem("token");
	const loggedInUser = JSON.parse(localStorage.getItem("user"));
	const isOwnProfile = loggedInUser?.username === username;

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
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setUser((prev) => ({ ...prev, bio: res.data.bio }));
			setEditBio(false);
		} catch (err) {
			console.error("Failed to update bio", err);
		}
	};

	// Trigger file input for changing avatar
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
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
		} catch (err) {
			console.error("Avatar update failed", err);
		}
	};

	const handleUsernameUpdate = async () => {
		try {
			const res = await axios.put(
				`${uri}/api/users/username`,
				{ username: newUsername },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setUser((prev) => ({ ...prev, username: res.data.username }));
			setEditUsername(false);
			localStorage.setItem("user", JSON.stringify(res.data));
		} catch (err) {
			console.error("Failed to update username", err);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("auth");
		navigate("/");
	};

	// follow unfollow functions.
	// const handleFollowUnfollow = async () => {
	// 	const action = user.followers.includes(loggedInUser._id)
	// 		? "unfollow"
	// 		: "follow";
	// 	console.log("action is : ", action);
	// 	console.log("logged in user is : ", loggedInUser);
	// 	try {
	// 		await axios.post(
	// 			`${uri}/api/users/${user._id}/${action}`,
	// 			{},
	// 			{ headers: { Authorization: `Bearer ${token}` } }
	// 		);
	// 		// Update followers list locally
	// 		setUser((prev) => {
	// 			const updatedFollowers =
	// 				action === "follow"
	// 					? [...prev.followers, loggedInUser._id]
	// 					: prev.followers.filter((id) => id !== loggedInUser._id);
	// 			console.log("updated followers : ", updatedFollowers);
	// 			return { ...prev, followers: updatedFollowers };
	// 		});
	// 	} catch (err) {
	// 		console.error("Failed to follow/unfollow", err);
	// 	}
	// };

	const handleFollowUnfollow = async () => {
		const action = user.followers
			.map((id) => id.toString())
			.includes(loggedInUser.id)
			? "unfollow"
			: "follow";

		console.log("action is : ", action);
		console.log("logged in user is : ", loggedInUser);

		try {
			await axios.post(
				`${uri}/api/users/${user._id}/${action}`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			setUser((prev) => {
				const updatedFollowers =
					action === "follow"
						? [...prev.followers, loggedInUser.id]
						: prev.followers.filter((id) => id.toString() !== loggedInUser.id);

				console.log("updated followers : ", updatedFollowers);

				return { ...prev, followers: updatedFollowers };
			});
		} catch (err) {
			console.error("Failed to follow/unfollow", err);
		}
	};

	//jofgoiwejoigjwoirjgoiwrjtrjherjhejhkrjrik

	if (!user) return <p className="text-center pt-10">Loading...</p>;

	return (
		<div className="max-w-md mx-auto pt-16 pb-20 p-4 relative">
			{/* Profile Info */}
			<div className="flex items-center gap-4 mt-6 mb-6 relative">
				<div className="relative">
					<img
						src={
							user.avatar ||
							"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
						}
						alt="dp"
						className="w-20 h-20 rounded-full object-cover cursor-pointer"
						onClick={() => {
							isOwnProfile
								? setShowAvatarOptions(!showAvatarOptions)
								: setSelectedAvatar(user.avatar);
						}}
					/>
					{isOwnProfile && showAvatarOptions && (
						<div className="absolute top-full left-0 mt-1 w-40 bg-white border rounded shadow-md z-10">
							<button
								onClick={() => {
									setSelectedAvatar(user.avatar);
									setShowAvatarOptions(false);
								}}
								className="w-full text-left px-3 py-2 hover:bg-gray-100"
							>
								View Profile Photo
							</button>
							<button
								onClick={() => {
									handleAvatarClick();
									setShowAvatarOptions(false);
								}}
								className="w-full text-left px-3 py-2 hover:bg-gray-100"
							>
								Change Profile Photo
							</button>
						</div>
					)}
					{isOwnProfile && (
						<input
							type="file"
							id="avatarInput"
							className="hidden"
							accept="image/*"
							onChange={handleAvatarChange}
						/>
					)}
				</div>

				<div>
					{/* Username Edit */}
					{isOwnProfile && editUsername ? (
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={newUsername}
								onChange={(e) => setNewUsername(e.target.value)}
								className="border px-2 py-1 text-sm rounded"
							/>
							<button
								className="text-blue-600 text-sm"
								onClick={handleUsernameUpdate}
							>
								Save
							</button>
						</div>
					) : (
						<div className="flex items-center gap-1">
							<h2 className="text-lg font-bold">{user.username}</h2>
							{isOwnProfile && (
								<button
									onClick={() => {
										setEditUsername(true);
										setNewUsername(user.username);
									}}
								>
									<Pencil className="w-4 h-4 text-gray-500" />
								</button>
							)}
						</div>
					)}

					<p className="text-sm text-gray-600">{user.email}</p>

					{/* yeh naya daala hai */}

					<p className="text-sm text-gray-600">{user.email}</p>

					<p className="text-sm text-gray-500">
						{user.followers.length} followers • {user.following.length}{" "}
						following
					</p>

					{!isOwnProfile && (
						<button
							onClick={handleFollowUnfollow}
							className="mt-1 px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
						>
							{user.followers.includes(loggedInUser.id) ? "Unfollow" : "Follow"}
						</button>
					)}

					{/* yahan tak */}

					{/* Bio & Edit */}
					{isOwnProfile && editBio ? (
						<div className="flex flex-col gap-2 mt-1">
							<div className="flex items-center gap-2">
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
						</div>
					) : user.bio ? (
						<div className="flex flex-col gap-1 mt-1">
							<div className="flex items-center gap-1">
								<p className="text-sm">{user.bio}</p>
								{isOwnProfile && (
									<button
										onClick={() => {
											setEditBio(true);
											setNewBio(user.bio);
										}}
									>
										<Pencil className="w-4 h-4 text-gray-500" />
									</button>
								)}
							</div>
						</div>
					) : isOwnProfile ? (
						<div className="flex flex-col mt-1 gap-1">
							<button
								className="text-xs text-blue-500"
								onClick={() => setEditBio(true)}
							>
								Add bio
							</button>
						</div>
					) : null}
				</div>
			</div>

			{/* Log out Full Width */}
			{isOwnProfile && (
				<div className="w-full mb-4">
					<button
						onClick={handleLogout}
						className="w-full bg-gradient-to-r from-[#315d94] to-[#6191c2] text-white py-2 rounded-md text-center text-lg shadow-md hover:opacity-90 transition"
					>
						LOG OUT
					</button>
				</div>
			)}

			{/* Posts Grid */}
			<h3 className="text-md font-semibold mb-2">Posts</h3>
			{posts.length === 0 ? (
				<p className="text-gray-500 text-sm">No posts yet</p>
			) : (
				<div className="grid grid-cols-3 gap-3">
					{posts.map((post) => (
						<img
							key={post._id}
							src={post.imageUrl}
							alt="user post"
							className="w-full h-36 object-cover rounded cursor-pointer"
							onClick={() => setSelectedPost(post)}
						/>
					))}
				</div>
			)}

			{/* Modal Preview for Posts */}
			{selectedPost && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
					onClick={() => setSelectedPost(null)}
				>
					<div
						className="bg-white rounded-xl p-4"
						style={{
							width: "90%",
							maxWidth: "400px",
							maxHeight: "90vh",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={selectedPost.imageUrl}
							alt="preview"
							className="rounded-md object-contain max-h-[60vh] mb-4"
						/>
						<div className="flex items-center justify-center gap-3">
							<img
								src={
									user.avatar ||
									"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
								}
								alt="avatar"
								className="w-8 h-8 rounded-full object-cover"
							/>
							<p className="text-gray-800 font-medium">{user.username}</p>
						</div>
					</div>
				</div>
			)}

			{/* Modal Preview for Avatar (View Profile Photo) */}
			{selectedAvatar && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
					onClick={() => setSelectedAvatar(null)}
				>
					<div
						className="bg-white rounded-xl p-4"
						style={{
							width: "90%",
							maxWidth: "400px",
							maxHeight: "90vh",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={selectedAvatar}
							alt="profile preview"
							className="rounded-md object-contain max-h-[60vh] mb-4"
						/>
						<div className="flex items-center justify-center gap-3">
							<img
								src={
									user.avatar ||
									"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
								}
								alt="avatar"
								className="w-8 h-8 rounded-full object-cover"
							/>
							<p className="text-gray-800 font-medium">{user.username}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
