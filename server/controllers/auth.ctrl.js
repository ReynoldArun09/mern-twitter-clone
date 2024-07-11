import { UserModel } from "../models/user.model.js";
import { ResponseMessages } from "../utils/responseMessage.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const RegisterUserApi = async (req, res) => {
	try {
		const { username, email, password, fullName } = req.body;
		const existingUser = await UserModel.findOne({ email });

		if (existingUser) {
			return res
				.status(409)
				.json({ message: ResponseMessages.USER_ALREADY_EXIST });
		}
		const saltRounds = 12;
		const hashPassword = await bcrypt.hash(password, saltRounds);

		const newUser = new UserModel({
			username,
			email,
			password: hashPassword,
			fullName,
		});

		await newUser.save();
		res.status(201).json({ message: ResponseMessages.USER_CREATED });
	} catch (error) {
		logger.error(`Error ${error}`);
		res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
	}
};

export const LoginUserApi = async (req, res) => {
	try {
		const { username, password } = req.body;
		const existingUser = await UserModel.findOne({ username });

		if (!existingUser) {
			return res.status(409).json({ message: ResponseMessages.USER_NOT_FOUND });
		}

		const checkPassword = await bcrypt.compare(
			password,
			existingUser?.password,
		);
		if (!checkPassword) {
			return res
				.status(400)
				.json({ message: ResponseMessages.INVALID_CREDENTIALS });
		}

		const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		res.cookie("twitter", token, {
			httpOnly: true,
			secure: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
		});
		res.status(200).json({ message: ResponseMessages.USER_LOGGEDIN });
	} catch (error) {
		logger.error(`Error ${error}`);
		res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
	}
};

export const LogoutUserApi = (req, res) => {
	try {
		res.cookie("twitter", "", { maxAge: 0 });
		res.status(200).json({ message: ResponseMessages.USER_LOGGEDOUT });
	} catch (error) {
		logger.error(`Error ${error}`);
		res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
	}
};

export const VerifyUserApi = async (req, res) => {
	try {
		const { _id: userId } = req.user;
		const user = await UserModel.findById(userId);
		res.status(200).json(user);
	} catch (error) {
		logger.error(`Error ${error}`);
		res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
	}
};
