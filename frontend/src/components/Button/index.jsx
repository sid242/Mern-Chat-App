import React from "react";
import "./index.scss";

const Button = ({
  type = "button",
  onClick,
  disabled,
  children,
  className = "",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className} ${disabled ? "disabled:opacity-70" : ""} ${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;
