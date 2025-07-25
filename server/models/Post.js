import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		caption: { type: String },
		imageUrl: { type: String, required: true },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		// comments: [{ user: String, text: String }],
		comments: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				text: String,
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
