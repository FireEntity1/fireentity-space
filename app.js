const boxes = [];

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < i; j++) {
        boxes.push(React.createElement("div", { className: "box", key: `${i}-${j}` },
            React.createElement("p", null, "")
        ));
    }
}

const app = React.createElement(React.Fragment, null,
    React.createElement("h1", { className: "font" }, "fireentity.space"),
    React.createElement("p", { className: "tektur" }, "Welcome to my site!"),
    React.createElement("div", { className: "container" }, boxes)
);

ReactDOM.createRoot(document.getElementById("root")).render(app);
