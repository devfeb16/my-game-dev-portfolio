"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroBackground({
  className,
  onLoaderComplete,
}) {
  const ref = useRef(null);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    const video = document.getElementById("hero-bg-video");
    if (!video) return;

    // Optimize video loading
    const optimizeVideo = () => {
      // Set video loading priority
      if ('loading' in video) {
        video.loading = 'eager';
      }

      // Ensure video starts loading immediately
      if (video.readyState === 0) {
        try {
          video.load();
        } catch (e) {
          console.log("Video load error:", e);
        }
      }

      // Try to play video immediately (will be muted)
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented, but video will play when loader completes
          console.log("Video autoplay prevented:", error);
        });
      }
    };

    // Ensure MP4 is available as fallback
    const ensureMp4Fallback = () => {
      const hasMp4 = Array.from(video.querySelectorAll("source")).some((s) =>
        s.src && s.src.endsWith("/bgvideo/bg.mp4")
      );
      if (!hasMp4) {
        const mp4 = document.createElement("source");
        mp4.src = "/bgvideo/bg.mp4";
        mp4.type = "video/mp4";
        // Insert MP4 as first source for priority
        video.insertBefore(mp4, video.firstChild);
        try { 
          video.load();
          optimizeVideo();
        } catch (e) {
          console.log("Error loading MP4 fallback:", e);
        }
      }
    };

    // Check video format support and optimize
    try {
      const canPlayMp4 = video.canPlayType ? video.canPlayType("video/mp4") : "";
      const canPlayMov = video.canPlayType ? video.canPlayType("video/quicktime") : "";
      
      // If MP4 is supported, ensure it's loaded first
      if (canPlayMp4) {
        ensureMp4Fallback();
      } else if (canPlayMov === "") {
        // Neither format supported, try MP4 as fallback
        ensureMp4Fallback();
      }
    } catch (e) {
      console.log("Video format check error:", e);
    }

    // Optimize video loading
    optimizeVideo();

    const onError = () => {
      ensureMp4Fallback();
      optimizeVideo();
    };

    video.addEventListener("error", onError);

    // Hide loader when video is ready (coordinated with LoaderOverlay)
    // This loader in HeroBackground is just a backup/visual indicator
    const hideLoader = () => {
      setLoaderVisible(false);
      setTimeout(() => {
        onLoaderComplete?.();
      }, 100);
    };

    // Check if video is ready
    const checkVideoReady = () => {
      if (video.readyState >= 3) {
        // Video has enough data to play
        hideLoader();
        return true;
      }
      return false;
    };

    // If already ready, hide immediately
    if (checkVideoReady()) {
      return;
    }

    // Listen for video readiness
    const onCanPlay = () => {
      if (video.readyState >= 3) {
        hideLoader();
      }
    };

    const onCanPlayThrough = () => {
      hideLoader();
    };

    video.addEventListener("canplay", onCanPlay, { once: true });
    video.addEventListener("canplaythrough", onCanPlayThrough, { once: true });

    // Safety timeout - hide after 3 seconds max
    const timer = setTimeout(hideLoader, 3000);

    return () => {
      video.removeEventListener("error", onError);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      clearTimeout(timer);
    };
  }, [onLoaderComplete]);

  return (
    <div ref={ref} className={`absolute inset-0 z-0 overflow-hidden ${className || ""}`} aria-hidden="true">
      <video
        id="hero-bg-video"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        poster="/images/hero-fallback.svg"
        preload="auto"
        muted
        autoPlay
        playsInline
        loop
      >
        {/* MP4 first for better compatibility and faster loading */}
        <source src="/bgvideo/bg.mp4" type="video/mp4" />
        {/* MOV as fallback for Safari */}
        <source src="/bgvideo/bg.mov" type="video/quicktime" />
      </video>
      <noscript>
        <img src="/images/hero-fallback.svg" alt="" />
      </noscript>
      
      {/* Pac-Man Loader - scoped to hero */}
      {loaderVisible && (
        <>
          <style>{`
            @keyframes pacman-eating-top {
              0% { transform(-40deg); }
              50% { transform(0deg); }
              100% { transform(-40deg); }
            }
            @keyframes pacman-eating-bottom {
              0% { transform(80deg); }
              50% { transform(0deg); }
              100% { transform(80deg); }
            }
            @keyframes pacman-center {
              0% { transform(40deg); }
              50% { transform(0deg); }
              100% { transform(40deg); }
            }
            @keyframes pacman-ball {
              0% {
                opacity: 0.7;
                box-shadow:
                  70px 0 0 0 #fed75a,
                  120px 0 0 0 #fed75a,
                  170px 0 0 0 #fed75a,
                  220px 0 0 0 #fed75a;
              }
              100% {
                box-shadow:
                  20px 0 0 0 #fed75a,
                  70px 0 0 0 #fed75a,
                  120px 0 0 0 #fed75a,
                  170px 0 0 0 #fed75a;
              }
            }
            .pacman-top {
              animation-eating-top 0.5s infinite;
            }
            .pacman-bottom {
              animation-eating-bottom 0.5s infinite;
            }
            .pacman-center-ball {
              animation-center 0.5s infinite, pacman-ball 0.5s -0.33s infinite linear;
            }
          `}</style>
          <div className={`absolute inset-0 z-10 flex items-center justify-center bg-[#0b0f12]/90 transition-opacity duration-1000 ${loaderVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative" role="status" aria-live="polite" aria-label="Loading">
              {/* Pac-Man */}
              <div className="relative w-[70px] h-[35px] rounded-full rounded-b-none bg-[#fed75a] origin-bottom pacman-top">
                {/* Bottom half */}
                <div 
                  className="absolute w-[70px] h-[35px] bg-[#fed75a] mt-[35px] origin-top rounded-full rounded-t-none pacman-bottom"
                  style={{ transform: 'rotate(80deg)' }}
                />
                {/* Center circle */}
                <div className="absolute rounded-full bg-[#0b0f12] h-5 w-5 mt-[15px] ml-[30px] pacman-center-ball" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

