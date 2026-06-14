import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "/src/index.css";
import Box from "./Box.jsx";

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
    const boxes = document.querySelectorAll(".bento-card");

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

const useBentoInteractions = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      return undefined;
    }

    const cards = document.querySelectorAll(".bento-card");
    const cleanups = [];

    cards.forEach((card) => {
      const maxTilt = 2.8;
      let frame = 0;
      let nextStyle = {
        tiltX: "0deg",
        tiltY: "0deg",
        shineX: "50%",
        shineY: "50%",
        imageX: "0px",
        imageY: "0px",
        angle: "135deg",
      };

      const applyCardState = () => {
        frame = 0;
        card.style.setProperty("--tilt-x", nextStyle.tiltX);
        card.style.setProperty("--tilt-y", nextStyle.tiltY);
        card.style.setProperty("--shine-x", nextStyle.shineX);
        card.style.setProperty("--shine-y", nextStyle.shineY);
        card.style.setProperty("--image-x", nextStyle.imageX);
        card.style.setProperty("--image-y", nextStyle.imageY);
        card.style.setProperty("--sheen-angle", nextStyle.angle);
      };

      const schedule = () => {
        if (!frame) {
          frame = window.requestAnimationFrame(applyCardState);
        }
      };

      const handlePointerMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const clampedX = Math.max(0, Math.min(1, x));
        const clampedY = Math.max(0, Math.min(1, y));

        nextStyle = {
          tiltX: `${((0.5 - clampedY) * maxTilt).toFixed(3)}deg`,
          tiltY: `${((clampedX - 0.5) * maxTilt).toFixed(3)}deg`,
          shineX: `${(clampedX * 100).toFixed(2)}%`,
          shineY: `${(clampedY * 100).toFixed(2)}%`,
          imageX: `${((0.5 - clampedX) * 6).toFixed(2)}px`,
          imageY: `${((0.5 - clampedY) * 6).toFixed(2)}px`,
          angle: `${(clampedX * 180 + clampedY * 80).toFixed(2)}deg`,
        };
        card.style.setProperty("--lift", "-3px");
        schedule();
      };

      const resetCard = () => {
        nextStyle = {
          tiltX: "0deg",
          tiltY: "0deg",
          shineX: "50%",
          shineY: "50%",
          imageX: "0px",
          imageY: "0px",
          angle: "135deg",
        };
        card.style.setProperty("--lift", "0px");
        schedule();
      };

      const handlePointerEnter = () => {
        card.style.setProperty("--lift", "-3px");
      };

      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerenter", handlePointerEnter);
      card.addEventListener("pointerleave", resetCard);
      card.addEventListener("pointercancel", resetCard);

      cleanups.push(() => {
        if (frame) {
          window.cancelAnimationFrame(frame);
        }

        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerenter", handlePointerEnter);
        card.removeEventListener("pointerleave", resetCard);
        card.removeEventListener("pointercancel", resetCard);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
};

const App = () => {
  useScrollAnimations();
  useBentoInteractions();

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-backdrop" aria-hidden="true">
          <span className="hero-fluid-sheet"></span>
          <span className="hero-ribbon hero-ribbon-one"></span>
          <span className="hero-ribbon hero-ribbon-two"></span>
          <span className="hero-stars hero-stars-far"></span>
          <span className="hero-stars hero-stars-mid"></span>
        </div>

        <div className="hero-copy">
          <p className="category-label hero-kicker">music artist // developer</p>
          <h1 id="page-title" className="hero-title">
            <span>fireentity</span>
            <span>.space</span>
          </h1>
          <p className="hero-subtitle">
            Rhythm games, electronic releases, and strange interactive systems.
          </p>
        </div>

        <div className="hero-horizon" aria-hidden="true"></div>
      </section>

      <section id="work" className="bento-grid" aria-label="Featured work">
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
