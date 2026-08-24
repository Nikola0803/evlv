import { Hero } from "@/components/home/Hero";
import { TrustIconRow } from "@/components/ui/TrustIconRow";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { AboutSection } from "@/components/home/AboutSection";
import { ScienceSection } from "@/components/home/ScienceSection";
import { LabResultsPreview } from "@/components/home/LabResultsPreview";
import { TrustpilotWidget } from "@/components/home/TrustpilotWidget";
import { ValueSection } from "@/components/home/ValueSection";
import { FinalCta } from "@/components/home/FinalCta";

const HOME_TRUST_ITEMS = [
  { icon: "ri-shield-check-line", label: "Independently Tested" },
  { icon: "ri-checkbox-circle-line", label: "Batch Verified" },
  { icon: "ri-file-list-3-line", label: "COA Available" },
  { icon: "ri-lock-line", label: "Secure Checkout" },
  { icon: "ri-flask-line", label: "Research Use Only" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIconRow items={HOME_TRUST_ITEMS} />
      <FeaturedProducts />
      <TrustpilotWidget />
      <ShopByCategory />
      <AboutSection />
      <LabResultsPreview />
      <ValueSection />
      <ScienceSection />
      <FinalCta />
    </>
  );
}
