import React from "react";
import "./index.scss";

const Image = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  handleClick = () => {},
}) => {
  return (
    <div className={`image-container ${className}`} onClick={handleClick}>
      <img className={imgClassName} src={src} alt={alt} />
    </div>
  );
};

export default Image;
