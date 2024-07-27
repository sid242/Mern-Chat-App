import React from "react";

const ChatLoading = () => {
  const array = new Array(6).fill(null);
  return (
    <div className="flex flex-col gap-2">
      {array?.map((_, index) => (
        <div className="w-full h-20 border-2 rounded-md" key={index}>
          <div className="flex animate-pulse flex-row items-center h-full ml-2 space-x-5">
            <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-44 bg-gray-300 h-6 rounded-md "></div>
              <div className="w-56 bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatLoading;
