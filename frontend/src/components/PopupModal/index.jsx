import React, { useEffect, useState } from "react";
import SvgIcon from "../../assets/icons/SvgIcon";

const PopupModal = ({
  open,
  closeOutside = false,
  close,
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10); // Delay to allow CSS transitions to take effect
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300); // Duration should match your CSS transition duration
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        if (closeOutside) {
          close();
        }
      }}
      className={`fixed z-40 inset-0 flex justify-center items-center transition-colors ${isAnimating ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e?.stopPropagation()}
        className={`bg-white rounded-xl w-screen max-w-lg m-2 md:m-0 shadow p-6 transition-all ${isAnimating ? "scale-100 opacity-100" : "scale-125 opacity-0"} ${className}`}
      >
        <span
          className="fixed top-5 right-5 cursor-pointer z-[1000]"
          onClick={close}
        >
          <SvgIcon iconName="close" className="close-icon w-[15px] h-[15px]" />
        </span>

        {children}
      </div>
    </div>
  );
};

export default PopupModal;
