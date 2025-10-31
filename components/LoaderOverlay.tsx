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
      <div className="pac-man" aria-hidden="true"></div>
    </div>
  );
}


