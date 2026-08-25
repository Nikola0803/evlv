import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";

const SHOP_NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/coas", label: "COAs" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/affiliates", label: "Affiliate Program" },
];

const CUSTOMER_NAV = [
  { href: "/account", label: "Account" },
  { href: "/account", label: "Orders" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
];
const LEGAL_NAV = [
  { href: "/ruo", label: "Research Use Only" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal pb-10 pt-24 text-white md:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Logo tone="ivory" imgClassName="h-14 w-auto md:h-20" />
        <p className="mt-4 text-sm text-white/50">Evolve. Become your ultimate.</p>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
          {[
            { icon: "ri-flag-line", label: "Made in USA", sub: "With global standards" },
            { icon: "ri-shield-check-line", label: "cGMP Compliant", sub: "Facility" },
            { icon: "ri-test-tube-line", label: "Rigorous Testing", sub: "Protocols" },
            { icon: "ri-truck-line", label: "Fast & Discreet", sub: "Worldwide shipping" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <i className={`${item.icon} text-xl text-copper`} />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">{item.label}</p>
                <p className="text-[11px] text-white/40">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-white/10 pt-14 md:grid-cols-4">
          <FooterColumn title="Shop">
            {SHOP_NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Customer">
            {CUSTOMER_NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            {LEGAL_NAV.map((item) => (
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
