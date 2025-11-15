"use client";
import { GiAchievement } from "react-icons/gi";

const badges = [
  { label: "12+ Shipped", icon: "#00d8ff" },
  { label: "3M+ Downloads", icon: "#ff4dff" },
];

export default function PulsingBadges() {
  return (
    <div className="mt-6 flex gap-4">
      {badges.map((b, i) => {
        const Icon = b.icon;
        return (
          <div
            key={i}
            className="group relative flex items-center gap-2 rounded-lg border border-[var(--color-border)]/40 bg-[#0c1117]/80 px-3 py-2"
          >
            <Icon className="h-4 w-4 animate-pulse" style={{ color: b.color }} />
            <span className="text-xs text-zinc-300">{b.label}</span>
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover-100 transition-opacity"
              style={{
                boxShadow: `0 0 20px ${b.color}55`,
                animation: "pulse-ring 2s ease-out infinite",
              }}
            />
            <style jsx>{`
              @keyframes pulse-ring {
                0% { box-shadow: 0 0 0 0 ${b.color}88; }
                50% { box-shadow: 0 0 0 10px ${b.color}00; }
                100% { box-shadow: 0 0 0 0 ${b.color}00; }
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}

