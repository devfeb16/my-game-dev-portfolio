type Stat = { label: string; value: string };
type HeroStatsProps = { stats?: Stat[]; className?: string };

const defaultStats: Stat[] = [
  { label: "Shipped Titles", value: "12+" },
  { label: "Downloads", value: "3k+" },
  { label: "Experience", value: "4 yrs" },
  { label: "LLM/ML Prototypes", value: "4" },
];

export default function HeroStats({ stats = defaultStats, className }: HeroStatsProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 ${className || ""}`}>
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg border border-[var(--color-border)]/40 bg-[#0c1117] p-4 text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-neon-cyan">{s.value}</div>
          <div className="mt-1 px-1 text-[11px] sm:text-xs md:text-sm lg:uppercase tracking-normal sm:tracking-wide lg:tracking-wider text-zinc-400 leading-tight break-words hyphens-auto whitespace-normal">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}


