import type { Metadata } from "next";
import { ResearchCategoryPage } from "@/components/seo/ResearchCategoryPage";
import { RESEARCH_CATEGORY_PAGES } from "@/lib/research-category-pages";

const definition = RESEARCH_CATEGORY_PAGES.researchPeptides;

export const metadata: Metadata = {
  title: definition.metaTitle,
  description: definition.description,
  alternates: { canonical: definition.path },
  openGraph: { title: `${definition.metaTitle} | EVLV`, description: definition.description, url: definition.path, type: "website" },
};

export default function Page() {
  return <ResearchCategoryPage definition={definition} />;
}
