import { createSlice } from "@reduxjs/toolkit";
import { googleLogin, login, logout, getUserData } from "../actions/auth";
import {
  clearLocalStorage,
  eventBus,
  getLocalStorage,
  setLocalStorage,
  showToastMessage,
} from "../../utils";
import { TOAST_TYPE } from "../../constants";
import { authRoutes } from "../../constants/appRoutes";

const initialState = {
  loading: false,
  userInfo: null, // for user object
  accessToken: null, // for storing the JWT
  refreshToken: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // google login
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload?.data?.user;
      })
      .addCase(googleLogin.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload === 401) {
          clearLocalStorage(); // deletes token from storage
          state.userInfo = null;
          state.accessToken = null;
          state.error = "unauthorized user";
        } else {
          state.error = payload;
        }
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        setLocalStorage("accessToken", payload.data.accessToken);
        setLocalStorage("refreshToken", payload.data.refreshToken);
        showToastMessage(TOAST_TYPE.SUCCESS, payload.data.message);
        state.loading = false;
        state.userInfo = payload?.data?.user;
        state.accessToken = payload?.data?.accessToken;
        state.refreshToken = payload?.data?.refreshToken;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.userInfo = null;
        state.accessToken = null;
        state.error = payload;
        showToastMessage(TOAST_TYPE.ERROR, payload);
      });

    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload?.data;
        state.accessToken = getLocalStorage("accessToken");
        state.refreshToken = getLocalStorage("refreshToken");
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.loading = false;
        clearLocalStorage(); // deletes token from storage
        state.userInfo = null;
        state.accessToken = null;
        state.error = payload;
      });

    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
      eventBus.dispatch("logout");
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
