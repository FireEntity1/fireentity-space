import React from "react";

const Box = ({ title, text, image, size, image_pos = "right" }) => {
  const imageClass = `image-${image_pos}`;

  const boxContentStyle = !image
    ? { width: "100%", justifyContent: "flex-start" }
    : {};
  const textWithNewlines = {
    whiteSpace: "pre-line",
  };

  const renderText = (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const parts = [];
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;

    while ((match = linkPattern.exec(value))) {
      if (match.index > lastIndex) {
        parts.push(value.slice(lastIndex, match.index));
      }

      parts.push(
        <a
          key={`${match.index}-${match[2]}`}
          href={match[2]}
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          {match[1]}
        </a>,
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < value.length) {
      parts.push(value.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div
      className={`box ${imageClass}`}
      style={{ width: size[1] * 20 + "em", height: size[0] * 20 + "em" }}
    >
      <div className="box-content" style={boxContentStyle}>
        <h2>{title}</h2>
        <p style={textWithNewlines}>{renderText(text)}</p>
      </div>
      {image && <img src={image} alt={title} className="box-image" />}
    </div>
  );
};

export default Box;
