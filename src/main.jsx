import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "/src/index.css";
import Box from "./Box.jsx";
import Background from "./Background.jsx";

const projects = [
  {
    eyebrow: "01 / identity",
    image: "pfp.png",
    title: "fireentity",
    text: "Music artist and developer building rhythm games, electronic releases, and compact web experiments.",
    size: [1.02, 1.68],
    image_pos: "left",
    accent: "#ffb38a",
    meta: "sound / code / interaction",
  },
  {
    eyebrow: "02 / game",
    image: "lightbound.png",
    title: "LIGHT//BOUND",
    text: "A flagship rhythm game shaped around fast lanes, bright ruins, and precise feedback.",
    size: [1.08, 2.18],
    image_pos: "left",
    accent: "#77d7ff",
    meta: "in development",
    featured: true,
  },
  {
    eyebrow: "03 / release",
    image: "fractured__anomaly.png",
    title: "FRACTURED ANOMALY",
    text: "A sharp electronic single with cover art that reads like a corrupted signal.",
    size: [1.04, 1.92],
    image_pos: "right",
    accent: "#ff8ca8",
    meta: "single",
  },
  {
    eyebrow: "04 / contact",
    title: "Signal",
    text: "[me@fireentity.space](mailto:me@fireentity.space)\n[github.com/fireentity1](https://github.com/fireentity1)",
    size: [0.82, 1.18],
    image_pos: "right",
    accent: "#c4b5fd",
    meta: "direct links",
  },
];

const useScrollAnimations = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      return undefined;
    }

    const root = document.documentElement;
    let ticking = false;
    const boxes = document.querySelectorAll(".box");

    const updateScrollVars = () => {
      const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / maxScroll;

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-y", `${window.scrollY.toFixed(1)}px`);
      ticking = false;
    };

    const requestScrollUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollVars);
        ticking = true;
      }
    };

    if (!("IntersectionObserver" in window)) {
      boxes.forEach((box) => box.classList.add("is-visible"));
      updateScrollVars();
      window.addEventListener("scroll", requestScrollUpdate, { passive: true });
      window.addEventListener("resize", requestScrollUpdate);

      return () => {
        window.removeEventListener("scroll", requestScrollUpdate);
        window.removeEventListener("resize", requestScrollUpdate);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    boxes.forEach((box) => observer.observe(box));
    updateScrollVars();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
    };
  }, []);
};

const App = () => {
  useScrollAnimations();

  return (
    <main>
      <Background />

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow tektur">music artist // developer</p>
          <h1 id="page-title" className="font">
            fireentity<wbr />
            .space
          </h1>
          <p className="hero-text">
            Rhythm games, electronic releases, and strange interactive systems.
          </p>
        </div>
      </section>

      <section id="work" className="container" aria-label="Featured work">
        {projects.map((box, index) => (
          <Box key={box.title} index={index} {...box} />
        ))}
      </section>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
