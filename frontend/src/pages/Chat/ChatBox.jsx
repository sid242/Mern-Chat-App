import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import Lottie from "react-lottie";
import { setSelectChat } from "../../redux/slices/chatSlice";
import SvgIcon from "../../assets/icons/SvgIcon";
import { getSender, getSenderFull } from "../../utils";
import ProfileModal from "./ProfileModal";
import animationData from "../../assets/animations/typing.json";
import { BASE_URL } from "../../clientConfig";
import { fetchMessages } from "../../services/chat";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import Loader from "../../components/Loader";
import ScrollableChat from "./ScrollableChat";

var socket, selectedChatCompare;

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.userInfo);

  const [messages, setMessages] = useState([1]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const handleBack = () => {
    dispatch(setSelectChat(null));
  };

  const handleMessageData = (data) => {
    setMessages(data);
    socket?.emit("join chat", selectedChat?._id);
  };

  useEffect(() => {
    if (selectedChat) {
      setLoading(true);
      fetchMessages(selectedChat?._id, setLoading, handleMessageData);
    }

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  return (
    <div
      className={`chat-box-container ${selectedChat ? "flex" : "hidden"} md:flex flex-col items-center p-3 bg-white w-full md:w-[68%]`}
    >
      {selectedChat ? (
        <>
          <div className="text-[28px] md:text-[30px] pb-3 px-2 w-full font-sans flex justify-between items-center">
            <span className="cursor-pointer flex" onClick={handleBack}>
              <SvgIcon iconName={"left-arrow"} className="w-[20px] h-[20px]" />
            </span>
            {!selectedChat?.isGroupChat ? (
              <>
                {getSender(user, selectedChat?.users)}{" "}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat?.chatName?.toUpperCase()}
                <UpdateGroupChatModal
                  fetchMessages={() =>
                    fetchMessages(
                      selectedChat?._id,
                      setLoading,
                      handleMessageData
                    )
                  }
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </div>
          <div className="flex flex-col justify-end p-3 bg-[#E8E8E8] w-full h-full rounded-lg overflow-y-hidden">
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="message-container">
                <ScrollableChat messages={messages} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-3xl pb-3 font-sans">
            Click on a user to start chatting
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
