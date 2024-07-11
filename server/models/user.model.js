import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const userSchema = Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		followers: [
			{
				type: ObjectId,
				ref: "User",
			},
		],
		following: [
			{
				type: ObjectId,
				ref: "User",
			},
		],
		profileImg: {
			type: String,
			default: "",
		},
		coverImg: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		},
		link: {
			type: String,
			default: "",
		},
		likedPosts: [
			{
				type: ObjectId,
				ref: "Post",
			},
		],
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.__v;
				delete ret.password;
			},
			timestamps: true,
		},
	},
);

export const UserModel = model("User", userSchema);
