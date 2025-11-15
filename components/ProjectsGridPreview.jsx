import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsGridPreview() {
  const items = projects.slice(0, 4);
  return (
    <section className="mx-auto mt-24 max-w-7xl px-6">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-neon-magenta to-transparent"></div>
          <h2 className="font-[var(--font-orbitron)] text-3xl font-bold text-zinc-100 tracking-tight">
            Projects
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-neon-magenta via-transparent to-transparent"></div>
        </div>
        <Link 
          href="/projects" 
          className="group flex items-center gap-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-2 text-sm font-semibold text-neon-cyan transition-all duration-300 hover-neon-cyan/50 hover-neon-cyan/10 hover-[0_0_20px_rgba(34,211,238,0.25)]"
        >
          View all
          <svg 
            className="h-4 w-4 transition-transform duration-300 group-hover-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm-cols-2 lg-cols-4 gap-6">
        {items.map((p, idx) => (
          <div 
            key={p.title}
            className="fade-in"
            style={{ 
              animationDelay: `${idx * 100}ms`, 
              animationFillMode: 'both',
              opacity: 0
            }}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}




