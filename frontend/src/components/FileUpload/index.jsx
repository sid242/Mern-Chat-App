import React from "react";
import { useField, useFormikContext } from "formik";
import Input from "../Input";

const FileUpload = ({
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
}) => {
  const [_, meta] = useField({ name });
  const { setFieldValue } = useFormikContext();

  const onChange = (files) => {
    setFieldValue(name, files[0]);
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
      error={error || meta?.touched ? meta?.error : ""}
      required={required}
      onChange={(e) => {
        onChange(e?.target?.files);
        if (handleChange && typeof handleChange === "function") {
          handleChange(e);
        }
      }}
      customElement={customElement}
    />
  );
};

export default FileUpload;
