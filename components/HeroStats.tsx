type Stat = { label: string; value: string };
type HeroStatsProps = { stats?: Stat[]; className?: string };

const defaultStats: Stat[] = [
  { label: "Shipped Titles", value: "12+" },
  { label: "Downloads", value: "3M+" },
  { label: "Experience", value: "6 yrs" },
  { label: "LLM/ML Prototypes", value: "4" },
];

export default function HeroStats({ stats = defaultStats, className }: HeroStatsProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${className || ""}`}>
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg border border-[var(--color-border)]/40 bg-[#0c1117] p-4 text-center">
          <div className="text-2xl font-bold text-neon-cyan">{s.value}</div>
          <div className="text-xs uppercase tracking-wider text-zinc-400">{s.label}</div>
        </div>
      ))}
    </div>
  );
}


