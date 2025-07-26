import express from "express";
import {
	getUserProfile,
	updateUserBio,
	updateUserAvatar,
	updateUsername,
	followUser,
	unfollowUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import parser from "../middleware/cloudinaryUpload.js"; // your multer+cloudinary middleware

const router = express.Router();

router.get("/:username", getUserProfile);
router.put("/:id/bio", protect, updateUserBio);
router.put("/:id/avatar", protect, parser.single("avatar"), updateUserAvatar);
router.put("/username", protect, updateUsername);
router.post("/:id/follow", protect, followUser);
router.post("/:id/unfollow", protect, unfollowUser);

export default router;
