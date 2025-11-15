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
      className="group relative block h-full overflow-hidden rounded-xl border border-zinc-800/50 bg-gradient-to-br from-[#0c0e14]/80 to-[#0a0b0f]/80 p-1 transition-all duration-500 hover:border-neon-cyan/40 hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.3)] hover:-translate-y-1"
    >
      {/* Animated border glow on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/0 via-neon-cyan/5 to-neon-magenta/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
      
      <div className="relative h-full rounded-lg bg-[#0a0b0f]/40 p-4 backdrop-blur-sm">
        {/* Image Section */}
        <div className="relative h-44 w-full overflow-hidden rounded-lg border border-zinc-800/30 bg-gradient-to-br from-[#0c0e14] to-[#0a0b0f]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f]/90 via-transparent to-transparent z-10"></div>
          <Image 
            src={project.images[0] || "/images/placeholder.svg"} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          {/* Year badge */}
          <div className="absolute top-3 right-3 z-20 rounded-full bg-neon-cyan/20 backdrop-blur-md border border-neon-cyan/30 px-2.5 py-1 text-xs font-bold text-neon-cyan">
            {project.year}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-zinc-100 transition-colors duration-300 group-hover:text-neon-cyan">
              {project.title}
            </h3>
          </div>
          
          <div className="text-xs font-medium text-neon-blue/80 uppercase tracking-wider">
            {project.role}
          </div>
          
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>
          
          {/* Tech Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tools.slice(0, 3).map((tool) => (
              <span 
                key={tool} 
                className="rounded-md border border-zinc-700/50 bg-zinc-800/30 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400 backdrop-blur-sm transition-all duration-300 group-hover:border-neon-blue/30 group-hover:bg-neon-blue/10 group-hover:text-neon-blue/90"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neon-cyan/30 bg-neon-cyan/10 backdrop-blur-sm">
            <svg 
              className="h-4 w-4 text-neon-cyan" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}




