"use client";
import { useEffect, useRef, useState } from "react";

type HeroBackgroundProps = {
  className?: string;
  backgroundColor?: number;
  color?: number;
  color2?: number;
  size?: number;
};

export default function HeroBackground({
  className,
  backgroundColor = 0x0b0f12,
  color = 0xff3f81,
  color2 = 0xffffff,
  size = 1,
}: HeroBackgroundProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handler = () => setReduced(media.matches);
    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    // Prefer MOV; if browser can't play it, dynamically fall back to MP4
    const video = document.getElementById("hero-bg-video") as HTMLVideoElement | null;
    if (!video) return;

    const canPlayMov = video.canPlayType ? video.canPlayType("video/quicktime") : "";
    if (canPlayMov === "") {
      // Browser likely can't render MOV; try MP4 fallback if available
      const existingMp4 = Array.from(video.querySelectorAll("source")).some((s) =>
        (s as HTMLSourceElement).src.endsWith("/bgvideo/gamedev.mp4")
      );
      if (!existingMp4) {
        const mp4 = document.createElement("source");
        mp4.src = "/bgvideo/gamedev.mp4";
        mp4.type = "video/mp4";
        video.appendChild(mp4);
      }
      try { video.load(); } catch {}
    }

    const onError = () => {
      // If MOV fails to load for any reason, attempt MP4 once
      const hasMp4 = Array.from(video.querySelectorAll("source")).some((s) =>
        (s as HTMLSourceElement).type === "video/mp4"
      );
      if (!hasMp4) {
        const mp4 = document.createElement("source");
        mp4.src = "/bgvideo/gamedev.mp4";
        mp4.type = "video/mp4";
        video.appendChild(mp4);
        try { video.load(); } catch {}
      }
    };

    video.addEventListener("error", onError);
    return () => video.removeEventListener("error", onError);
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 z-0 overflow-hidden ${className || ""}`} aria-hidden="true">
      {!reduced ? (
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
      ) : (
        <div className="pointer-events-none block">
          <div className="absolute -inset-[20%] bg-[radial-gradient(circle_at_30%_20%,rgba(0,216,255,0.12),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(255,77,255,0.12),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(136,255,0,0.1),transparent_35%)]"></div>
        </div>
      )}
      <noscript>
        <img src="/images/hero-fallback.svg" alt="" />
      </noscript>
    </div>
  );
}


