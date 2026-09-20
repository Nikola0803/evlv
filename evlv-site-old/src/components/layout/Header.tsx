"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SearchWidget } from "./SearchWidget";
import { ShopMegaMenu } from "./ShopMegaMenu";
import { useCart } from "@/lib/cart-context";

const NAV = [
  { href: "/science", label: "Science" },
  { href: "/coas", label: "COAs" },
  { href: "/about", label: "About" },
  { href: "/affiliates", label: "Affiliates" },
  // Only shown from the lg breakpoint up -- between md and lg there isn't
  // room for a 6th nav item without overlapping the search/account/cart
  // icons on the right. Still reachable via the footer and mobile menu.
  { href: "/wholesale", label: "Wholesale", lgOnly: true },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-[32px] right-0 left-0 z-50 backdrop-blur-sm transition-colors duration-300 ${
        scrolled ? "bg-charcoal/95 shadow-sm shadow-black/20" : "bg-charcoal/20"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between px-4 transition-[padding] duration-300 md:px-8 ${
          scrolled ? "py-2.5 md:py-3" : "py-4 md:py-5"
        }`}
      >
        <Logo tone="ivory" imgClassName="h-10 w-auto md:h-12" />

        <nav className="hidden items-center gap-6 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 md:flex lg:gap-7">
          <ShopMegaMenu />
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap transition hover:text-white ${item.lgOnly ? "hidden lg:inline-block" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <SearchWidget />
          <Link href="/account" className="hidden h-9 w-9 items-center justify-center text-white/85 transition hover:text-white md:flex" aria-label="Account">
            <i className="ri-user-line text-base" />
          </Link>
          <button type="button" onClick={openCart} className="relative flex h-9 w-9 items-center justify-center text-white/85 transition hover:text-white" aria-label="Cart">
            <i className="ri-shopping-bag-line text-base" />
            {count > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-copper text-[10px] font-semibold text-charcoal">
                {count}
              </span>
            )}
          </button>
          <Link
            href="/plans"
            className="hidden shrink-0 whitespace-nowrap rounded-md bg-copper px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light md:block"
          >
            Get Started
          </Link>
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
          <Link href="/shop" onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium uppercase tracking-wide text-white">
            Shop
          </Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium uppercase tracking-wide text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/account" onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium uppercase tracking-wide text-white">
            My Account
          </Link>
        </nav>
      )}
    </header>
  );
}
