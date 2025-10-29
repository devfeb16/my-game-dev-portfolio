export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)]/30 bg-[#090a0e]">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-zinc-300">© {new Date().getFullYear()} PIXLS.dev</span>
          <span className="ml-3 text-zinc-500">Unity • C# • LLM • ML</span>
        </div>
        <div className="flex items-center gap-4">
          <a className="hover:text-neon-cyan" href="/projects">Projects</a>
          <a className="hover:text-neon-cyan" href="/about">About</a>
          <a className="hover:text-neon-cyan" href="/contact">Contact</a>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-magenta/40 to-transparent"></div>
    </footer>
  );
}


