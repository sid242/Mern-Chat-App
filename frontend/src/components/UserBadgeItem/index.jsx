import React from "react";
import SvgIcon from "../../assets/icons/SvgIcon";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <span
      className="flex items-center px-2 py-1 rounded-lg m-1 mb-2 text-sm bg-purple-500 text-white"
      onClick={handleFunction}
    >
      {`${user?.firstName} ${user?.lastName}`}{" "}
      {admin === user._id && <span> (Admin)</span>}
      <span className="cursor-pointer" onClick={close}>
        <SvgIcon
          iconName="close"
          className="close-icon ml-1 p-[2px] w-[14px] h-[14px] hover:bg-white bg-[#ffffff4a] rounded"
        />
      </span>
    </span>
  );
};

export default UserBadgeItem;
