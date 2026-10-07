import type { Metadata } from "next";
import { PartnerCommandCenter } from "./PartnerCommandCenter";

export const metadata: Metadata = {
  title: "Partner Command Center",
  description: "Private EVLV partner performance, attribution, commission, and payout dashboard.",
  robots: { index: false, follow: false },
};

export default function PartnerPage() {
  return <PartnerCommandCenter />;
}
