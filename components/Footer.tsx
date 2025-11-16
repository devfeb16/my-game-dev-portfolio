import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="mt-16 border-t border-[var(--color-border)]/30 bg-[#090a0e] relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-8">
          {/* Brand section */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="group inline-block">
              <span className="font-[var(--font-orbitron)] text-xl font-bold text-neon-cyan">
                Unity<span className="text-white">Devs</span>
              </span>
              <span className="ml-2 inline-block h-0.5 w-6 rounded-full bg-neon-cyan/80 group-hover:w-10 transition-all"></span>
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs">
              Game Developer Portfolio • Unity • C# • LLM • ML
            </p>
            <p className="text-xs text-zinc-600 mt-2">
              © {new Date().getFullYear()} UnityDevs.dev. All rights reserved.
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
            {/* Main navigation */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Navigation
              </h3>
              <nav className="flex flex-col gap-2.5">
                <Link 
                  href="/projects" 
                  className="text-sm text-zinc-400 hover:text-neon-cyan transition-colors inline-flex items-center gap-2 group w-fit"
                >
                  <span className="h-px w-0 bg-neon-cyan group-hover:w-4 transition-all"></span>
                  Projects
                </Link>
                <Link 
                  href="/blogs" 
                  className="text-sm text-zinc-400 hover:text-neon-cyan transition-colors inline-flex items-center gap-2 group w-fit"
                >
                  <span className="h-px w-0 bg-neon-cyan group-hover:w-4 transition-all"></span>
                  Blogs
                </Link>
                <Link 
                  href="/about" 
                  className="text-sm text-zinc-400 hover:text-neon-cyan transition-colors inline-flex items-center gap-2 group w-fit"
                >
                  <span className="h-px w-0 bg-neon-cyan group-hover:w-4 transition-all"></span>
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-sm text-zinc-400 hover:text-neon-cyan transition-colors inline-flex items-center gap-2 group w-fit"
                >
                  <span className="h-px w-0 bg-neon-cyan group-hover:w-4 transition-all"></span>
                  Contact
                </Link>
              </nav>
            </div>

            {/* Auth section */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Account
              </h3>
              <nav className="flex flex-col gap-2.5">
                <Link 
                  href="/login" 
                  className={`text-sm transition-colors inline-flex items-center gap-2 group w-fit ${
                    router.pathname === '/login' 
                      ? 'text-neon-cyan font-medium' 
                      : 'text-zinc-400 hover:text-neon-cyan'
                  }`}
                >
                  <span className="h-px w-0 bg-neon-cyan group-hover:w-4 transition-all"></span>
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className={`text-sm transition-colors inline-flex items-center gap-2 group w-fit ${
                    router.pathname === '/signup' 
                      ? 'text-neon-cyan font-medium' 
                      : 'text-zinc-400 hover:text-neon-cyan'
                  }`}
                >
                  <span className="h-px w-0 bg-neon-cyan group-hover:w-4 transition-all"></span>
                  Sign Up
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom border with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/40 via-neon-magenta/40 to-transparent"></div>
        
        {/* Bottom text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-600">
            Built with Next.js • Powered by Unity & AI
          </p>
        </div>
      </div>
    </footer>
  );
}




