import Link from "next/link";

const SALE_ENDS = new Date("2026-10-27T04:59:59Z");

export function AnnouncementBar() {
  const saleActive = Date.now() < SALE_ENDS.getTime();

  if (saleActive) {
    return (
      <div className="cp-announcement">
        <span><b>25% off everything</b> · Code <b>EVLV25</b> · Ends Oct 26</span>
        <span>Free BW 10mL with every order &nbsp;|&nbsp; Same-day support</span>
        <span><Link href="/heroes-discount" className="cp-announcement-heroes">Military &amp; Veterans — 25% for life →</Link></span>
      </div>
    );
  }

  return (
    <div className="cp-announcement">
      <span><b>RESEARCH USE ONLY</b> · Not for human or veterinary use</span>
      <span>Free priority shipping over $300 &nbsp;|&nbsp; Same-day support</span>
      <span><Link href="/heroes-discount" className="cp-announcement-heroes">Military &amp; Veterans — 25% for life →</Link></span>
    </div>
  );
}
