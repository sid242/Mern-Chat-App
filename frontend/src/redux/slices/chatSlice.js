import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../actions/chat";
import { showToastMessage } from "../../utils";
import { TOAST_TYPE } from "../../constants";

const initialState = {
  selectedChat: null,
  chats: [],
  fetchChatLoading: false,
  acccessChatLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectChat: (state, { payload }) => {
      console.log(payload);
      state.selectedChat = payload;
    },
    setChats: (state, { payload }) => {
      state.chats = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state, { payload }) => {
        state.fetchChatLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, { payload }) => {
        state.chats = payload;
        state.fetchChatLoading = false;
      })
      .addCase(fetchChats.rejected, (state, { payload }) => {
        state.fetchChatLoading = false;
        showToastMessage(TOAST_TYPE.ERROR, payload);
      });
  },
});

export const { setSelectChat, setChats } = chatSlice.actions;
export default chatSlice.reducer;
