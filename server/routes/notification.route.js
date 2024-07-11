import { Router } from "express";
import * as notify from "../controllers/notification.ctrl.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

export const notificationRoute = Router();
notificationRoute.get("/", AuthMiddleware, notify.GetNotficiations);
notificationRoute.delete("/", AuthMiddleware, notify.DeleteNotification);
