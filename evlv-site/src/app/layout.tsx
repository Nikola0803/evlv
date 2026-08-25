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
import { AgeGate } from "@/components/layout/AgeGate";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";

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
  title: "EVLV: Evolve. Become Your Ultimate.",
  description: "Premium research peptides. Rigorously tested, third-party verified, every batch.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" />
      </head>
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
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
