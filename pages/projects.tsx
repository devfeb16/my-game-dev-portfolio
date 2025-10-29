import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-[var(--font-orbitron)] text-3xl text-zinc-100">Projects</h1>
      <p className="mt-2 text-zinc-400">Unity games and ML/LLM experiments.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  );
}


