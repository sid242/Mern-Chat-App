import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";
import { clearLocalStorage } from "../../utils";
import { userAuthRoutes } from "../../constants/apiRoutes";

export const googleLogin = createAsyncThunk(
  "auth/register",
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await API.post(`api/v1/auth/google/login`, {
        googleAccessToken: accessToken,
      });
      return response?.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error?.response?.data?.errors?.errors?.status === 401) {
        return rejectWithValue(error?.response?.data?.errors?.errors?.status);
      }
      if (error?.response && error?.response?.data?.errorMessage) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error?.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post(userAuthRoutes.LOGIN, data);
      return response?.data;
    } catch (error) {
      if (error?.response && error?.response?.data?.errorMessage) {
        return rejectWithValue(error.response.data.errorMessage);
      } else {
        return rejectWithValue(error?.message);
      }
    }
  }
);

export const getUserData = createAsyncThunk(
  "auth/user-data",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(userAuthRoutes.CURRENT_USER);
      return response?.data;
    } catch (error) {
      if (error?.response && error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error?.message);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.post(userAuthRoutes.LOGOUT);
      return response?.data;
    } catch (error) {
      if (error?.response && error?.response?.data?.errorMessage) {
        return rejectWithValue(error.response.data.errorMessage);
      } else {
        return rejectWithValue(error?.message);
      }
    }
  }
);
