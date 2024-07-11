import { Router } from "express";
import * as user from '../controllers/user.ctrl.js'
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

export const userRoute = Router()
userRoute.get("/profile/:username", AuthMiddleware, user.GetUserProfile);
userRoute.get("/suggested", AuthMiddleware, user.GetSuggestedUsers);
userRoute.post("/follow/:id", AuthMiddleware, user.FollowAndUnFollowUser);
userRoute.post("/update-profile", AuthMiddleware, user.UpdateUserProfile)

