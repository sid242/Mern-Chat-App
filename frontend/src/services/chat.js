import { TOAST_TYPE } from "../constants";
import { chatRoutes } from "../constants/apiRoutes";
import { showToastMessage } from "../utils";
import API from "./axios";

export const accessChat = async (userId, handleLoading, handleData) => {
  try {
    const response = await API.post(chatRoutes.ACCESS_CHAT, { userId });
    if (response?.data?.success) {
      handleData(response?.data?.data);
    } else {
      showToastMessage(
        TOAST_TYPE.ERROR,
        "Something went wrong while accessing chat!"
      );
    }
  } catch (error) {
    showToastMessage(
      TOAST_TYPE.ERROR,
      error?.response?.data?.errorMessage ?? error?.message
    );
  } finally {
    handleLoading(false);
  }
};

export const createGroup = async (
  groupName,
  groupMembers,
  handleLoading,
  handleData
) => {
  try {
    const response = await API.post(chatRoutes.CREATE_GROUP, {
      groupName,
      groupMembers,
    });
    if (response?.data?.success) {
      handleData(response?.data?.data);
      showToastMessage(TOAST_TYPE.SUCCESS, response?.data?.message);
    } else {
      showToastMessage(
        TOAST_TYPE.ERROR,
        "Something went wrong while creating chat!"
      );
    }
  } catch (error) {
    showToastMessage(
      TOAST_TYPE.ERROR,
      error?.response?.data?.errorMessage ?? error?.message
    );
  } finally {
    handleLoading(false);
  }
};

export const renameGroup = async (
  groupId,
  groupName,
  handleLoading,
  handleData
) => {
  try {
    const response = await API.patch(chatRoutes.RENAME_GROUP, {
      groupId,
      groupName,
    });
    if (response?.data?.success) {
      handleData(response?.data?.data);
      showToastMessage(TOAST_TYPE.SUCCESS, response?.data?.message);
    } else {
      showToastMessage(
        TOAST_TYPE.ERROR,
        "Something went wrong while creating chat!"
      );
    }
  } catch (error) {
    showToastMessage(
      TOAST_TYPE.ERROR,
      error?.response?.data?.errorMessage ?? error?.message
    );
  } finally {
    handleLoading(false);
  }
};

export const fetchMessages = async (chatId, handleLoading, handleData) => {
  try {
    const response = await API.get(`${chatRoutes.GET_MESSAGES}/${chatId}`);
    if (response?.data?.success) {
      handleData(response?.data?.data);
    } else {
      showToastMessage(
        TOAST_TYPE.ERROR,
        "Something went wrong while fetching messages!?"
      );
    }
  } catch (error) {
    showToastMessage(
      TOAST_TYPE.ERROR,
      error?.response?.data?.errorMessage ?? error?.message
    );
  } finally {
    handleLoading(false);
  }
};
