import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "./NewsletterForm";

const SHOP_NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/coas", label: "COAs" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const CUSTOMER_NAV = ["Account", "Orders", "Shipping", "Returns"];
const LEGAL_NAV = ["Research Use Only", "Terms", "Privacy"];

export function Footer() {
  return (
    <footer className="bg-charcoal pb-10 pt-24 text-white md:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Logo tone="ivory" imgClassName="h-14 w-auto md:h-20" />
        <p className="mt-4 text-sm text-white/50">Evolve. Alter. Become your ultimate.</p>

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
            {CUSTOMER_NAV.map((label) => (
              <li key={label} className="text-sm text-white/40">
                {label}
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            {LEGAL_NAV.map((label) => (
              <li key={label} className="text-sm text-white/40">
                {label}
              </li>
            ))}
          </FooterColumn>

          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] border-t border-white/10 px-4 pt-8 md:px-8">
        <p className="max-w-2xl text-xs leading-relaxed text-white/40">
          EVLV products are intended strictly for research and laboratory use only. Not for human or veterinary use.
        </p>
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
