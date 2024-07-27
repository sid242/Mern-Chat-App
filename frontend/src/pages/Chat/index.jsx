import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <div className="w-full">
      <div className="flex justify-between w-full h-[90vh]">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default Chat;
