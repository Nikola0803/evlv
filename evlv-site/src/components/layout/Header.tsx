"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useCart } from "@/lib/cart-context";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/science", label: "Science" },
  { href: "/coas", label: "COAs" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="fixed top-[32px] right-0 left-0 z-50 bg-charcoal/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <Logo tone="ivory" imgClassName="h-10 w-auto md:h-12" />

        <nav className="hidden items-center gap-7 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 md:flex lg:gap-9">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <button type="button" className="hidden h-9 w-9 items-center justify-center text-white/85 transition hover:text-white md:flex" aria-label="Search">
            <i className="ri-search-line text-base" />
          </button>
          <button type="button" className="hidden h-9 w-9 items-center justify-center text-white/85 transition hover:text-white md:flex" aria-label="Account">
            <i className="ri-user-line text-base" />
          </button>
          <button type="button" onClick={openCart} className="relative flex h-9 w-9 items-center justify-center text-white/85 transition hover:text-white" aria-label="Cart">
            <i className="ri-shopping-bag-line text-base" />
            {count > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[10px] font-semibold text-charcoal">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-white/85 transition hover:text-white md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <i className={open ? "ri-close-line text-base" : "ri-menu-line text-base"} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-charcoal px-4 pb-4 pt-2 md:hidden">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium uppercase tracking-wide text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
