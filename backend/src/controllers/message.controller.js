import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "firstName lastName email profilePic")
    .populate("chat");

  res.status(200).json(new ApiResponse(200, messages));
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid data passed into request"));
  }

  try {
    var message = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
    });

    message = await message.populate("sender", "firstName lastName profilePic");

    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "firstName lastName profilePic email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return res.status(200).json(new ApiResponse(200, message));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while sending message",
          error?.message ?? error
        )
      );
  }
});

export { getAllMessages, sendMessage };
