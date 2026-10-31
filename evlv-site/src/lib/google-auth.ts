"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfig) => void;
          prompt: (momentListener?: (notification: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => void) => void;
          renderButton: (element: HTMLElement, options: GoogleButtonOptions) => void;
          cancel: () => void;
        };
      };
    };
  }
}

interface GoogleIdConfig {
  client_id: string;
  callback: (response: { credential: string }) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
}

interface GoogleButtonOptions {
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape?: "rectangular" | "pill" | "circle" | "square";
  width?: number;
}

export interface GoogleUserInfo {
  email: string;
  name: string;
  given_name?: string;
  picture?: string;
  sub: string;
}

export function decodeGoogleCredential(credential: string): GoogleUserInfo | null {
  try {
    const [, payloadB64] = credential.split(".");
    const json = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as GoogleUserInfo;
  } catch {
    return null;
  }
}

export function getGoogleClientId(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
}

let gsiLoaded = false;
let gsiLoading = false;
const gsiCallbacks: Array<() => void> = [];

function loadGsiScript(onLoad: () => void) {
  if (typeof window === "undefined") return;
  if (gsiLoaded) { onLoad(); return; }
  gsiCallbacks.push(onLoad);
  if (gsiLoading) return;
  gsiLoading = true;
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  script.onload = () => {
    gsiLoaded = true;
    gsiLoading = false;
    gsiCallbacks.splice(0).forEach((cb) => cb());
  };
  script.onerror = () => { gsiLoading = false; };
  document.head.appendChild(script);
}

export function useGoogleSignIn(
  onCredential: (user: GoogleUserInfo, rawCredential: string) => void,
  opts?: { renderInto?: React.RefObject<HTMLElement | null>; buttonText?: GoogleButtonOptions["text"] },
) {
  const clientId = getGoogleClientId();
  const callbackRef = useRef(onCredential);
  callbackRef.current = onCredential;

  useEffect(() => {
    if (!clientId) return;

    loadGsiScript(() => {
      const google = window.google;
      if (!google) return;

      google.accounts.id.initialize({
        client_id: clientId,
        callback: (res) => {
          const user = decodeGoogleCredential(res.credential);
          if (user) callbackRef.current(user, res.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      if (opts?.renderInto?.current) {
        google.accounts.id.renderButton(opts.renderInto.current, {
          theme: "outline",
          size: "large",
          text: opts?.buttonText ?? "continue_with",
          shape: "rectangular",
          width: opts.renderInto.current.offsetWidth || undefined,
        });
      }
    });

    return () => {
      window.google?.accounts.id.cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  return { available: !!clientId };
}
