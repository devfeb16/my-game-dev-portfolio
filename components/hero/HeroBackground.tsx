"use client";
import { useEffect, useRef, useState } from "react";

type HeroBackgroundProps = {
  className?: string;
  onLoaderComplete?: () => void;
};

export default function HeroBackground({
  className,
  onLoaderComplete,
}: HeroBackgroundProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    const video = document.getElementById("hero-bg-video") as HTMLVideoElement | null;
    if (!video) return;

    const ensureMp4Fallback = () => {
      const hasMp4 = Array.from(video.querySelectorAll("source")).some((s) =>
        (s as HTMLSourceElement).src.endsWith("/bgvideo/bg.mp4")
      );
      if (!hasMp4) {
        const mp4 = document.createElement("source");
        mp4.src = "/bgvideo/bg.mp4";
        mp4.type = "video/mp4";
        video.appendChild(mp4);
      }
      try { video.load(); } catch {}
    };

    try {
      const canPlayMov = video.canPlayType ? video.canPlayType("video/quicktime") : "";
      if (canPlayMov === "") {
        ensureMp4Fallback();
      }
    } catch {}

    const onError = () => {
      ensureMp4Fallback();
    };

    video.addEventListener("error", onError);

    // Hide loader after 4 seconds and notify parent (provides 3-5 second delay range)
    const hideLoader = () => {
      setLoaderVisible(false);
      setTimeout(() => {
        onLoaderComplete?.();
      }, 100);
    };

    const timer = setTimeout(hideLoader, 4000); // 4 second loader display

    return () => {
      video.removeEventListener("error", onError);
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
              0% { transform: rotate(-40deg); }
              50% { transform: rotate(0deg); }
              100% { transform: rotate(-40deg); }
            }
            @keyframes pacman-eating-bottom {
              0% { transform: rotate(80deg); }
              50% { transform: rotate(0deg); }
              100% { transform: rotate(80deg); }
            }
            @keyframes pacman-center {
              0% { transform: rotate(40deg); }
              50% { transform: rotate(0deg); }
              100% { transform: rotate(40deg); }
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
              animation: pacman-eating-top 0.5s infinite;
            }
            .pacman-bottom {
              animation: pacman-eating-bottom 0.5s infinite;
            }
            .pacman-center-ball {
              animation: pacman-center 0.5s infinite, pacman-ball 0.5s -0.33s infinite linear;
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

