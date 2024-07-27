import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(404).json(new ApiError(404, "userId is required"));
  }

  var chatExist = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  chatExist = await User.populate(chatExist, {
    path: "latestMessage.sender",
    select: "firstName lastName email profilePic",
  });

  if (chatExist?.length) {
    return res.status(200).json(new ApiResponse(200, chatExist[0]));
  } else {
    try {
      const createdChat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      });

      const FullChat = await Chat.findById(createdChat._id).populate(
        "users",
        "-password"
      );

      return res.status(200).json(new ApiResponse(200, FullChat));
    } catch (error) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "Something went wrong while creating chat",
            error?.message ?? error
          )
        );
    }
  }
});
const fetchChats = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  var chat = await Chat.find({ users: { $elemMatch: { $eq: _id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "firstName lastName email profilePic",
  });

  return res.status(200).json(new ApiResponse(200, chat));
});

const createGroup = asyncHandler(async (req, res) => {
  const { groupName, groupMembers } = req.body;

  if (!groupMembers || !groupName) {
    return res
      .status(400)
      .json(new ApiError(400, "Please fill all the required fields"));
  }

  if (groupMembers?.length < 2) {
    return res
      .status(400)
      .json(
        new ApiError(400, "More than 2 users are required to form a group chat")
      );
  }

  groupMembers.push(req.user._id);

  try {
    const groupChat = await Chat.create({
      chatName: groupName,
      users: groupMembers,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res
      .status(200)
      .json(new ApiResponse(200, fullGroupChat, "Group created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while creating group",
          error?.message ?? error
        )
      );
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { groupId, groupName } = req.body;

  if (!groupId || !groupName) {
    return res
      .status(400)
      .json(new ApiError(400, "Please fill all the required fields"));
  }
  try {
    const updateChat = await Chat.findByIdAndUpdate(
      groupId,
      {
        $set: { chatName: groupName },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res
      .status(200)
      .json(
        new ApiResponse(200, updateChat, "Group name updated successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while updating group name",
          error?.message ?? error
        )
      );
  }
});

const addRemoveUserFromGroup = asyncHandler(async (req, res) => {
  const { groupId, users } = req.body;
  const { option } = req.params;

  try {
    var query;

    if (option === "true") {
      query = {
        $push: { users: { $each: users } },
      };
    } else if (option === "false") {
      query = {
        $pullAll: { users },
      };
    } else {
      return res
        .status(400)
        .json(new ApiError(400, "Please provide valid option"));
    }

    const updatedGroup = await Chat.findByIdAndUpdate(groupId, query, {
      new: true,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedGroup, "Group members updated successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while updating group members list",
          error?.message ?? error
        )
      );
  }
});

export {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addRemoveUserFromGroup,
};
