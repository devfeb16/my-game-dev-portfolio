import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)]/30 bg-[#090a0e]">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-zinc-300">© {new Date().getFullYear()} UnityDevs.dev</span>
          <span className="ml-3 text-zinc-500">Unity • C# • LLM • ML</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-4">
            <Link className="hover:text-neon-cyan transition-colors" href="/projects">Projects</Link>
            <Link className="hover:text-neon-cyan transition-colors" href="/blogs">Blogs</Link>
            <Link className="hover:text-neon-cyan transition-colors" href="/about">About</Link>
            <Link className="hover:text-neon-cyan transition-colors" href="/contact">Contact</Link>
          </div>
          <div className="flex items-center gap-4 border-l border-[var(--color-border)]/30 pl-4">
            <Link className="hover:text-neon-cyan transition-colors" href="/login">Sign In</Link>
            <Link className="hover:text-neon-cyan transition-colors px-3 py-1 border border-neon-cyan/30 rounded hover:border-neon-cyan transition-colors" href="/login">Sign Up</Link>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-magenta/40 to-transparent"></div>
    </footer>
  );
}




