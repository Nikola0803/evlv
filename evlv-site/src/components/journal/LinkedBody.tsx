import Link from "next/link";
import { Fragment } from "react";

type KwLink = { keyword: string; href: string };

// Longer / more-specific entries must come first so a phrase like
// "Certificate of Analysis" is matched before "analysis" would be.
const COMPOUND_LINKS: KwLink[] = [
  { keyword: "Certificates of Analysis", href: "/coas" },
  { keyword: "Certificate of Analysis", href: "/coas" },
  { keyword: "5-Amino-1MQ", href: "/5-amino-1mq-research" },
  { keyword: "CJC-1295", href: "/cjc-ipamorelin-research" },
  { keyword: "IGF-1 LR3", href: "/shop/igf-1-lr3-1mg" },
  { keyword: "WOLVERINE", href: "/wolverine-blend-research" },
  { keyword: "GHK-Cu", href: "/ghk-cu-research" },
  { keyword: "MOTS-C", href: "/mots-c-research" },
  { keyword: "GHRP-6", href: "/shop/ghrp-6-5mg" },
  { keyword: "AOD-9604", href: "/shop/aod-9604-5mg" },
  { keyword: "Semaglutide", href: "/semaglutide-research" },
  { keyword: "Tirzepatide", href: "/tirzepatide-research" },
  { keyword: "Tesamorelin", href: "/shop/tesamorelin-10mg" },
  { keyword: "elamipretide", href: "/ss-31-research" },
  { keyword: "Ipamorelin", href: "/cjc-ipamorelin-research" },
  { keyword: "Sermorelin", href: "/shop/sermorelin-10mg" },
  { keyword: "Glutathione", href: "/shop/glutathione-1500mg" },
  { keyword: "Hexarelin", href: "/shop/hexarelin-10mg" },
  { keyword: "Epitalon", href: "/shop/epitalon-10mg" },
  { keyword: "Selank", href: "/shop/selank-10mg" },
  { keyword: "Semax", href: "/shop/semax-10mg" },
  { keyword: "PT-141", href: "/shop/pt-141-10mg" },
  { keyword: "Oxytocin", href: "/shop/oxytocin-5mg" },
  { keyword: "LL-37", href: "/shop/ll-37-10mg" },
  { keyword: "SS-31", href: "/ss-31-research" },
  { keyword: "TB-500", href: "/tb-500-research" },
  { keyword: "BPC-157", href: "/bpc-157-research" },
  { keyword: "NAD+", href: "/nad-research" },
  { keyword: "GLOW", href: "/glow-blend-research" },
  { keyword: "KLOW", href: "/klow-blend-research" },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Normalize to lowercase letters+digits so "BPC-157" → "bpc157"
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

type TextNode = string;
type LinkNode = { href: string; display: string };
type Node = TextNode | LinkNode;

function applyKeyword(nodes: Node[], kw: KwLink): { nodes: Node[]; used: boolean } {
  const rx = new RegExp(`(${escapeRegex(kw.keyword)})`, "i");
  let used = false;
  const out: Node[] = [];
  for (const node of nodes) {
    if (used || typeof node !== "string") {
      out.push(node);
      continue;
    }
    const m = node.match(rx);
    if (!m || m.index === undefined) {
      out.push(node);
      continue;
    }
    const before = node.slice(0, m.index);
    const after = node.slice(m.index + m[0].length);
    if (before) out.push(before);
    out.push({ href: kw.href, display: m[0] });
    if (after) out.push(after);
    used = true;
  }
  return { nodes: out, used };
}

/**
 * Renders article body paragraphs with auto-injected first-occurrence internal
 * links for every EVLV compound / product keyword found in the text.
 *
 * Keywords that are the primary subject of the article (detected via the slug)
 * are linked exactly once in the body — providing Google a keyword-anchored
 * signal pointing back to the product hub page.
 */
export function LinkedBody({ body, slug }: { body: string[]; slug: string }) {
  const slugNorm = norm(slug);

  // Exclude keywords whose normalized form appears in the slug — those are the
  // article's own subject and are already covered by the relatedLinks sidebar.
  const available = COMPOUND_LINKS.filter((kw) => {
    const kwNorm = norm(kw.keyword);
    // Keep single-compound slugs filtered; comparison slugs (two compounds)
    // deliberately keep both so they each link to their respective hub pages.
    const slugWords = slug.split("-").filter(Boolean);
    // A slug that is "primarily" about a compound usually starts with it.
    return !(slugNorm.startsWith(kwNorm) || slugWords.slice(0, 2).join("").includes(kwNorm));
  });

  const usedKeywords = new Set<string>();

  return (
    <div className="space-y-6 text-base leading-relaxed text-charcoal/80 md:text-lg">
      {body.map((paragraph, paraIdx) => {
        let nodes: Node[] = [paragraph];

        for (const kw of available) {
          if (usedKeywords.has(norm(kw.keyword))) continue;
          const { nodes: next, used } = applyKeyword(nodes, kw);
          if (used) {
            nodes = next;
            usedKeywords.add(norm(kw.keyword));
          }
        }

        return (
          <p key={paraIdx}>
            {nodes.map((node, i) =>
              typeof node === "string" ? (
                <Fragment key={i}>{node}</Fragment>
              ) : (
                <Link
                  key={i}
                  href={node.href}
                  className="font-medium text-charcoal underline decoration-copper/40 underline-offset-2 transition hover:decoration-copper"
                >
                  {node.display}
                </Link>
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}
