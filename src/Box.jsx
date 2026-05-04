import React from "react";

const Box = ({ title, text, image, size, image_pos = "right" }) => {
  const imageClass = `image-${image_pos}`;
  return (
    <div
      className={`box ${imageClass}`}
      style={{ width: size[1] * 20 + "em", height: size[0] * 20 + "em" }}
    >
      <div className="box-content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {image && <img src={image} alt={title} className="box-image" />}
    </div>
  );
};

export default Box;
