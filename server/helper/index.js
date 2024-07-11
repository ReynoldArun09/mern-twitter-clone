import logger from "../utils/logger.js";
import mongoose from "mongoose";
import { ResponseMessages } from "../utils/responseMessage.js";

export const IsValidMongoId = (id, res) => {
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		logger.error("Invalid Mongo ID");
		return res.status(400).json({ message: ResponseMessages.INVALID_USER_ID });
	}
};
