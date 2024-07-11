import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema(
	{
		user: {
			type: ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
		},
		img: {
			type: String,
		},
		likes: [
			{
				type: ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				text: {
					type: String,
					required: true,
				},
				user: {
					type: ObjectId,
					ref: "User",
					required: true,
				},
			},
		],
	},
	{ timestamps: true },
);

export const PostModel = model("Post", postSchema);
