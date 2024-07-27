import React from "react";
import Image from "../Image";

const UserListItem = ({ user, handleFunction, className = "" }) => {
  return (
    <div
      className={`${className} cursor-pointer bg-[#E8E8E8] w-full  flex items-center text-black px-3 py-2 rounded hover:bg-[#38B2AC] hover:text-white`}
      onClick={handleFunction}
    >
      <div>
        <Image
          imgClassName="mt-2 mr-2 !w-[40px] !h-[40px] rounded-full object-cover"
          src={user?.profilePic}
          alt={user?.firstName}
        />
      </div>
      <div>
        <div>{`${user?.firstName} ${user?.lastName}`}</div>
        <div className="text-xs">
          <b>Email : </b>
          {user.email}
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
