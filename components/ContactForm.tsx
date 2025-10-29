import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("Submitted. Replace with your form handler.");
      }}
      className="mx-auto max-w-2xl rounded-xl border border-neon-green/40 bg-[#0e1218] p-6 shadow-[0_0_40px_-10px_rgba(34,197,94,0.25)]"
    >
      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <span className="text-sm text-zinc-300">Name</span>
          <input className="mt-1 w-full rounded-md border border-[var(--color-border)]/30 bg-[#0b0f15] px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-neon-green/40" required />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-300">Email</span>
          <input type="email" className="mt-1 w-full rounded-md border border-[var(--color-border)]/30 bg-[#0b0f15] px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-neon-green/40" required />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-300">Message</span>
          <textarea rows={5} className="mt-1 w-full rounded-md border border-[var(--color-border)]/30 bg-[#0b0f15] px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-neon-green/40" required />
        </label>
        <button type="submit" className="mt-2 rounded-md border border-neon-green/50 bg-neon-green/10 px-5 py-2 text-neon-green hover:bg-neon-green/20">Send</button>
        {status && <p className="text-sm text-zinc-400">{status}</p>}
      </div>
    </form>
  );
}


