"use client";

import Link from "next/link";
import { getShopMenuGroups } from "@/lib/shop-menu-data";

const groups = getShopMenuGroups();

function openQuiz() {
  window.dispatchEvent(new Event("evlv:open-quiz"));
}

export function ShopMegaMenu() {
  return (
    <div className="group relative">
      <Link href="/shop" className="whitespace-nowrap transition hover:text-white">
        Shop
      </Link>

      <div className="invisible absolute left-1/2 top-full w-[min(90vw,780px)] -translate-x-1/2 pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
        <div className="rounded-lg border border-white/10 bg-charcoal p-6 shadow-2xl shadow-black/40">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <p className="text-xs text-white/50">Every listing is independently HPLC-verified and COA-backed.</p>
            <Link
              href="/shop"
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-copper px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-charcoal transition hover:bg-copper-light"
            >
              Shop All <i className="ri-arrow-right-line" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-copper">{group.label}</p>
                <ul className="space-y-2">
                  {group.products.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/shop/${p.slug}`} className="text-sm text-white/70 transition hover:text-white">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-5 border-t border-white/10 pt-4">
            <Link href="/coas" className="flex items-center gap-1 text-xs font-medium text-white/50 transition hover:text-white">
              View COAs <i className="ri-arrow-right-line" />
            </Link>
            <button type="button" onClick={openQuiz} className="flex items-center gap-1 text-xs font-medium text-copper transition hover:text-copper-light">
              Take the Quiz <i className="ri-arrow-right-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
