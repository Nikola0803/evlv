import type { Metadata } from "next";
import { CompoundHubPage } from "@/components/seo/CompoundHubPage";
import { COMPOUND_HUBS } from "@/lib/compound-hubs";

const hub = COMPOUND_HUBS.tirzepatide;
export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.description,
  alternates: { canonical: hub.path },
  openGraph: {
    title: `${hub.metaTitle} | EVLV`,
    description: hub.description,
    url: hub.path,
    type: "website",
    images: [{ url: "/images/products/tirzepatide-30mg.png", width: 800, height: 800, alt: "EVLV Tirzepatide research product" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${hub.metaTitle} | EVLV`,
    description: hub.description,
    images: ["/images/products/tirzepatide-30mg.png"],
  },
};
export default function Page() { return <CompoundHubPage hub={hub} />; }
