import type { Metadata } from "next";
import { Poppins, Inter, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { getCatalogProducts } from "@/lib/catalog";
import { Footer } from "@/components/layout/Footer";
import { CartToast } from "@/components/layout/CartToast";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ReferralCapture } from "@/components/layout/ReferralCapture";
import { VerificationSync } from "@/components/layout/VerificationSync";
import { MembershipSync } from "@/components/layout/MembershipSync";
import { AgeGate } from "@/components/layout/AgeGate";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/components/layout/GoogleTagManager";
import { OmnisendSnippet } from "@/components/layout/OmnisendSnippet";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ChunkErrorReload } from "@/components/layout/ChunkErrorReload";
import { DeferredLiveChat } from "@/components/layout/DeferredLiveChat";
import { HalloweenExperience } from "@/components/promotion/HalloweenExperience";
import Script from "next/script";

const SITE_URL = "https://www.evlvpeptides.com";
const CRM_PUBLIC_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://crm.evlvpeptides.com";
const CRM_TRACKING_KEY = process.env.NEXT_PUBLIC_CRM_TRACKING_KEY || "cmtzmexzs002qbeckbre23u9i";

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

// Editorial serif used only for the single-product page's headline, to
// mirror the reference PDP's premium serif title treatment.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export function generateMetadata(): Metadata {
  const halloweenLive = Date.now() < new Date("2026-11-02T08:00:00.000Z").getTime();
  const title = "Research Peptides for Sale in the USA | Verified COAs | EVLV";
  const description = "U.S.-dispatched research peptides for laboratory and in-vitro analytical research, with exact product and batch COAs clearly labeled when available. Research use only.";
  const socialImage = halloweenLive ? "/images/social/evlv-halloween-bogo-og-v1.jpg" : "/images/hero-vial.png";
  const socialTitle = halloweenLive ? "EVLV Halloween BOGO | Buy 1, Get 1 Free" : title;
  const socialDescription = halloweenLive
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
    alternates: { canonical: "/", languages: { "en-US": "/" } },
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: "EVLV",
      title: socialTitle,
      description: socialDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: halloweenLive ? "EVLV Halloween BOGO buy one get one free event" : "EVLV research peptides" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
    },
    robots: { index: true, follow: true },
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
  legalName: "Warrior Distributions LLC",
  areaServed: ["US", "CA"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "office@evlvpeptides.com",
    areaServed: ["US", "CA"],
    availableLanguage: "English",
  },
  sameAs: ["https://verifiedpeptidereviews.com/vendors/evlv-peptides"],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "EVLV",
  url: SITE_URL,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const CHECKOUT_ROUTES = ["/checkout", "/order-success"];

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? "";
  const isCheckoutRoute = CHECKOUT_ROUTES.some((r) => pathname.startsWith(r));

  const products = isCheckoutRoute ? [] : await getCatalogProducts();

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${newsreader.variable} h-full antialiased`}>
      <head>
        <GoogleTagManagerHead />
        {/* The homepage LCP visual is a CSS background, so preload its compact
            source here. CSS backgrounds are otherwise discovered only after
            the stylesheet is parsed and cannot receive fetchPriority. */}
        <link
          rel="preload"
          as="image"
          href="/images/certified/evlv-hero-multi-vials-optimized.webp"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Non-render-blocking: fetched in background, applied when ready. Eliminates ~200ms+ CSS block on first load. */}
        <link rel="preload" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" as="style" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css';document.head.appendChild(l)})()` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, "\\u003c") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD).replace(/</g, "\\u003c") }} />
      </head>
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <ScrollToTop />
        <ChunkErrorReload />
        <GoogleTagManagerBody />
        <GoogleAnalytics />
        <OmnisendSnippet />
        <Script src={`${CRM_PUBLIC_URL}/pixel.js`} data-key={CRM_TRACKING_KEY} strategy="lazyOnload" />
        <ReferralCapture />
        <VerificationSync />
        <MembershipSync />
        <CurrencyProvider>
          <CartProvider>
            {isCheckoutRoute ? (
              <>
                <header className="border-b border-stone bg-ivory">
                  <div className="flex h-16 items-center justify-center px-4">
                    <Link href="/" className="inline-flex shrink-0 items-center">
                      <Image src="/logo/evlv-logo-dark.png" alt="EVLV" width={2172} height={724} className="h-6 w-auto" priority />
                    </Link>
                  </div>
                </header>
                <main className="flex-1 bg-white">{children}</main>
                <footer className="border-t border-stone py-5 text-center">
                  <p className="text-[11px] text-charcoal/40">
                    © EVLV {new Date().getFullYear()} · Warrior Distributions LLC ·{" "}
                    <Link href="/ruo" className="hover:underline">Research Use Only</Link>
                  </p>
                </footer>
              </>
            ) : (
              <AgeGate>
                <AnnouncementBar />
                <Header products={products} />
                <main className="flex-1 bg-white pt-[90px] md:pt-[100px]"><HalloweenExperience />{children}</main>
                <Footer />
                <CartToast />
                <CartDrawer products={products} />
                <DeferredLiveChat />
              </AgeGate>
            )}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
