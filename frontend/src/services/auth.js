import { TOAST_TYPE } from "../constants";
import { userAuthRoutes } from "../constants/apiRoutes";
import { authRoutes } from "../constants/appRoutes";
import { showToastMessage } from "../utils";
import API from "./axios";

export const registerUser = async (data, handleLoading, redirect) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await API.post(userAuthRoutes.REGISTER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response?.data?.success) {
      showToastMessage(TOAST_TYPE.SUCCESS, response?.data?.data?.message);
      redirect(authRoutes.LOGIN);
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

export const getUsers = async (searchString, handleLoading, handleUserData) => {
  try {
    const response = await API.get(
      `${userAuthRoutes.USERS}?searchString=${searchString}`
    );
    if (response?.data?.success) {
      handleUserData(response?.data?.data);
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
