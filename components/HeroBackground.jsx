"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroBackground({
  className,
  backgroundColor = 0x0b0f12,
  color = 0xff3f81,
  color2 = 0xffffff,
  size = 1,
}) {
  const ref = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = document.getElementById("hero-bg-video");
    if (!video) return;

    const ensureMp4Fallback = () => {
      const hasMp4 = Array.from(video.querySelectorAll("source")).some((s) =>
        s.src && s.src.endsWith("/bgvideo/bg.mp4")
      );
      if (!hasMp4) {
        const mp4 = document.createElement("source");
        mp4.src = "/bgvideo/bg.mp4"; // expected optional fallback alongside bg.mov
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
    return () => video.removeEventListener("error", onError);
  }, []);

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
    </div>
  );
}


