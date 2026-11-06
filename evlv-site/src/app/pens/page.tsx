import { Metadata } from "next";
import { PensPageClient } from "./PensPageClient";

export const metadata: Metadata = {
  title: "EVLV Pens — Pre-Filled Autoinjector Peptide Pens",
  description:
    "EVLV pre-filled autoinjector pens for peptide research. Precision dosing, no reconstitution. BPC-157, TB-500, Sermorelin, Ipamorelin, PT-141, NAD+, GHK-Cu and more. Research use only.",
  keywords: [
    "peptide autoinjector pen",
    "pre-filled peptide pen",
    "BPC-157 pen",
    "TB-500 pen",
    "Sermorelin pen",
    "Ipamorelin pen",
    "PT-141 pen",
    "NAD pen",
    "EVLV pens",
  ],
  openGraph: {
    title: "EVLV Pens — Pre-Filled Autoinjector Peptide Pens",
    description: "Precision peptide delivery. No reconstitution. For laboratory research use only.",
  },
};

export default function PensPage() {
  return <PensPageClient />;
}
