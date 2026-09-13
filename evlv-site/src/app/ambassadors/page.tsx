import { Metadata } from "next";
import Link from "next/link";
import { AffiliateForm } from "./AffiliateForm";
import content from "./ambassador-content.json";

export const metadata: Metadata = {
  title: "Ambassador Program | EVLV",
  description:
    "Join the EVLV Ambassador Program — share research-grade peptides and compounds with your audience, and earn commission on every order they place.",
};

export default function AmbassadorsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: content.css }} />

      {/* Top bar */}
      <div className="border-b border-stone bg-charcoal py-2.5 text-center text-xs text-white/70">
        Already an ambassador?{" "}
        <Link href="/account?tab=affiliate" className="font-semibold text-copper-light underline underline-offset-2 hover:text-copper">
          Sign in
        </Link>
      </div>

      <div id="evlv-ambassador-content" className="ρd__all ρr-56UMf ρdss ρmns ρtns-56UMf">
        <div dangerouslySetInnerHTML={{ __html: content.htmlBefore }} />

        <section className="ρd__all ρ_6L9H">
          <div className="ρd__all ρhrjMa">
            <div className="ρd__all ρqMeVe">
              <div className="ρd__all ρkGKnj">
                <span className="ρd__all ρd__span ρd__span__56UMf ρt ρzdrxq">Apply Now</span>
              </div>
              <h2 className="ρd__all ρd__h2 ρd__h2__56UMf ρt ρbw8Rc">Apply to become an EVLV Ambassador.</h2>
              <p className="ρd__all ρd__p ρd__p__56UMf ρt ρg7R2G">
                We review every application by hand, typically within 48 hours.
              </p>
            </div>
            <div className="ρd__all ρft5Vv" id="apply">
              <div className="px-6 py-8 md:px-10 md:py-10">
                <p className="mb-6 text-sm leading-relaxed text-charcoal/60">
                  Sign in to your EVLV account first — ambassador status is a role on your existing account, not a
                  separate login.
                </p>
                <AffiliateForm />
              </div>
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: content.htmlAfter }} />
      </div>
    </>
  );
}
