export type GameButtonProps = {
	variant?: "primary" | "secondary";
	label: string;
	href?: string;
	onClick?: () => void;
	className?: string;
	ariaLabel?: string;
};

export default function GameButton({ variant = "primary", label, href, onClick, className, ariaLabel }: GameButtonProps) {
	const base =
		"inline-block select-none rounded-xl border px-6 py-3 font-semibold uppercase tracking-wide transition will-change-transform active:translate-y-[1px]";
	const styles =
		variant === "primary"
			? "border-[rgba(0,216,255,0.7)] bg-[linear-gradient(180deg,rgba(0,216,255,0.22),rgba(0,216,255,0.12))] text-[#00d8ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_20px_rgba(0,216,255,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_24px_rgba(0,216,255,0.35)]"
			: "border-[rgba(255,77,255,0.6)] bg-[linear-gradient(180deg,rgba(255,77,255,0.22),rgba(255,77,255,0.12))] text-[#ff4dff] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_20px_rgba(255,77,255,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_24px_rgba(255,77,255,0.35)]";

	const content = (
		<span className="relative inline-flex items-center gap-2">
			<span className="absolute inset-x-0 -top-2 mx-auto h-2 w-[70%] rounded-full bg-white/10 blur"></span>
			<span>{label}</span>
		</span>
	);

	if (href) {
		return (
			<a href={href} aria-label={ariaLabel || label} className={`${base} ${styles} ${className || ""}`}>
				{content}
			</a>
		);
	}
	return (
		<button type="button" aria-label={ariaLabel || label} onClick={onClick} className={`${base} ${styles} ${className || ""}`}>
			{content}
		</button>
	);
}
