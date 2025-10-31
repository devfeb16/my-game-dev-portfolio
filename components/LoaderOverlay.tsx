"use client";
import { useEffect, useState } from "react";

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    // Safety timeout in case 'load' takes too long
    const safety = window.setTimeout(hide, 5000);
    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(safety);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="loader-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="pacman" aria-hidden="true">
        <div className="pacman-mouth top"></div>
        <div className="pacman-mouth bottom"></div>
        <div className="pacman-eye"></div>
      </div>
      <div className="pac-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}


