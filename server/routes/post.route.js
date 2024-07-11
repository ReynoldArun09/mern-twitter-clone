import { Router } from "express";
import * as post from "../controllers/post.ctrl.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

export const postRoute = Router();
postRoute.post(
  "/create-post",
  AuthMiddleware,
  post.CreatePost
);
postRoute.get("/all-posts", AuthMiddleware, post.GetAllPosts);
postRoute.delete("/delete-post/:id", AuthMiddleware, post.DeletePost);
postRoute.post("/comment-post/:id", AuthMiddleware, post.CommentOnPost);
postRoute.post("/like-post/:id", AuthMiddleware, post.LikeUnlikePost);
postRoute.get("/following-posts", AuthMiddleware, post.GetFollowingPosts);
postRoute.get("/user-post/:username", AuthMiddleware, post.GetUserPosts);
postRoute.get("/liked-posts/:id", AuthMiddleware, post.GetLikedPosts);
