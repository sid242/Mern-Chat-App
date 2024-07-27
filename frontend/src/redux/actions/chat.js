import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatRoutes, userAuthRoutes } from "../../constants/apiRoutes";
import API from "../../services/axios";

export const fetchChats = createAsyncThunk(
  "chat/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(chatRoutes.ACCESS_CHAT);
      return response?.data?.data;
    } catch (error) {
      if (error?.response && error?.response?.data?.errorMessage) {
        return rejectWithValue(error.response.data.errorMessage);
      } else {
        return rejectWithValue(error?.message);
      }
    }
  }
);
