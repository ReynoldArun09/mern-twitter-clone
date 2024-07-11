import { UserModel } from "../models/user.model.js";
import { ResponseMessages } from "../utils/responseMessage.js";
import logger from "../utils/logger.js";
import { IsValidMongoId } from "../helper/index.js";

export const GetUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(409).json({ message: ResponseMessages.USER_NOT_FOUND });
    }
    res.status(200).json(existingUser);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const FollowAndUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: currentUserId } = req.user;
    await IsValidMongoId(currentUserId, res);
    const userToModify = await UserModel.findById(id);
    const currentUser = await UserModel.findById(currentUserId);

    if (!userToModify || !currentUser) {
      res.status(409).json({ message: ResponseMessages.USER_NOT_FOUND });
    }

    if (id === currentUserId) {
      return res
        .status(400)
        .json({ message: ResponseMessages.CANNOT_FOLLOW_YOURSELF });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      await UserModel.findByIdAndUpdate(id, {
        $pull: { followers: currentUserId },
      });
      await UserModel.findByIdAndUpdate(currentUserId, {
        $pull: { following: id },
      });
      res.status(200).json({ message: ResponseMessages.UNFOLLOW_SUCCESS });
    } else {
      await UserModel.findByIdAndUpdate(id, {
        $push: { followers: currentUserId },
      });
      await UserModel.findByIdAndUpdate(currentUserId, {
        $push: { following: id },
      });
      const notify = new notifictionModel({
        type: "follow",
        from: currentUserId,
        to: userToModify._id,
      });
      await notify.save();
      res.status(200).json({ message: ResponseMessages.FOLLOW_SUCCESS });
    }
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const GetSuggestedUsers = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    await IsValidMongoId(userId, res);
    const userFollowedByMe = await UserModel.findById(userId).select(
      "following"
    );
    const users = await UserModel.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);
    const filteredUsers = users.filter(
      (user) => !userFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);
    suggestedUsers.forEach((user) => (user.password = null));
    res.status(200).json(suggestedUsers);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const UpdateUserProfile = async (req, res) => {
  try {
    const {
      fullName,
      email,
      username,
      currentPassword,
      newPassword,
      bio,
      link,
    } = req.body;
    let { profileImg, coverImg } = req.body;
    const { _id: userId } = req.user;
    await IsValidMongoId(userId, res);
    let user = await UserModel.findById(userId);
    if (!user) {
      res.status(400).json({ message: ResponseMessages.USER_NOT_FOUND });
    }
    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({
          error: "Please provide both current password and new password",
        });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current password is incorrect" });
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const saltRounds = 12;
      user.password = await bcrypt.hash(newPassword, saltRounds);
    }
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();
    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};
