import Image from "next/image";

export type Project = {
  title: string;
  year: number;
  role: string;
  tools: string[];
  description: string;
  images: string[];
  link: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link || "/projects"}
      className="group block rounded-xl border border-[var(--color-border)]/40 bg-[#0c0e14]/60 p-3 hover:border-neon-cyan/50 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.25)] transition"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-lg">
        <Image src={project.images[0] || "/images/placeholder.svg"} alt={project.title} fill className="object-cover transition-transform group-hover:scale-105" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <h3 className="text-zinc-100 font-medium">{project.title}</h3>
        <span className="text-xs text-neon-cyan">{project.year}</span>
      </div>
      <div className="mt-1 text-xs text-zinc-400">{project.role}</div>
      <div className="mt-2 line-clamp-2 text-sm text-zinc-400">{project.description}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tools.slice(0, 3).map((t) => (
          <span key={t} className="text-[10px] uppercase tracking-wider text-neon-blue/90">{t}</span>
        ))}
      </div>
    </a>
  );
}


