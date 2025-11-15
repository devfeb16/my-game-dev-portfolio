import { useEffect, useState } from "react";
import { useLoader } from "@/contexts/LoaderContext";

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true);
  const { setLoaderComplete } = useLoader();

  useEffect(() => {
    const hide = () => {
      setVisible(false);
      // Notify that loader is complete
      setLoaderComplete(true);
    };
    
    const video = document.getElementById("hero-bg-video");

    if (video) {
      // If already buffered enough, hide immediately
      if (video.readyState >= 2) {
        // Small delay to show pacman animation
        setTimeout(hide, 2000);
      } else {
        const onReady = () => {
          // Small delay to show pacman animation even if video loads fast
          setTimeout(hide, 2000);
        };
        video.addEventListener("canplay", onReady, { once: true });
        video.addEventListener("loadeddata", onReady, { once: true });
        video.addEventListener("canplaythrough", onReady, { once: true });
        try {
          video.load();
        } catch {}
      }
    } else {
      // Fallback(hide, 2000);
    }

    // Safety timeout in case video readiness takes too long (max 4 seconds)
    const safety = window.setTimeout(hide, 4000);
    return () => {
      window.clearTimeout(safety);
    };
  }, [setLoaderComplete]);

  if (!visible) return null;

  return (
    <div 
      className="loader-overlay transition-opacity duration-500" 
      role="status" 
      aria-live="polite" 
      aria-label="Loading"
    >
      <div className="pac-man" aria-hidden="true"></div>
    </div>
  );
}


