import { GOOGLE_USERINFO } from "../constants/index.js";
import { ApiError } from "../utils/ApiError.js";
import axios from "axios";

export const getUserDetails = async (googleAccessToken) => {
  if (!googleAccessToken) {
    throw new ApiError(400, "accessToken is required");
  }
  try {
    const response = await axios.get(GOOGLE_USERINFO, {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    });
    return response?.data;
  } catch (error) {
    throw new ApiError(
      400,
      "Something went wrong while getting user info from google",
      error
    );
  }
};
