import { Metadata } from "next";
import { LabResultsClient } from "./LabResultsClient";

export const metadata: Metadata = {
  title: "Lab Results | EVLV",
  description: "Independent batch verification reports for every EVLV product.",
};

export default function LabResultsPage() {
  return <LabResultsClient />;
}
