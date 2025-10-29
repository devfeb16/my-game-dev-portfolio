"use client";
import { useEffect, useRef, useState } from "react";

type HeroBackgroundProps = {
  className?: string;
  color?: number;
  backgroundColor?: number;
  scale?: number;
  scaleMobile?: number;
};

export default function HeroBackground({
  className,
  color = 0x00d8ff,
  backgroundColor = 0x202428,
  scale = 1.0,
  scaleMobile = 1.0,
}: HeroBackgroundProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<any>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handler = () => setReduced(media.matches);
    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isLowPower = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;
    if (!ref.current || reduced || isMobile || isLowPower) return;

    let cleanup: (() => void) | undefined;
    (async () => {
      const THREE = await import("three");
      const VANTA = (await import("vanta/dist/vanta.rings.min")) as any;
      effectRef.current = VANTA.default?.({
        el: ref.current,
        THREE: (THREE as any).default ?? THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        color,
        backgroundColor,
        backgroundAlpha: 1,
        scale,
        scaleMobile,
      });
      cleanup = () => {
        try {
          effectRef.current?.destroy?.();
        } catch {}
      };
    })();
    return () => cleanup?.();
  }, [color, backgroundColor, scale, scaleMobile, reduced]);

  return (
    <div ref={ref} className={`absolute inset-0 -z-0 overflow-hidden ${className || ""}`} aria-hidden="true">
      <noscript>
        <img src="/images/hero-fallback.svg" alt="" />
      </noscript>
      <div className="pointer-events-none hidden [@media(prefers-reduced-motion:reduce)]:block">
        <div className="absolute -inset-[20%] bg-[radial-gradient(circle_at_30%_20%,rgba(0,216,255,0.12),transparent_35%),radial-gradient(circle_at_70%_30%,rgba(255,77,255,0.12),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(136,255,0,0.1),transparent_35%)]"></div>
      </div>
    </div>
  );
}


