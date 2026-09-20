"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

// Same 4 real product photos + hover clips as the homepage hero tiles
// (public/videos/hero-tile-*.mp4, public/images/home/*) -- "Recovery"
// and "Longevity" map onto their same-named hero tile directly; the two
// generic hero tiles ("Research Peptides", "Research Stacks") fill the
// remaining Metabolic/Performance slots in hero order since neither has
// a more specific match among these four.
const CATEGORIES = [
  {
    num: "01",
    title: "Recovery Research",
    descriptor: "Tissue repair and regenerative pathway compounds.",
    compounds: "BPC-157 · TB-500",
    href: "/shop?category=peptides",
    image: "/images/home/goal-recovery.webp",
    video: "/videos/hero-tile-2-recovery.mp4",
  },
  {
    num: "02",
    title: "Metabolic Research",
    descriptor: "Weight and metabolic regulation research materials.",
    compounds: "Semaglutide · Tirzepatide · GP-3",
    href: "/shop?category=peptides",
    image: "/images/home/hero-card-1.webp",
    video: "/videos/hero-tile-1-peptides.mp4",
  },
  {
    num: "03",
    title: "Performance Research",
    descriptor: "Cellular energy and performance-focused compounds.",
    compounds: "MOTS-C · GHK-Cu",
    href: "/shop?category=ancillaries",
    image: "/images/home/hero-card-4.webp",
    video: "/videos/hero-tile-4-stacks.mp4",
  },
  {
    num: "04",
    title: "Longevity Research",
    descriptor: "Growth hormone and longevity pathway materials.",
    compounds: "CJC-1295 · Sermorelin · Tesamorelin",
    href: "/shop?category=peptides",
    image: "/images/home/goal-cellular.webp",
    video: "/videos/hero-tile-3-longevity.mp4",
  },
];

function CategoryTile({ image, video, title }: { image: string; video: string; title: string }) {
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter() {
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  }

  function handleLeave() {
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative h-full w-full overflow-hidden bg-charcoal transition duration-700 ease-out group-hover:scale-[1.04]"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 45vw, 320px"
        className={`object-cover transition-opacity duration-500 ${hovering ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hovering ? "opacity-100" : "opacity-0"}`}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export function ShopByCategory() {
  return (
    <section className="bg-ivory-soft pb-8 pt-20 md:pb-12 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-copper">04 / Explore by Research Area</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold text-charcoal md:text-4xl">Explore by research area</h2>
        </Reveal>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                <CategoryTile image={cat.image} video={cat.video} title={cat.title} />
                <span className="absolute left-4 top-4 font-display text-xs font-semibold tracking-[0.2em] text-copper">{cat.num}</span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-medium text-charcoal">{cat.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft-gray">{cat.descriptor}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.1em] text-charcoal/40">{cat.compounds}</p>
                </div>
                <i className="ri-arrow-right-line mt-1 shrink-0 text-charcoal/40 transition group-hover:translate-x-0.5 group-hover:text-sage-deep" />
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
