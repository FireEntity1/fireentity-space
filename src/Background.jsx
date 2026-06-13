import React from "react";

const colours = [
  "#ff9a8a",
  "#ffd36a",
  "#89f0d0",
  "#77d7ff",
  "#c4b5fd",
  "#ff8ca8",
];

const shapes = Array.from({ length: 18 }, (_, index) => {
  const size = 18 + ((index * 13) % 42);
  const left = (index * 29 + 7) % 100;
  const top = (index * 47 + 11) % 100;
  const delay = -((index * 5.7) % 38);
  const duration = 24 + ((index * 3) % 20);

  return {
    id: index,
    colour: colours[index % colours.length],
    style: {
      "--shape-size": `${size}px`,
      "--shape-left": `${left}%`,
      "--shape-top": `${top}%`,
      "--shape-delay": `${delay}s`,
      "--shape-duration": `${duration}s`,
    },
  };
});

const Background = () => {
  return (
    <ul className="background" aria-hidden="true">
      {shapes.map((shape) => (
        <li
          key={shape.id}
          style={{ ...shape.style, backgroundColor: shape.colour }}
        />
      ))}
    </ul>
  );
};

export default Background;
