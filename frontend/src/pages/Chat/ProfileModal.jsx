import React, { useState } from "react";
import SvgIcon from "../../assets/icons/SvgIcon";
import PopupModal from "../../components/PopupModal";
import Button from "../../components/Button";
import Image from "../../components/Image";

const ProfileModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <span
        className="flex items-center justify-center cursor-pointer bg-[#a3a3a34a] w-[32px] h-[32px] rounded"
        onClick={() => setOpen(true)}
      >
        <SvgIcon iconName="eye" />
      </span>
      <PopupModal
        open={open}
        close={() => setOpen(false)}
        closeOutside
        className="profile-modal"
      >
        <header>
          <div className="flex justify-center text-[30px] mb-5">
            {user?.firstName} {user?.lastName}
          </div>
        </header>
        <section className="flex flex-col items-center justify-between">
          <Image
            imgClassName="rounded-[50%] w-[150px] !h-[150px] object-fill"
            src={user?.profilePic}
            alt={user?.firstName}
          />
          <div className="text-sm md:text-base font-sans mt-5">
            Email: {user?.email}
          </div>
        </section>
        <footer className="mt-5 pt-3 flex justify-end border-t-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </footer>
      </PopupModal>
    </div>
  );
};

export default ProfileModal;
