import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";
import { getMarket } from "@/lib/market";

const SHOP = [
  ["All Products", "/shop"], ["Research Peptides", "/research-peptides"],
  ["Peptide Blends", "/peptide-blends"], ["Bioregulators", "/bioregulators"],
  ["Metabolic Research", "/metabolic-research-peptides"], ["Mitochondrial Research", "/mitochondrial-research-peptides"],
  ["Research Peptides USA", "/research-peptides-usa"], ["COA Library", "/coas"], ["Wholesale", "/wholesale"],
] as const;

const SUPPORT = [
  ["Contact", "/contact"], ["Track Order", "/track-order"],
  ["Shipping", "/shipping"], ["Returns", "/returns"],
  ["Service Discount", "/heroes-discount"],
] as const;

const COMPANY = [
  ["About EVLV", "/about"], ["Research Journal", "/journal"],
  ["Partner Network", "/ambassadors"], ["FAQ", "/faq"], ["Sourcing & Quality", "/sourcing"],
] as const;

export function Footer() {
  const market = getMarket();
  const isAu = market.id === "AU";
  const shopLinks = isAu ? SHOP.filter(([label]) => label !== "Research Peptides USA" && label !== "Wholesale") : SHOP;
  const supportLinks = isAu ? SUPPORT.filter(([label]) => label !== "Service Discount") : SUPPORT;
  return (
    <footer className="cp-footer">
      <div className="cp-footer-inner">
        <div className="cp-footer-main">
          <div className="cp-footer-brand">
            <Logo tone="ivory" imgClassName="cp-footer-logo" />
            <p>Premium research-use-only peptides backed by transparent batch documentation.</p>
            <a href={`mailto:${market.supportEmail}`}>{market.supportEmail}</a>
            <a href="https://launchorbit.co" target="_blank" rel="noopener noreferrer nofollow" className="mt-3 inline-flex opacity-70 transition-opacity hover:opacity-100">
              <img src="/api/lb" alt="View this product on Launch Orbit" width="120" height="32" loading="lazy" />
            </a>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Support" links={supportLinks} />
          <FooterColumn title="Company" links={COMPANY} />
          <div className="cp-footer-newsletter"><NewsletterForm /></div>
        </div>

        <div className="cp-footer-meta">
          <div className="cp-footer-payments">
            <small>Secure card processing</small>
            <span><i className="ri-bank-card-line" />Credit &amp; debit cards</span>
            <span><i className="ri-shield-check-line" />Hosted by Niftipay</span>
            {!isAu && <span><i className="ri-bank-line" />Zelle · save 5%</span>}
            <span><i className="ri-lock-line" />Secure checkout</span>
          </div>
          <div className="cp-footer-contact-meta">
            <a href={`mailto:${market.supportEmail}`}>{market.supportEmail}</a>
          </div>
          <nav aria-label="Legal"><Link href="/ruo">Research Use Only</Link><Link href="/indemnity-waiver">Indemnity</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></nav>
        </div>

        <details id="legal-disclaimer" className="cp-footer-disclaimer">
          <summary>Research-use disclaimer <span>+</span></summary>
          <div>
            <p>All products sold on this website are intended for research and identification purposes only. They are not intended for human dosing, injection, ingestion, or veterinary use.</p>
            <p>{isAu ? "Products are supplied only for lawful laboratory and analytical research. They are not medicines, therapeutic goods, or intended for human or veterinary use." : "The statements on this website have not been evaluated by the U.S. Food and Drug Administration. Neither the statements nor the products are intended to diagnose, treat, cure, or prevent disease."}</p>
            {!isAu && <p>EVLV is a chemical supplier, not a compounding pharmacy or outsourcing facility as defined under sections 503A or 503B of the Federal Food, Drug, and Cosmetic Act.</p>}
          </div>
        </details>

        <div className="cp-footer-bottom"><span>© EVLV {new Date().getFullYear()}. All rights reserved. {market.legalEntity}.</span><span>Strictly for laboratory and analytical research.</span></div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: ReadonlyArray<readonly [string, string]> }) {
  return <div className="cp-footer-column"><p>{title}</p>{links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</div>;
}
