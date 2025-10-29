import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsGridPreview() {
  const items = projects.slice(0, 4);
  return (
    <section className="mx-auto mt-14 max-w-6xl px-6">
      <div className="flex items-end justify-between">
        <h2 className="font-[var(--font-orbitron)] text-2xl text-zinc-100">Projects</h2>
        <Link href="/projects" className="text-sm text-neon-cyan hover:underline">View all</Link>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}


