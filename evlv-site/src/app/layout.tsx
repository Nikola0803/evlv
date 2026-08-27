import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartToast } from "@/components/layout/CartToast";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { QuizWidget } from "@/components/layout/QuizWidget";
import { RecentPurchaseToast } from "@/components/layout/RecentPurchaseToast";
import { ReferralCapture } from "@/components/layout/ReferralCapture";
import { AgeGate } from "@/components/layout/AgeGate";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/components/layout/GoogleTagManager";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EVLV: Evolve. Become Your Ultimate.",
    template: "%s | EVLV",
  },
  description:
    "Premium research peptides, independently tested and batch-verified. Certificates of Analysis published for every lot. Research use only.",
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
    title: "EVLV: Evolve. Become Your Ultimate.",
    description: "Premium research peptides, independently tested and batch-verified. Research use only.",
    images: [{ url: "/images/hero-vial.png", width: 1200, height: 630, alt: "EVLV research peptides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EVLV: Evolve. Become Your Ultimate.",
    description: "Premium research peptides, independently tested and batch-verified. Research use only.",
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
  description: "Premium research peptides, independently tested and batch-verified. Research use only.",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
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
        <GoogleTagManagerBody />
        <GoogleAnalytics />
        <ReferralCapture />
        <CurrencyProvider>
          <CartProvider>
            <AgeGate>
              <AnnouncementBar />
              <Header />
              <main className="flex-1 pt-[90px] md:pt-[100px]">{children}</main>
              <Footer />
              <CartToast />
              <CartDrawer />
              <QuizWidget />
              <RecentPurchaseToast />
            </AgeGate>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
