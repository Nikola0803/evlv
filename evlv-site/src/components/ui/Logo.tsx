import Link from "next/link";

export function Logo({ tone = "sage", className = "" }: { tone?: "sage" | "ivory" | "charcoal"; className?: string }) {
  const color = tone === "ivory" ? "text-ivory" : tone === "charcoal" ? "text-charcoal" : "text-sage-deep";
  return (
    <Link href="/" className={`font-display font-semibold tracking-[0.32em] ${color} ${className}`}>
      EVLV
    </Link>
  );
}
