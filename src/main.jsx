import React from "react";
import ReactDOM from "react-dom/client";
import "/src/index.css";
import Box from "./Box.jsx";
import Background from "./Background.jsx";

const App = () => {
  const boxes = [
    {
      image: "pfp.png",
      title: "Hello!",
      text: `I'm fireentity, a music artist and developer!`,
      size: [1, 1.5],
      image_pos: "left",
    },
    {
      image: "lightbound.png",
      title: "LIGHT//BOUND",
      text: `My flagship rhythm game! Coming soon!`,
      size: [1, 2.4],
      image_pos: "left",
    },
    {
      image: "fractured__anomaly.png",
      title: "FRACTURED ANOMALY",
      text: `My latest release! Listen on YouTube!`,
      size: [1, 2.23],
      image_pos: "left",
    },
    {
      // image: "fractured__anomaly.png",
      title: "Contacts",
      text: `[me@fireentity.space](mailto:me@fireentity.space)
[github/fireentity1](https://github.com/fireentity1)`,
      size: [1, 1],
      image_pos: "right",
    },
  ];

  return (
    <main>
      <Background />
      <h1 className="font">fireentity.space</h1>
      <div className="container">
        {boxes.map((box, index) => {
          return <Box {...box} />;
        })}
      </div>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
