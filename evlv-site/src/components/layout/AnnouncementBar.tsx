"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const MESSAGES = [
  { text: "Research Use Only", href: null },
  { text: "Claim 10% Off By Subscribing", href: "/#newsletter" },
  { text: "Independently Tested, Every Batch", href: null },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4000);
    return () => window.clearInterval(id);
  }, []);

  const current = MESSAGES[index];
  const content = (
    <span key={index} className="animate-[fadeIn_0.4s_ease-out]">
      {current.text}
    </span>
  );

  return (
    <div className="fixed top-0 right-0 left-0 z-[60] flex h-[32px] items-center justify-center overflow-hidden bg-charcoal px-4 text-center text-[10px] uppercase tracking-[0.25em] text-white/70 md:text-[11px]">
      {current.href ? (
        <Link href={current.href} className="transition hover:text-copper">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
