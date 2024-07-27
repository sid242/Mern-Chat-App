import React from "react";

const Tooltip = ({
  showTooltip = true,
  message,
  children,
  position = "bottom",
}) => {
  const positionStyles = {
    top: "bottom-8",
    right: "left-[105%]",
    bottom: "top-8",
    left: "right-[105%]",
  };
  return (
    <div className="tooltip-container">
      <div className="group relative flex">
        {children}
        {showTooltip && (
          <span
            className={`absolute ${positionStyles[position]} z-[999999] w-full min-w-[100px] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100`}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
