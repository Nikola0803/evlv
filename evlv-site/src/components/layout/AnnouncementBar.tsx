"use client";

import { useEffect, useState } from "react";

const SALE_ENDS = new Date("2026-10-27T04:59:59Z");

export function AnnouncementBar() {
  const [halloweenLive, setHalloweenLive] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("halloween_preview") === "1") {
      setHalloweenLive(true);
      return;
    }
    fetch("/api/promotions/active", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setHalloweenLive(Boolean(data?.halloween?.live)))
      .catch(() => undefined);
  }, []);
  const saleActive = Date.now() < SALE_ENDS.getTime();

  if (halloweenLive) {
    return (
      <div className="cp-announcement">
        <span><b>HALLOWEEN BOGO</b> · Every second matching item is free · No limit</span>
        <span>Free priority shipping at $300 &nbsp;|&nbsp; Discount applied automatically</span>
      </div>
    );
  }

  if (saleActive) {
    return (
      <div className="cp-announcement">
        <span><b>25% off everything</b> · Code <b>EVLV25</b> · Ends Oct 26</span>
        <span>Free BW 10mL with every order &nbsp;|&nbsp; Same-day support</span>
      </div>
    );
  }

  return (
    <div className="cp-announcement">
      <span><b>RESEARCH USE ONLY</b> · Not for human or veterinary use</span>
      <span>Free priority shipping over $300 &nbsp;|&nbsp; Same-day support</span>
    </div>
  );
}
