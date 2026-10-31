import type { Metadata } from "next";
import { CompoundHubPage } from "@/components/seo/CompoundHubPage";
import { COMPOUND_HUBS } from "@/lib/compound-hubs";

const hub = COMPOUND_HUBS.semaglutidePillar;

export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.description,
  alternates: { canonical: hub.path },
  openGraph: { title: `${hub.metaTitle} | EVLV`, description: hub.description, url: hub.path, type: "website" },
};

export default function Page() {
  return <CompoundHubPage hub={hub} />;
}
