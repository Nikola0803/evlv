import { Metadata } from "next";
import Link from "next/link";
import { WholesaleForm } from "../WholesaleForm";

const SITE_URL = "https://www.evlvpeptides.com";

export const metadata: Metadata = {
  title: "Wholesale Partner Application | EVLV",
  description:
    "Apply for EVLV wholesale partner access. Complete the six-step compliance onboarding to receive pricing, catalog access, and dedicated account support for your qualified research business.",
  alternates: { canonical: "/wholesale/apply" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/wholesale/apply`,
    title: "Wholesale Partner Application — EVLV",
    description: "Six-step compliance onboarding for qualified U.S. research businesses. Complete the application to receive wholesale pricing and catalog access.",
  },
  robots: { index: false, follow: false },
};

export default function WholesaleApplyPage() {
  return (
    <div className="min-h-screen bg-[#07383a]">
      {/* Back navigation */}
      <div className="border-b border-white/10 px-5 py-3">
        <div className="mx-auto max-w-[1180px]">
          <Link
            href="/wholesale"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:text-white"
          >
            <i className="ri-arrow-left-line" /> Back to wholesale overview
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-white/10 px-5 py-10 text-center text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b9d9ce]">
          Partner Compliance Application
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
          EVLV Wholesale Onboarding
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60">
          All partner accounts require a completed six-step compliance review. This form collects
          the information our team needs to assess fit, assign an account contact, and confirm
          catalog access and pricing.
        </p>
        <div className="mx-auto mt-5 max-w-2xl rounded-lg border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-left text-xs leading-relaxed text-amber-200/80">
          <strong className="text-amber-200">RUO compliance requirement:</strong> All EVLV products are supplied exclusively for laboratory and in-vitro analytical research. Partners must confirm their operating model, customer base, and marketing approach are consistent with Research Use Only obligations before access is granted.
        </div>
      </div>

      {/* Form */}
      <div className="px-5 py-12">
        <div className="mx-auto max-w-[860px]">
          <WholesaleForm />
        </div>
      </div>
    </div>
  );
}
