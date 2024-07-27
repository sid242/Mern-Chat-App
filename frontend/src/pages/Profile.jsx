import React from "react";
import { useSelector } from "react-redux";
import Image from "../components/Image";
import "../assets/scss/profile.scss";
import SvgIcon from "../assets/icons/SvgIcon";
import { Link } from "react-router-dom";
import { showToastMessage } from "../utils";
import { TOAST_TYPE } from "../constants";

const Profile = () => {
  const user = useSelector((state) => state?.auth?.userInfo);
  return (
    <div className="profile-page p-[20px] pt-[50px] flex justify-center items-center gap-10 flex-col sm:flex-row">
      <div className="user-image relative">
        <span
          className="absolute top-0 right-0 z-10 cursor-pointer"
          onClick={() =>
            showToastMessage(
              TOAST_TYPE.SUCCESS,
              <>
                <Link to="/chat">Chat</Link>
              </>
            )
          }
        >
          <SvgIcon iconName="edit" />
        </span>
        <Image src={user?.profilePic} alt={`${user?.firstName}`} />
      </div>
      <div className="user-info text-xl bg-blue-100 p-5 sm:p-9">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <span className="font-bold">Email : </span>
          <span>{user?.email}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <span className="font-bold">First Name: </span>
          <span>{user?.firstName}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <span className="font-bold">Last Name: </span>
          <span>{user?.lastName}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
