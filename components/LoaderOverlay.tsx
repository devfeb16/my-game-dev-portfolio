"use client";
import { useEffect, useState } from "react";

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    const video = document.getElementById("hero-bg-video") as HTMLVideoElement | null;

    if (video) {
      // If already buffered enough, hide immediately
      if (video.readyState >= 2) {
        hide();
      } else {
        const onReady = () => hide();
        video.addEventListener("canplay", onReady, { once: true });
        video.addEventListener("loadeddata", onReady, { once: true });
        video.addEventListener("canplaythrough", onReady, { once: true });
        try {
          video.load();
        } catch {}
      }
    } else {
      // Fallback: if video not yet in DOM, hide on next frame
      requestAnimationFrame(hide);
    }

    // Safety timeout in case video readiness takes too long
    const safety = window.setTimeout(hide, 4000);
    return () => {
      window.clearTimeout(safety);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="loader-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="pacman" aria-hidden="true">
        <div className="pacman-base"></div>
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


