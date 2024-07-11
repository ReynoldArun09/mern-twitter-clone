import { UserModel } from "../models/user.model.js";
import { ResponseMessages } from "../utils/responseMessage.js";
import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
	try {
		const token = req.cookies.twitter;

		if (!token) {
			return res.status(401).json({ message: ResponseMessages.UNAUTHORIZED });
		}
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const getUser = await UserModel.findById(decodedToken._id);

		if (!getUser) {
			return res.status(401).json({ message: ResponseMessages.UNAUTHORIZED });
		}

		req.user = getUser;
		next();
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ message: ResponseMessages.TokenExpired });
		}
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ message: ResponseMessages.INVALID_TOKEN });
		}
	}
};

export default AuthMiddleware;
