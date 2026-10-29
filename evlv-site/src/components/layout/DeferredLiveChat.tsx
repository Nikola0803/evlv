"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LiveChat = dynamic(
  () => import("./LiveChat").then((module) => module.LiveChat),
  { ssr: false },
);

// Chat is valuable after a visitor has seen the page. Loading its full UI on
// the critical path needlessly competes with the product catalogue and hero.
export function DeferredLiveChat() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 3_500);
    return () => window.clearTimeout(timer);
  }, []);

  return ready ? <LiveChat /> : null;
}
