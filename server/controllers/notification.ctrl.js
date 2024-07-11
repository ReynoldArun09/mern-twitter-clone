import {NotificationModel} from '../models/notification.model.js'
import { ResponseMessages } from '../utils/responseMessage.js';
import logger from '../utils/logger.js';
import { IsValidMongoId } from '../helper/index.js';

export const GetNotficiations = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    await IsValidMongoId(userId, res)
    const notification = await NotificationModel.find({to: userId}).populate({
      path: "from",
      select: "username profileImg",
    });
    await NotificationModel.updateMany({ to: userId }, {read: true});
    res.status(200).json(notification);
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};

export const DeleteNotification = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    await IsValidMongoId(userId, res)
    await NotificationModel.deleteMany({ to: userId });
    res.status(200).json({ message: ResponseMessages.NOTIFICATION_DELETED });
  } catch (error) {
    logger.error(`Error ${error}`);
    res.status(500).json({ message: ResponseMessages.INTERNAL_ERROR });
  }
};
