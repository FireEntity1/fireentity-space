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
  const cardClasses = ["identity-card", "game-card", "release-card", "contact-card"];
  const imageClass = featured
    ? "media-top"
    : image_pos === "left"
      ? "media-left"
      : "media-right";
  const cardStyle = {
    "--box-width": `${size[1] * 20}rem`,
    "--box-min-height": `${size[0] * 20}rem`,
    "--box-accent": accent,
    "--box-index": index,
  };
  const bodyClass = `body-copy${image ? "" : " link-stack"}`;

  return (
    <article
      className={`bento-card ${cardClasses[index] ?? ""}${
        image ? "" : " no-image"
      }`}
      style={cardStyle}
    >
      {image && (
        <figure className={`media-frame ${imageClass}`}>
          <img src={image} alt="" loading="lazy" />
        </figure>
      )}

      <div className="card-content">
        <div>
          {eyebrow && <p className="accent-label">{eyebrow}</p>}
          <h2>{title}</h2>
          {meta && <p className={`subheading ${featured ? "cyan" : "muted"}`}>{meta}</p>}
        </div>

        <p className={bodyClass}>{renderText(text)}</p>
      </div>
    </article>
  );
};

export default Box;
