import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const notifictionSchema = new Schema(
	{
		from: {
			type: ObjectId,
			ref: "User",
			required: true,
		},
		to: {
			type: ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: ["follow", "like"],
			required: true,
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

export const NotificationModel = model("Notification", notifictionSchema);
