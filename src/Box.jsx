import React from "react";

const isHttpLink = (href) => /^https?:\/\//.test(href);

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

    const [, label, href] = match;
    parts.push(
      <a
        key={`${match.index}-${href}`}
        href={href}
        {...(isHttpLink(href) ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {label}
      </a>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    parts.push(value.slice(lastIndex));
  }

  return parts;
};

const Box = ({
  title,
  text,
  image,
  size,
  image_pos = "right",
  accent = "#ffffff",
  eyebrow,
  meta,
  featured = false,
  index = 0,
}) => {
  const imageClass = `image-${image_pos}`;
  const cardStyle = {
    "--box-width": `${size[1] * 20}rem`,
    "--box-min-height": `${size[0] * 20}rem`,
    "--box-accent": accent,
    "--box-index": index,
  };

  return (
    <article
      className={`box ${imageClass}${featured ? " is-featured" : ""}${
        image ? "" : " no-image"
      }`}
      style={cardStyle}
    >
      {image && (
        <div className="box-media">
          <img src={image} alt="" className="box-image" loading="lazy" />
        </div>
      )}

      <div className="box-content">
        <div className="box-heading">
          {eyebrow && <p className="box-eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {meta && <p className="box-meta">{meta}</p>}
        </div>

        <p className="box-text">{renderText(text)}</p>
      </div>
    </article>
  );
};

export default Box;
