import React from "react";
import "./index.scss";

const Input = ({
  label,
  name,
  id,
  placeholder = "",
  type = "text",
  labelClassName,
  className = "",
  error = "",
  value,
  onChange,
  required = false,
  customElement = null,
  disabled = false,
  ...props
}) => {
  return (
    <div className="form-control">
      {label ? (
        <label htmlFor={id} className={labelClassName}>
          {label}
          {required ? <span className="required">*</span> : null}
        </label>
      ) : null}
      <div className="relative">
        <input
          {...props}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${className} ${error?.length ? "error border-danger " : ""}`}
          disabled={disabled}
        />
        {customElement}
      </div>
      {error?.length ? (
        <div className="text-danger error-message">{error}</div>
      ) : null}
    </div>
  );
};

export default Input;
