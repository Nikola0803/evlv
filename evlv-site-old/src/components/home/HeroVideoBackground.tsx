"use client";
import Image from "next/image";
import { useState } from "react";

export function HeroVideoBackground() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      {/* Mobile */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/hero-vial-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Desktop */}
      <div className="absolute inset-0 max-md:hidden">
        <Image
          src="/images/hero-vial.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src="/videos/hero-21by9.mp4" media="(min-aspect-ratio: 21/9)" type="video/mp4" />
          <source src="/videos/hero-evlv.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
}
