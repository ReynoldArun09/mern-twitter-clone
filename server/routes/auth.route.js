import { Router } from "express";
import * as user from "../controllers/auth.ctrl.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import { LoginSchema, RegisterSchema } from "../utils/schema.js";
import ValidateMiddleware from "../middlewares/ValidateMiddleware.js";

export const authRoute = Router();

authRoute.post(
	"/register-user",
	ValidateMiddleware(RegisterSchema),
	user.RegisterUserApi,
);
authRoute.post(
	"/login-user",
	ValidateMiddleware(LoginSchema),
	user.LoginUserApi,
);
authRoute.post("/logout-user", user.LogoutUserApi);
authRoute.get("/verify-user", AuthMiddleware, user.VerifyUserApi);
