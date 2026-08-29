import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";
import { PAYMENT_GATEWAYS } from "@/lib/payment-config";

const RESEARCH_NAV = [
  { href: "/shop", label: "Products" },
  { href: "/shop", label: "Categories" },
  { href: "/coas", label: "Documentation" },
  { href: "/journal", label: "Journal" },
];

const COMPANY_NAV = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/account", label: "Account" },
  { href: "/affiliates", label: "Affiliate Program" },
  { href: "/wholesale", label: "Dropshipping & Wholesale" },
];

const POLICIES_NAV = [
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/heroes-discount", label: "Heroes Discount" },
  { href: "/ruo", label: "Research Use Only" },
  { href: "/sourcing", label: "Sourcing & Quality" },
  { href: "/indemnity-waiver", label: "Indemnity Waiver" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal pb-10 pt-24 text-white md:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <Logo tone="ivory" imgClassName="h-14 w-auto md:h-20" />
            <p className="mt-4 text-sm text-white/50">Evolve. Become your ultimate.</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">We Accept</p>
            {PAYMENT_GATEWAYS.map((gateway) => (
              <div key={gateway.id} className="flex items-center gap-1.5 text-white/60">
                <i className={`${gateway.icon} text-base text-copper`} />
                <span className="text-xs">{gateway.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-14 md:grid-cols-4">
          <FooterColumn title="Research">
            {RESEARCH_NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {COMPANY_NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Policies">
            {POLICIES_NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <NewsletterForm />
        </div>
      </div>

      <div id="legal-disclaimer" className="mx-auto mt-16 max-w-[1400px] scroll-mt-32 border-t border-white/10 px-4 pt-8 md:px-8">
        <div className="space-y-3 text-xs leading-relaxed text-white/40">
          <p>
            All products sold on this website are intended for research and identification purposes only. These
            products are not intended for human dosing, injection, or ingestion.
          </p>
          <p>
            The statements made on this website have not been evaluated by the US Food and Drug Administration. The
            statements and the products of this company are not intended to diagnose, treat, cure, or prevent any
            disease.
          </p>
          <p>
            EVLV is a chemical supplier, not a compounding pharmacy or outsourcing facility as defined under 503A or
            503B of the Federal Food, Drug, and Cosmetic Act.
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© EVLV {new Date().getFullYear()}. All rights reserved.</span>
          <span>EVLVPEPTIDES.COM</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-white/40">{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}
