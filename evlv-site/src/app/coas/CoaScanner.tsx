"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Detector = { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>> };
type DetectorConstructor = new (options: { formats: string[] }) => Detector;

function lookupValue(value: string) {
  try {
    const url = new URL(value);
    if (url.pathname.startsWith("/coas/")) return url.pathname;
  } catch {
    // A raw lot code can still be searched in the library.
  }
  return `/coas?search=${encodeURIComponent(value)}`;
}

export function CoaScanner() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function stop() {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    frameRef.current = null;
    streamRef.current = null;
  }

  async function start() {
    const DetectorClass = (window as unknown as { BarcodeDetector?: DetectorConstructor }).BarcodeDetector;
    if (!DetectorClass || !navigator.mediaDevices?.getUserMedia) {
      setMessage("Camera scanning is not available in this browser. Use your phone camera to open the vial QR, or search the lot number above.");
      setOpen(true);
      return;
    }

    try {
      setMessage("");
      setOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play();
      const detector = new DetectorClass({ formats: ["qr_code"] });
      const scan = async () => {
        try {
          const codes = await detector.detect(video);
          const code = codes[0]?.rawValue;
          if (code) {
            stop();
            router.push(lookupValue(code));
            return;
          }
        } catch {
          // Keep attempting while the camera is warming up.
        }
        frameRef.current = requestAnimationFrame(scan);
      };
      frameRef.current = requestAnimationFrame(scan);
    } catch {
      setMessage("Camera access was not granted. Use your phone camera to open the vial QR, or search the lot number above.");
    }
  }

  function close() {
    stop();
    setOpen(false);
    setMessage("");
  }

  return (
    <>
      <button type="button" onClick={start} className="rounded-xl border border-stone bg-white px-4 py-3 text-xs font-semibold text-sage-deep transition hover:border-sage-deep hover:bg-sage-deep hover:text-white">
        <i className="ri-qr-scan-2-line mr-2 text-base" />Scan vial QR
      </button>
      {open && (
        <div className="fixed inset-0 z-[200] grid place-items-center bg-charcoal/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Scan COA QR code">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-deep">Lot verification</p><h2 className="mt-1 font-display text-xl font-semibold text-charcoal">Scan the vial QR</h2></div><button type="button" onClick={close} aria-label="Close scanner" className="text-xl text-charcoal/50 hover:text-charcoal"><i className="ri-close-line" /></button></div>
            {message ? <p className="mt-5 rounded-xl bg-ivory-soft p-4 text-sm leading-6 text-soft-gray">{message}</p> : <video ref={videoRef} muted playsInline className="mt-5 aspect-square w-full rounded-xl bg-charcoal object-cover" />}
            <p className="mt-4 text-xs leading-5 text-charcoal/55">The QR should open the exact EVLV lot record. Confirm the product, lot number, laboratory, and date before opening the source PDF.</p>
          </div>
        </div>
      )}
    </>
  );
}
