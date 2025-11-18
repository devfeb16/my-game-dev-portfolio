import { useEffect, useState } from "react";
import { useLoader } from "@/contexts/LoaderContext";

export default function LoaderOverlay() {
  const [visible, setVisible] = useState(true);
  const { setLoaderComplete } = useLoader();

  useEffect(() => {
    let isComplete = false;
    let cleanupFunctions = [];

    const hide = () => {
      if (isComplete) return;
      isComplete = true;

      const video = document.getElementById("hero-bg-video");
      
      // Ensure video is playing when loader completes
      if (video) {
        // Force video to play if it's not already playing
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented, but that's okay - video will play when user interacts
            console.log("Video autoplay prevented:", error);
          });
        }
      }

      setVisible(false);
      // Notify that loader is complete
      setLoaderComplete(true);
    };
    
    const video = document.getElementById("hero-bg-video");

    if (video) {
      // Minimum animation time (1 second - reduced from 2 seconds)
      const MIN_ANIMATION_TIME = 1000;
      let minTimeElapsed = false;
      let videoReady = false;

      const checkAndHide = () => {
        if (minTimeElapsed && videoReady && !isComplete) {
          hide();
        }
      };

      // Start minimum timer
      const minTimer = setTimeout(() => {
        minTimeElapsed = true;
        checkAndHide();
      }, MIN_ANIMATION_TIME);
      cleanupFunctions.push(() => clearTimeout(minTimer));

      // Check if video is already ready
      const checkVideoReady = () => {
        // Check if video can play through (readyState 4 = HAVE_ENOUGH_DATA)
        // Or at least has enough data to start (readyState 3 = HAVE_FUTURE_DATA)
        if (video.readyState >= 3) {
          videoReady = true;
          checkAndHide();
          return true;
        }
        return false;
      };

      // If already buffered enough, mark as ready
      if (checkVideoReady()) {
        // Video is ready, just wait for minimum time
      } else {
        // Wait for video to be ready
        const onCanPlay = () => {
          videoReady = true;
          checkAndHide();
        };

        const onCanPlayThrough = () => {
          videoReady = true;
          checkAndHide();
        };

        const onLoadedData = () => {
          // Video has loaded some data, check if it's enough
          if (video.readyState >= 3) {
            videoReady = true;
            checkAndHide();
          }
        };

        // Listen for video readiness events
        video.addEventListener("canplay", onCanPlay, { once: true });
        video.addEventListener("canplaythrough", onCanPlayThrough, { once: true });
        video.addEventListener("loadeddata", onLoadedData, { once: true });
        video.addEventListener("progress", () => {
          // Check periodically as video loads
          if (video.buffered.length > 0 && video.buffered.end(0) > 2) {
            // At least 2 seconds buffered
            videoReady = true;
            checkAndHide();
          }
        });

        cleanupFunctions.push(() => {
          video.removeEventListener("canplay", onCanPlay);
          video.removeEventListener("canplaythrough", onCanPlayThrough);
          video.removeEventListener("loadeddata", onLoadedData);
        });

        // Force video to start loading
        try {
          if (video.readyState === 0) {
            video.load();
          }
        } catch (e) {
          console.log("Video load error:", e);
        }
      }
    } else {
      // Video element not found, wait minimum time then hide
      setTimeout(hide, 1000);
    }

    // Safety timeout - maximum 3 seconds (reduced from 4)
    const safety = setTimeout(() => {
      if (!isComplete) {
        hide();
      }
    }, 3000);
    cleanupFunctions.push(() => clearTimeout(safety));

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
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


