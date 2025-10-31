import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-[var(--font-orbitron)] text-3xl text-zinc-100">Contact</h1>
      <p className="mt-2 text-zinc-400">Let’s build the next immersive experience together.</p>
      <div className="mt-8">
        <ContactForm />
      </div>
      <div className="mt-8 text-sm text-zinc-400">
        <div className="flex gap-4">
          <a className="hover:text-neon-cyan" href="#">LinkedIn</a>
          <a className="hover:text-neon-cyan" href="#">GitHub</a>
          <a className="hover:text-neon-cyan" href="#">Unity Profile</a>
        </div>
      </div>
    </div>
  );
}




