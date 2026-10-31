import { NextResponse } from "next/server";
import { Resend } from "resend";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";

export const runtime = "nodejs";

function buildEmailHtml(app: Record<string, unknown>): string {
  const s1 = (app._s1 ?? {}) as Record<string, unknown>;
  const s2 = (app._s2 ?? {}) as Record<string, unknown>;
  const s3 = (app._s3 ?? {}) as Record<string, unknown>;
  const s4 = (app._s4 ?? {}) as Record<string, unknown>;
  const s5 = (app._s5 ?? {}) as Record<string, unknown>;
  const s6 = (app._s6 ?? {}) as Record<string, unknown>;

  const row = (label: string, value: unknown) =>
    `<tr><td style="padding:6px 12px;color:#6b7370;font-size:12px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px;font-size:13px;font-weight:600;vertical-align:top">${String(value ?? "—")}</td></tr>`;

  const section = (title: string, rows: string) =>
    `<div style="margin-bottom:24px"><h3 style="margin:0 0 8px;padding:8px 12px;background:#f0f5f3;border-left:4px solid #0b6b5e;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#0b6b5e">${title}</h3><table style="width:100%;border-collapse:collapse">${rows}</table></div>`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Inter,system-ui,sans-serif;background:#f4f6f5;margin:0;padding:24px">
<div style="max-width:680px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #dce5df">
  <div style="background:#07383a;padding:24px 28px;color:#fff">
    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#b9d9ce">EVLV Wholesale</p>
    <h1 style="margin:6px 0 0;font-size:22px;font-weight:700">New Partner Application</h1>
    <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,.6)">Submitted ${app._signedDate ?? new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
  </div>
  <div style="padding:24px 28px">
    ${section("Section 1 — Business & Contact", [
      row("Company", s1.companyName),
      row("Legal Name", s1.legalName),
      row("Contact", s1.contactName),
      row("Title", s1.contactTitle),
      row("Email", s1.email),
      row("Phone", s1.phone),
      row("Website", s1.website),
      row("Address", [s1.address, s1.city, s1.state, s1.zip, s1.country].filter(Boolean).join(", ")),
      row("Business Type", s1.businessType),
      row("Years in Operation", s1.yearsOp),
      row("Tax / VAT ID", s1.taxId),
    ].join(""))}
    ${section("Section 2 — RUO Compliance Acknowledgements", [
      row("Confirmed RUO only — no human/animal use", s2.c1 ? "✓ Yes" : "✗ No"),
      row("Confirmed lawful use responsibility", s2.c2 ? "✓ Yes" : "✗ No"),
      row("Confirmed no pharmaceutical claims", s2.c3 ? "✓ Yes" : "✗ No"),
      row("Confirmed customer vetting obligation", s2.c4 ? "✓ Yes" : "✗ No"),
      row("Confirmed legal compliance in jurisdiction", s2.c5 ? "✓ Yes" : "✗ No"),
      row("Confirmed 21 CFR 809.10(c) labeling requirement", s2.c6 ? "✓ Yes" : "✗ No"),
    ].join(""))}
    ${section("Section 3 — Distribution & Experience", [
      row("Distribution Channels", s3.channels),
      row("Customer Base", s3.customerBase),
      row("Years Experience (Peptides)", s3.experienceYears),
      row("Current Suppliers", s3.currentSuppliers),
      row("COA Process", s3.coaProcess),
      row("Regulatory Notes", s3.regulatoryNotes),
    ].join(""))}
    ${section("Section 4 — Order Volume & Products", [
      row("Monthly Volume (USD)", s4.monthlyVolume),
      row("Interested Products", Array.isArray(s4.products) ? (s4.products as string[]).join(", ") : String(s4.products ?? "—")),
      row("Custom SKUs Needed", s4.customSkus),
      row("White Label Interest", s4.whiteLabel ? "Yes" : "No"),
      row("Private Label Interest", s4.privateLabel ? "Yes" : "No"),
      row("Dropshipping Request", s4.dropshipping ? "Yes (Note: EVLV does not offer dropshipping)" : "No"),
      row("Notes", s4.notes),
    ].join(""))}
    ${section("Section 5 — Consulting & Storefront", [
      row("Wants Consulting", s5.wantsConsulting ? "Yes" : "No"),
      row("Wants White Label Store", s5.wantsStore ? "Yes" : "No"),
      row("Existing Website / Store", s5.existingStore),
      row("Marketing Channels", s5.marketingChannels),
      row("Target Market", s5.targetMarket),
      row("Additional Notes", s5.additionalNotes),
    ].join(""))}
    ${section("Section 6 — Logistics, Payment & Agreement", [
      row("Shipping Address", [s6.shipAddress, s6.shipCity, s6.shipState, s6.shipZip, s6.shipCountry].filter(Boolean).join(", ")),
      row("Address Type", s6.addrType),
      row("Ship Region", s6.shipRegion),
      row("Cold Chain Required", s6.coldChain ? "Yes" : "No"),
      row("Storage Capability", s6.storage),
      row("Payment Method", s6.payMethod),
      row("Agreed to Payment Terms", s6.payTerms ? "✓ Yes" : "✗ No"),
      row("Agreed to Audit Rights", s6.auditRights ? "✓ Yes" : "✗ No"),
      row("Agreed Fact of Sale", s6.agreeFact ? "✓ Yes" : "✗ No"),
      row("Agreed No Liability", s6.agreeNoLiability ? "✓ Yes" : "✗ No"),
      row("Agreed to Terms of Service", s6.agreeTos ? "✓ Yes" : "✗ No"),
    ].join(""))}
    <div style="margin-top:24px;padding:16px;background:#f0f5f3;border-radius:8px;border:1px solid #c5dbd4">
      <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#0b6b5e">Digital Signature</p>
      <p style="margin:8px 0 0;font-size:20px;font-family:Georgia,serif;font-style:italic;color:#1a2e2b">${app._signedBy ?? "—"}</p>
      <p style="margin:4px 0 0;font-size:11px;color:#6b7370">Signed on: ${app._signedDate ?? "—"}</p>
    </div>
  </div>
  <div style="padding:14px 28px;border-top:1px solid #dce5df;font-size:10px;color:#8a9e99">
    Application submitted via evlvpeptides.com/wholesale/apply
  </div>
</div>
</body>
</html>`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const app = (body._fullApplication ?? body) as Record<string, unknown>;
  const s1 = (app._s1 ?? {}) as Record<string, unknown>;
  const contactEmail = String(s1.email ?? body.email ?? "");
  const companyName = String(s1.companyName ?? body.companyName ?? "Wholesale applicant");

  const resendKey = process.env.RESEND_API_KEY;
  let emailSent = false;
  let emailError: string | undefined;

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: "EVLV Wholesale <noreply@evlvpeptides.com>",
        to: ["office@evlvpeptides.com"],
        replyTo: contactEmail || undefined,
        subject: `Wholesale Application — ${companyName}`,
        html: buildEmailHtml(app),
      });
      if (error) {
        emailError = error.message;
      } else {
        emailSent = true;
      }
    } catch (err) {
      emailError = err instanceof Error ? err.message : String(err);
    }
  } else {
    emailError = "RESEND_API_KEY not configured";
  }

  // Forward to CRM when configured (non-blocking on email failure)
  if (crmConfigured()) {
    const crmBody = {
      companyName,
      contactName: String((app._s1 as Record<string, unknown> | undefined)?.contactName ?? body.contactName ?? ""),
      email: contactEmail,
      phone: String((app._s1 as Record<string, unknown> | undefined)?.phone ?? body.phone ?? ""),
      message: `Wholesale application submitted. Email sent: ${emailSent}`,
    };
    await crmFetch("/api/store/wholesale/inquiry", crmBody).catch(() => null);
  }

  if (!emailSent) {
    console.error("[wholesale/inquiry] email delivery failed:", emailError);
    // Still return 200 so the form submitter sees success — the application data is logged
    console.log("[wholesale/inquiry] application payload:", JSON.stringify(body, null, 2));
  }

  return NextResponse.json({ ok: true, emailSent, ...(emailError ? { emailError } : {}) });
}
