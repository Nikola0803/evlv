import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { getCatalogProducts } from "@/lib/catalog";
import { Footer } from "@/components/layout/Footer";
import { CartToast } from "@/components/layout/CartToast";
import { ReferralCapture } from "@/components/layout/ReferralCapture";
import { VerificationSync } from "@/components/layout/VerificationSync";
import { MembershipSync } from "@/components/layout/MembershipSync";
import { AgeGate } from "@/components/layout/AgeGate";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { OmnisendSnippet } from "@/components/layout/OmnisendSnippet";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ChunkErrorReload } from "@/components/layout/ChunkErrorReload";
import { DeferredWidgets } from "@/components/layout/DeferredWidgets";
import { HalloweenExperience } from "@/components/promotion/HalloweenExperience";
import { getMarket } from "@/lib/market";

const MARKET = getMarket();
const SITE_URL = MARKET.siteUrl;
const CRM_PUBLIC_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://crm.evlvpeptides.com";
const CRM_TRACKING_KEY = process.env.NEXT_PUBLIC_CRM_TRACKING_KEY || "cmtzmexzs002qbeckbre23u9i";
const CHECKOUT_ROUTES = ["/checkout", "/order-success", "/payment-return", "/payment-failed"];
const ACCESS_ROUTES = ["/account", "/login", "/register"];

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});


export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-pathname") ?? "";
  const isAccessRoute = ACCESS_ROUTES.some((route) => pathname.startsWith(route));
  const blackFridayLive = Date.now() < new Date("2026-12-01T07:59:59.000Z").getTime();
  const title = MARKET.id === "AU"
    ? "Research Peptides Australia | Verified COAs | EVLV"
    : "Research Peptides for Sale in the USA | Verified COAs | EVLV";
  const description = `${MARKET.fulfillmentLabel} research peptides for laboratory and in-vitro analytical research, with exact product and batch COAs clearly labeled when available. Research use only.`;
  const socialImage = "/images/hero-vial.png";
  const socialTitle = blackFridayLive ? "EVLV Black Friday BOGO | Buy 1, Get 1 Free" : title;
  const socialDescription = blackFridayLive
    ? "Buy any two eligible research products and the cheaper one is free, with no pair limit. Automatic discount and free priority shipping at $300. Research use only."
    : description;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | EVLV" },
    description,
    keywords: [
      "research peptides",
      "BPC-157",
      "research use only peptides",
      "peptide COA",
      "third-party tested peptides",
      "research chemicals",
    ],
    alternates: { canonical: "/", languages: { [MARKET.locale]: "/" } },
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: "EVLV",
      title: socialTitle,
      description: socialDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: blackFridayLive ? "EVLV Black Friday BOGO buy one get one free event" : "EVLV research peptides" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
    },
    // Account screens are conversion infrastructure, not authority pages.
    // Keep crawl budget focused on public research, product, and COA routes.
    robots: isAccessRoute ? { index: false, follow: false } : { index: true, follow: true },
  };
}

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "EVLV",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/evlv-logo-light.png`,
  description: "High-purity research peptides supplied for laboratory and in-vitro analytical research. Batch-level Certificates of Analysis published. Not for human or animal use.",
  legalName: MARKET.legalEntity,
  areaServed: MARKET.country,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: MARKET.supportEmail,
    areaServed: MARKET.country,
    availableLanguage: "English",
  },
  sameAs: [],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "EVLV",
  url: SITE_URL,
  inLanguage: MARKET.locale,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? "";
  const isCheckoutRoute = CHECKOUT_ROUTES.some((r) => pathname.startsWith(r));
  const isAccessRoute = ACCESS_ROUTES.some((r) => pathname.startsWith(r));
  const isGateBypass = ["/login", "/register", "/account", "/join25"].some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const accessCookie = MARKET.id !== "AU" && (await cookies()).get("evlv_research_access")?.value === "1";

  const products = isCheckoutRoute ? [] : await getCatalogProducts();
  const storefront = (
    <>
      <AnnouncementBar />
      <Header products={products} />
      <main className="flex-1 bg-white pt-[90px] md:pt-[100px]"><HalloweenExperience />{children}</main>
      <Footer />
      <CartToast />
      <DeferredWidgets showQuiz={MARKET.id === "AU"} />
    </>
  );

  return (
    <html lang={MARKET.locale} className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <head>
        {/* Non-render-blocking: fetched in background, applied when ready. Eliminates ~200ms+ CSS block on first load. */}
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" as="style" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css';document.head.appendChild(l)})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, "\\u003c") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD).replace(/</g, "\\u003c") }} />
      </head>
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <ScrollToTop />
        <ChunkErrorReload />
        <GoogleAnalytics />
        <OmnisendSnippet />
        <Script src={`${CRM_PUBLIC_URL}/pixel.js`} data-key={CRM_TRACKING_KEY} strategy="lazyOnload" />
        <ReferralCapture />
        <VerificationSync />
        <MembershipSync />
        <CurrencyProvider marketCurrency={MARKET.currency}>
          <CartProvider>
            {isCheckoutRoute ? (
              <>
                <header className="border-b border-stone bg-ivory">
                  <div className="flex h-16 items-center justify-center px-4">
                    <Link href="/" className="inline-flex shrink-0 items-center">
                      <Image src="/logo/evlv-logo-dark.webp" alt="EVLV" width={252} height={84} sizes="126px" className="h-6 w-auto" priority />
                    </Link>
                  </div>
                </header>
                <main className="flex-1 bg-white">{children}</main>
                <footer className="border-t border-stone py-5 text-center">
                  <p className="text-[11px] text-charcoal/40">
                    © EVLV {new Date().getFullYear()} · {MARKET.legalEntity} ·{" "}
                    <Link href="/ruo" className="hover:underline">Research Use Only</Link>
                  </p>
                </footer>
              </>
            ) : isAccessRoute ? (
              <main className="flex-1 bg-[#f7fbf9]">{children}</main>
            ) : MARKET.id === "AU" ? (
              storefront
            ) : (
              <AgeGate initialAccepted={isGateBypass || accessCookie}>
                {storefront}
              </AgeGate>
            )}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
