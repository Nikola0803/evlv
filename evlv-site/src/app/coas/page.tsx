import { Metadata } from "next";
import { CoasClient } from "./CoasClient";

export const metadata: Metadata = {
  title: "COAs | EVLV",
  description: "Independent batch verification reports (Certificates of Analysis) for every EVLV product.",
};

export default function CoasPage() {
  return <CoasClient />;
}
