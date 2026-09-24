import type { Metadata } from "next";
import { Poppins, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { getCatalogProducts } from "@/lib/catalog";
import { Footer } from "@/components/layout/Footer";
import { CartToast } from "@/components/layout/CartToast";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { QuizWidget } from "@/components/layout/QuizWidget";
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
import { ConversionPrompts } from "@/components/layout/ConversionPrompts";

const SITE_URL = "https://evlvpeptides.com";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EVLV Peptides: High-Purity Research Peptides for Laboratory Analysis",
    template: "%s | EVLV",
  },
  description:
    "High-purity research peptides supplied for laboratory and in-vitro analytical research. Certificate of Analysis published for every lot. Not for human or animal use.",
  keywords: [
    "research peptides",
    "BPC-157",
    "research use only peptides",
    "peptide COA",
    "third-party tested peptides",
    "research chemicals",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "EVLV",
    title: "EVLV Peptides: High-Purity Research Peptides for Laboratory Analysis",
    description: "High-purity research peptides supplied for laboratory and in-vitro analytical research. Batch-level Certificates of Analysis published. Not for human or animal use.",
    images: [{ url: "/images/hero-vial.png", width: 1200, height: 630, alt: "EVLV research peptides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EVLV Peptides: High-Purity Research Peptides for Laboratory Analysis",
    description: "High-purity research peptides supplied for laboratory and in-vitro analytical research. Batch-level Certificates of Analysis published. Not for human or animal use.",
    images: ["/images/hero-vial.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EVLV",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/evlv-logo-light.png`,
  description: "High-purity research peptides supplied for laboratory and in-vitro analytical research. Batch-level Certificates of Analysis published. Not for human or animal use.",
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EVLV",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Same CRM-merge pipeline the /shop page uses (see product-feed.ts) --
  // fetched once here so the header mega menu and every page under it see
  // the same CRM-aware catalog instead of the header falling back to the
  // static-only list while /shop shows live CRM stock/pricing.
  const products = await getCatalogProducts();
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${newsreader.variable} h-full antialiased`}>
      <head>
        <GoogleTagManagerHead />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }} />
        {process.env.NEXT_PUBLIC_CRM_URL && process.env.NEXT_PUBLIC_CRM_TRACKING_KEY && (
          <script src={`${process.env.NEXT_PUBLIC_CRM_URL}/pixel.js`} data-key={process.env.NEXT_PUBLIC_CRM_TRACKING_KEY} async />
        )}
      </head>
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <ScrollToTop />
        <ChunkErrorReload />
        <GoogleTagManagerBody />
        <GoogleAnalytics />
        <OmnisendSnippet />
        <ReferralCapture />
        <VerificationSync />
        <MembershipSync />
        <CurrencyProvider>
          <CartProvider>
            <AgeGate>
              <AnnouncementBar />
              <Header products={products} />
              <main className="flex-1 bg-white pt-[90px] md:pt-[100px]">{children}</main>
              <Footer />
              <CartToast />
              <CartDrawer products={products} />
              <QuizWidget />
              <ConversionPrompts />
            </AgeGate>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
