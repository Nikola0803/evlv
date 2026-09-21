import { Metadata } from "next";
import { CoasClient } from "./CoasClient";
import { getCoaMap } from "@/lib/coa-data";

export const metadata: Metadata = {
  title: "Certificates of Analysis",
  description: "Independent batch verification reports (Certificates of Analysis) for every EVLV research peptide, searchable by batch code.",
  alternates: { canonical: "/coas" },
};

export default async function CoasPage() {
  const coaMap = await getCoaMap();
  return <CoasClient coaMap={coaMap} />;
}
