"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CartDrawer = dynamic(() => import("./CartDrawer").then((mod) => mod.CartDrawer), { ssr: false });
const ConversionPrompts = dynamic(() => import("./ConversionPrompts").then((mod) => mod.ConversionPrompts), { ssr: false });
const LiveChat = dynamic(() => import("./LiveChat").then((mod) => mod.LiveChat), { ssr: false });
const QuizWidget = dynamic(() => import("./QuizWidget").then((mod) => mod.QuizWidget), { ssr: false });

export function DeferredWidgets({ showQuiz = false }: { showQuiz?: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const browser = window as typeof window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const id = browser.requestIdleCallback
      ? browser.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      : window.setTimeout(() => setReady(true), 1800);
    return () => browser.cancelIdleCallback ? browser.cancelIdleCallback(id) : window.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return <><CartDrawer /><ConversionPrompts /><LiveChat />{showQuiz ? <QuizWidget /> : null}</>;
}
