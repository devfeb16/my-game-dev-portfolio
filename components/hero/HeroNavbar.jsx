import Link from "next/link";
import { useRouter } from "next/router";


const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function HeroNavbar({ className }) {
  const router = useRouter();

  return (
    <nav className={`flex gap-6 ${className || ""}`}>
      {navItems.map((item) => {
        const isActive = 
          item.href === "/" 
            ? router.pathname === "/"
            : router.pathname === item.href || router.pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm uppercase tracking-wider transition-colors ${
              isActive
                ? "text-neon-cyan font-semibold border-b-2 border-neon-cyan pb-1"
                : "text-zinc-300 hover:text-neon-cyan"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
