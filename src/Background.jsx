import React from "react";

const colours = [
  "#FFB7B2",
  "#FFDAC1",
  "#FFF9AA",
  "#B5EAD7",
  "#A9DEF9",
  "#C7CEEA",
  "#E2BBFF",
];

function spawn_squares(num) {
  let squares = [];
  for (let i = 0; i < num; i++) {
    squares.push(
      <li
        key={i}
        style={{ backgroundColor: colours[i % colours.length] }}
      ></li>,
    );
  }
  return squares;
}

const Background = () => {
    return <ul className="background">{spawn_squares(100)}</ul>;
};

export default Background;
