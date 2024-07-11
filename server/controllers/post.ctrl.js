import { PostModel } from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";
import { NotificationModel } from "../models/notification.model.js";
import { v2 as cloudinary } from "cloudinary";
import { ResponseMessages } from "../utils/responseMessage.js";
import { IsValidMongoId } from "../helper/index.js";
import logger from "../utils/logger.js";

export const CreatePost = async (req, res) => {
  try {
    const { text, img } = req.body;
    const { _id: userId } = req.user;
    await IsValidMongoId(userId, res);
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(409).json({ message: ResponseMessages.USER_NOT_FOUND });
    }
    let imgUrl = null;
    if (img) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(img, {
          folder: "twitterclone",
          resource_type: "image",
          allowed_formats: ["jpg", "png", "gif"],
        });
        imgUrl = uploadedResponse.secure_url;
      } catch (error) {
        return res
          .status(500)
          .json({ message: ResponseMessages.IMAGE_UPLOAD_FAILED });
      }
    }
    const newPost = new PostModel({
      text,
      img: imgUrl,
      user: userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const GetAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");
    if (posts.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(posts);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const DeletePost = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id: postId } = req.params;
    await IsValidMongoId(userId, res);
    const existingPost = await PostModel.findById(postId);
    if (!existingPost) {
      return res.status(409).json({ message: ResponseMessages.POST_NOT_FOUND });
    }
    if (existingPost.user.toString() !== userId.toString()) {
      return res
        .status(404)
        .json({ message: ResponseMessages.NOT_ALLOWED_TO_DELETE });
    }
    if (existingPost.img) {
      const imgId = existingPost.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    await PostModel.findByIdAndDelete(postId);
    res.status(200).json({ message: ResponseMessages.POST_DELETED });
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const CommentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { _id: userId } = req.user;
    const { id: postId } = req.params;
    await IsValidMongoId(userId, res);
    const existingPost = await PostModel.findById(postId);
    if (!existingPost) {
      return res.status(409).json({ message: ResponseMessages.POST_NOT_FOUND });
    }

    const newComment = {
      text,
      user: userId,
    };
    existingPost.comments.push(newComment);
    await existingPost.save();
    res.status(200).json(existingPost);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const LikeUnlikePost = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id: postId } = req.params;
    await IsValidMongoId(userId, res);
    const existingPost = await PostModel.findById(postId);
    if (!existingPost) {
      return res.status(409).json({ message: ResponseMessages.POST_NOT_FOUND });
    }

    const userLikedPost = existingPost.likes.includes(userId);

    if (userLikedPost) {
      await PostModel.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await UserModel.updateOne(
        { _id: userId },
        { $pull: { likedPosts: postId } }
      );

      const updatedLikes = existingPost.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedLikes);
    } else {
      existingPost.likes.push(userId);
      await UserModel.updateOne(
        { _id: userId },
        { $push: { likedPosts: postId } }
      );
      await existingPost.save();

      const notification = new NotificationModel({
        from: userId,
        to: existingPost.user,
        type: "like",
      });
      await notification.save();

      const updatedLikes = existingPost.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const GetLikedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(409).json({ message: ResponseMessages.USER_NOT_FOUND });
    }
    const likedPosts = await PostModel.find({ _id: { $in: user.likedPosts } })
      .populate("user")
      .populate("comments.user");
    res.status(200).json(likedPosts);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const GetFollowingPosts = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    await IsValidMongoId(userId, res);
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(409).json({ message: ResponseMessages.USER_NOT_FOUND });
    }
    const following = existingUser.following;
    const feedPosts = await PostModel.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");
    res.status(200).json(feedPosts);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const GetUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(409).json({ message: ResponseMessages.USER_NOT_FOUND });
    }
    const userPosts = await PostModel.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");
    res.status(200).json(userPosts);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};
