import Image from "next/image";

export default function FeaturedProject() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
        <h2 className="font-[var(--font-orbitron)] text-3xl font-bold text-zinc-100 tracking-tight">
          Featured Project
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan via-transparent to-transparent"></div>
      </div>
      
      <div className="group relative overflow-hidden rounded-2xl border border-neon-cyan/20 bg-gradient-to-br from-[#0c0e14]/90 via-[#0a0b0f]/90 to-[#0c0e14]/90 p-1 shadow-[0_0_60px_-15px_rgba(34,211,238,0.15)] transition-all duration-500 hover-neon-cyan/40 hover-[0_0_80px_-10px_rgba(34,211,238,0.3)]">
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/10 to-neon-cyan/0 opacity-0 blur-xl transition-opacity duration-500 group-hover-100"></div>
        
        <div className="relative grid grid-cols-1 md-cols-2 gap-8 rounded-xl bg-[#0a0b0f]/40 p-6 md:p-8 backdrop-blur-sm">
          {/* Image Section */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl border border-neon-cyan/10 bg-gradient-to-br from-[#0c0e14] to-[#0a0b0f] shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f]/80 via-transparent to-transparent z-10"></div>
            <Image 
              src="/images/neon-drift.svg" 
              alt="Neon Drift - Featured Project" 
              fill 
              className="object-cover transition-transform duration-700 group-hover-110" 
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-magenta/5 opacity-0 group-hover-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="mb-2 inline-block rounded-full bg-neon-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neon-cyan border border-neon-cyan/20">
                Featured
              </div>
              <h3 className="mt-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-cyan font-[var(--font-orbitron)] tracking-tight">
                Neon Drift
              </h3>
            </div>
            
            <p className="text-base leading-relaxed text-zinc-300">
              Procedurally generated tracks, dynamic difficulty, and optimized GPU particles designed for mobile performance at UnityDev.
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {["Unity", "C#", "URP", "Addressables"].map((tech, idx) => (
                <span 
                  key={tech}
                  className="rounded-lg border border-neon-blue/20 bg-neon-blue/5 px-3 py-1.5 text-xs font-medium text-neon-blue/90 backdrop-blur-sm transition-all duration-300 hover-neon-blue/40 hover-neon-blue/10 hover-[0_0_15px_rgba(96,165,250,0.2)]"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="pt-2">
              <a 
                href="/projects" 
                className="group/btn inline-flex items-center gap-2 rounded-lg border border-neon-magenta/30 bg-gradient-to-r from-neon-magenta/10 to-transparent px-6 py-3 text-sm font-semibold text-neon-magenta transition-all duration-300 hover-neon-magenta/50 hover-gradient-to-r hover-neon-magenta/20 hover-neon-magenta/10 hover-[0_0_25px_rgba(244,63,94,0.3)]"
              >
                See details
                <svg 
                  className="h-4 w-4 transition-transform duration-300 group-hover/btn-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




