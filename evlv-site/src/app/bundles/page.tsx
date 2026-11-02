import { redirect } from "next/navigation";

// Product bundles are not part of the approved research-material catalogue.
// Preserve old inbound links without publishing an alternative bundle page.
export default function BundlesPage() {
  redirect("/shop");
}
