import ProfileHeader from "../components/ProfileHeader";
import PostGrid from "../components/PostGrid";

const dummyImages = [
	"/img1.jpg",
	"/img2.jpg",
	"/img3.jpg",
	"/img4.jpg",
	"/img5.jpg",
	"/img6.jpg",
];

const Profile = () => {
	return (
		<div className="pb-20">
			<ProfileHeader />
			<PostGrid images={dummyImages} />
		</div>
	);
};

export default Profile;
