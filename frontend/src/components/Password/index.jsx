import React, { useState } from "react";
import FormInput from "../FormInput";
import SvgIcon from "../../assets/icons/SvgIcon";

const Password = ({ name, label, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      type={showPassword ? "text" : "password"}
      label={label ?? "Password"}
      name={name ?? "password"}
      placeholder={placeholder ?? "Enter your password"}
      required={required}
      customElement={
        <span
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          <SvgIcon
            iconName={showPassword ? "eye" : "eye-slash"}
            className="absolute top-4 right-5"
          />
        </span>
      }
    />
  );
};

export default Password;
