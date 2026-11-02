import Link from "next/link";
import { getMarket } from "@/lib/market";

const SALE_ENDS = new Date("2026-10-27T04:59:59Z");

export function AnnouncementBar() {
  const isAu = getMarket().id === "AU";
  const saleActive = Date.now() < SALE_ENDS.getTime();

  if (saleActive) {
    return (
      <div className="cp-announcement">
        <span><b>25% off everything</b> · Code <b>EVLV25</b> · Ends Oct 26</span>
        <span>{isAu ? "Tracked Australian delivery | Customer support" : "Free BW 10mL with every order | Same-day support"}</span>
        {!isAu && <span><Link href="/heroes-discount" className="cp-announcement-heroes">Military &amp; Veterans — 25% for life →</Link></span>}
      </div>
    );
  }

  return (
    <div className="cp-announcement">
      <span><b>RESEARCH USE ONLY</b> · Not for human or veterinary use</span>
      <span>{isAu ? "Tracked Australian delivery | Customer support" : "Free priority shipping over $300 | Same-day support"}</span>
      {!isAu && <span><Link href="/heroes-discount" className="cp-announcement-heroes">Military &amp; Veterans — 25% for life →</Link></span>}
    </div>
  );
}
