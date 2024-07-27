import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import "../../assets/scss/mychat.scss";
import PopupModal from "../../components/PopupModal";
import ChatLoading from "../../components/ChatLoading";
import { fetchChats } from "../../redux/actions/chat";
import { getSender } from "../../utils";
import { setSelectChat } from "../../redux/slices/chatSlice";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const { chats, selectedChat, fetchChatLoading } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    dispatch(fetchChats());
  }, [fetchAgain]);

  const handleSelect = (chat) => {
    dispatch(setSelectChat(chat));
  };

  return (
    <>
      <div
        className={`my-chat-container ${selectedChat ? "hidden" : "flex"} md:flex flex-col items-center p-3 bg-white w-full md:w-[32%] font-sans border-r-2`}
      >
        <div className="pb-3 w-full text-[28px] md:text-[30px] font-sans flex items-center justify-between">
          <span>My Chats</span>
          <GroupChatModal>
            <Button className="group-chat-btn">+ Group Chat</Button>
          </GroupChatModal>
        </div>
        <div className="flex flex-col p-3 bg-[#F8F8F8] w-full h-full rounded-lg overflow-y-hidden">
          {chats?.length ? (
            <div className="overflow-y-auto pr-2">
              {chats?.map((chat) => (
                <div
                  key={chat._id}
                  className={`cursor-pointer mb-2 px-3 py-2 rounded-lg ${selectedChat === chat ? "bg-[#38B2AC] text-white" : "bg-[#E8E8E8] text-black"}`}
                  onClick={() => handleSelect(chat)}
                >
                  <div>
                    {!chat?.isGroupChat
                      ? getSender(user, chat?.users)
                      : chat?.chatName}
                  </div>
                  {chat.latestMessage && (
                    <div className="text-xs text-overflow-ellipsis">
                      <b>
                        {chat?.latestMessage?.sender?.firstName}{" "}
                        {chat?.latestMessage?.sender?.lastName} :{" "}
                      </b>
                      {chat?.latestMessage?.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : fetchChatLoading ? (
            <ChatLoading />
          ) : (
            <h3>No Chats Found</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyChats;
