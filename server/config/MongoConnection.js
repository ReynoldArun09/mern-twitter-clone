import mongoose from "mongoose";
import { MongoError } from "mongodb";
import logger from "../utils/logger.js";

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const MAX_RETRIES = 3;
const MAX_RETRY_DELAY = 3000;

const MongoConnectionWithRetry = async (r = MAX_RETRIES) => {
	try {
		const connection = await mongoose.connect(MONGO_DB_URI);
		logger.info(`MongoDB connected: ${connection.connection.host}`);
	} catch (error) {
		if (error instanceof MongoError) {
			switch (error.code) {
				case 11000:
					logger.error("Duplicate key error");
					break;
				case "ENOTFOUND":
					logger.error(
						"Network error. Ensure the MongoDB server is reachable.",
					);
					break;
				default:
					logger.error("Something went wrong:", error);
			}
		} else {
			logger.error("An error occurred:", error);
			process.exit(1);
		}

		if (r > 0) {
			logger.info(
				`Retrying connection in ${MAX_RETRY_DELAY / 1000} seconds...`,
			);
			setTimeout(() => {
				MongoConnectionWithRetry(r - 1);
			}, MAX_RETRY_DELAY);
		} else {
			logger.error("Exceeded Maximum retries. Exiting...");
			if (process.env.NODE_ENV === "production") {
				process.exit(1);
			}
		}
	}
};

const MongoConnection = async () => {
	await MongoConnectionWithRetry();
};

export default MongoConnection;
