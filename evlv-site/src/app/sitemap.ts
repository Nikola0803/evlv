import type { MetadataRoute } from "next";
import { getCatalogProducts } from "@/lib/catalog";
import { getJournalArticles } from "@/lib/journal-data";
import { LOCAL_COAS } from "@/lib/coa-data";
import { getCoaLotPath } from "@/lib/coa-lots";

const BASE_URL = "https://www.evlvpeptides.com";
const CONTENT_RELEASE = new Date("2026-10-28T00:00:00.000Z");

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/shop", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/research-peptides-usa", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/research-peptides", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/peptide-blends", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/bioregulators", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/metabolic-research-peptides", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/mitochondrial-research-peptides", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/research-lab-supplies", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/bpc-157-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/glp-research-series", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/ghk-cu-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/mots-c-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/tesamorelin-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/semaglutide-research", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tirzepatide-research", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tb-500-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/glow-blend-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/klow-blend-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/cjc-ipamorelin-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/kpv-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/nad-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/wolverine-blend-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/5-amino-1mq-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/fat-loss-peptide-research", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/high-purity-research-peptides", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/thymosin-alpha-1-research", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/coas", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/verify-your-vial", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/journal", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/track-order", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/wholesale", priority: 0.4, changeFrequency: "monthly" as const },
  { path: "/dropshipping", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/heroes-discount", priority: 0.3, changeFrequency: "monthly" as const },
  { path: "/plans", priority: 0.3, changeFrequency: "monthly" as const },
  { path: "/shipping", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/returns", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/ruo", priority: 0.2, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getCatalogProducts();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified: CONTENT_RELEASE,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/shop/${p.slug}`,
    ...(p.batch?.date ? { lastModified: new Date(p.batch.date) } : {}),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const journalEntries: MetadataRoute.Sitemap = getJournalArticles().map((a) => ({
    url: `${BASE_URL}/journal/${a.slug}`,
    lastModified: new Date(a.publishedDate),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const coaEntries: MetadataRoute.Sitemap = LOCAL_COAS.map((coa) => ({
    url: `${BASE_URL}${getCoaLotPath(coa)}`,
    lastModified: CONTENT_RELEASE,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...productEntries, ...journalEntries, ...coaEntries];
}
