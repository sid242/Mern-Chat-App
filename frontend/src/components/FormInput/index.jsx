import React from "react";
import { useField } from "formik";
import Input from "../Input";

const FormInput = ({
  label,
  name,
  placeholder = "",
  id,
  type = "text",
  labelClassName,
  className,
  error,
  required,
  handleChange,
  customElement = null,
  disabled = false,
}) => {
  const [field, meta, helpers] = useField({ name });

  const onChange = (value) => {
    helpers.setValue(value);
  };

  return (
    <Input
      label={label}
      labelClassName={labelClassName}
      type={type}
      name={name}
      placeholder={placeholder}
      id={id}
      className={className}
      value={field?.value}
      error={error || meta?.touched ? meta?.error : ""}
      required={required}
      onChange={(e) => {
        onChange(e?.target?.value);
        if (handleChange && typeof handleChange === "function") {
          handleChange(e);
        }
      }}
      customElement={customElement}
      disabled={disabled}
    />
  );
};

export default FormInput;
