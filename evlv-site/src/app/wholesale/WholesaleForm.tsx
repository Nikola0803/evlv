"use client";

import { FormEvent, useState, useEffect } from "react";
import { trackEvent } from "@/lib/pixel";

// ─── Types ────────────────────────────────────────────────────────────────────

interface S1 {
  legalName: string; dba: string; website: string; structure: string;
  stateOfInc: string; yearsInOp: string; ein: string;
  contactName: string; contactTitle: string; contactEmail: string;
  contactPhone: string; contactMethod: string;
  authRepName: string; authRepTitle: string; authConfirm: boolean;
}
interface S2 { c1: boolean; c2: boolean; c3: boolean; c4: boolean; c5: boolean; c6: boolean }
interface S3 {
  distModel: string; distModelOther: string; marketingCheck: string;
  whiteLabel: string; ruoLabels: string;
  prevExp: string; expLength: string; prevSuppliers: string; prevSpend: string;
  fdaHistory: string; fdaDetails: string;
}
interface S4 {
  spendTier: string; orderSize: string; orderFreq: string; moqConfirm: boolean;
  products: string; vialSizes: string; whiteLabelInterest: string; customPackaging: string;
}
interface S5 {
  consulting: string; consultAreas: string[]; consultGoals: string; consultTimeline: string;
  storefrontInterest: string; storefrontNotes: string;
}
interface S6 {
  shipAddr: string; addrType: string; shipRegion: string;
  coldChain: string; storage: string;
  payMethod: string; payTerms: boolean; auditRights: boolean;
  agreeFact: boolean; agreeNoLiability: boolean; agreeTos: boolean;
  sigName: string;
}

interface FormData { s1: S1; s2: S2; s3: S3; s4: S4; s5: S5; s6: S6 }

const EMPTY: FormData = {
  s1: {
    legalName: "", dba: "", website: "", structure: "", stateOfInc: "", yearsInOp: "", ein: "",
    contactName: "", contactTitle: "", contactEmail: "", contactPhone: "", contactMethod: "Email",
    authRepName: "", authRepTitle: "", authConfirm: false,
  },
  s2: { c1: false, c2: false, c3: false, c4: false, c5: false, c6: false },
  s3: {
    distModel: "", distModelOther: "", marketingCheck: "", whiteLabel: "", ruoLabels: "",
    prevExp: "", expLength: "", prevSuppliers: "", prevSpend: "", fdaHistory: "", fdaDetails: "",
  },
  s4: {
    spendTier: "", orderSize: "", orderFreq: "", moqConfirm: false,
    products: "", vialSizes: "", whiteLabelInterest: "", customPackaging: "",
  },
  s5: {
    consulting: "", consultAreas: [], consultGoals: "", consultTimeline: "",
    storefrontInterest: "", storefrontNotes: "",
  },
  s6: {
    shipAddr: "", addrType: "", shipRegion: "",
    coldChain: "None — standard shipping", storage: "",
    payMethod: "", payTerms: false, auditRights: false,
    agreeFact: false, agreeNoLiability: false, agreeTos: false,
    sigName: "",
  },
};

const TOTAL_STEPS = 6;

const STEP_LABELS = [
  "Business & Contact",
  "RUO Compliance",
  "Distribution & Experience",
  "Order Volume & Products",
  "Consulting & Infrastructure",
  "Logistics, Payment & Terms",
];

// ─── Shared field components ───────────────────────────────────────────────────

const Input = ({ label, req, hint, ...props }: { label: string; req?: boolean; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{label}{req && <span className="ml-1 text-copper">*</span>}</label>
    <input {...props} className="rounded border border-white/15 bg-white/8 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-copper/70 disabled:opacity-40" />
    {hint && <p className="text-[11px] leading-relaxed text-white/35">{hint}</p>}
  </div>
);

const Select = ({ label, req, hint, children, ...props }: { label: string; req?: boolean; hint?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{label}{req && <span className="ml-1 text-copper">*</span>}</label>
    <select {...props} className="rounded border border-white/15 bg-[#102e30] px-3.5 py-2.5 text-sm text-white outline-none focus:border-copper/70 [&>option]:bg-[#102e30]">
      {children}
    </select>
    {hint && <p className="text-[11px] leading-relaxed text-white/35">{hint}</p>}
  </div>
);

const Textarea = ({ label, req, ...props }: { label: string; req?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{label}{req && <span className="ml-1 text-copper">*</span>}</label>
    <textarea {...props} className="min-h-[80px] resize-none rounded border border-white/15 bg-white/8 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-copper/70" />
  </div>
);

const Check = ({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) => (
  <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${checked ? "border-copper/50 bg-copper/8" : "border-white/12 bg-white/5 hover:bg-white/8"}`}>
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-xs ${checked ? "border-copper bg-copper text-[#07383a]" : "border-white/30"}`}>
      {checked && <i className="ri-check-line" />}
    </span>
    <span className="text-sm leading-relaxed text-white/80">{children}</span>
  </label>
);

const Notice = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg border border-copper/30 bg-copper/8 p-4 text-sm leading-relaxed text-white/75">{children}</div>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-copper/80 first:mt-0">{children}</p>
);

// ─── Main component ────────────────────────────────────────────────────────────

export function WholesaleForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const d = new Date();
    setToday(d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
  }, []);

  function set1<K extends keyof S1>(k: K, v: S1[K]) { setForm(f => ({ ...f, s1: { ...f.s1, [k]: v } })); }
  function set2<K extends keyof S2>(k: K, v: S2[K]) { setForm(f => ({ ...f, s2: { ...f.s2, [k]: v } })); }
  function set3<K extends keyof S3>(k: K, v: S3[K]) { setForm(f => ({ ...f, s3: { ...f.s3, [k]: v } })); }
  function set4<K extends keyof S4>(k: K, v: S4[K]) { setForm(f => ({ ...f, s4: { ...f.s4, [k]: v } })); }
  function set5<K extends keyof S5>(k: K, v: S5[K]) { setForm(f => ({ ...f, s5: { ...f.s5, [k]: v } })); }
  function set6<K extends keyof S6>(k: K, v: S6[K]) { setForm(f => ({ ...f, s6: { ...f.s6, [k]: v } })); }

  function toggleConsultArea(area: string) {
    setForm(f => ({
      ...f,
      s5: {
        ...f.s5,
        consultAreas: f.s5.consultAreas.includes(area)
          ? f.s5.consultAreas.filter(a => a !== area)
          : [...f.s5.consultAreas, area],
      },
    }));
  }

  function validate(): string[] {
    const errs: string[] = [];
    const { s1, s2, s3, s4, s6 } = form;
    if (step === 1) {
      if (!s1.legalName) errs.push("Legal business name is required.");
      if (!s1.website) errs.push("Business website is required.");
      if (!s1.structure) errs.push("Business structure is required.");
      if (!s1.stateOfInc) errs.push("State of incorporation is required.");
      if (!s1.yearsInOp) errs.push("Years in operation is required.");
      if (!s1.contactName) errs.push("Contact name is required.");
      if (!s1.contactTitle) errs.push("Contact title is required.");
      if (!s1.contactEmail) errs.push("Business email is required.");
      if (!s1.contactPhone) errs.push("Phone number is required.");
      if (!s1.authRepName) errs.push("Authorized representative name is required.");
      if (!s1.authRepTitle) errs.push("Authorized representative title is required.");
      if (!s1.authConfirm) errs.push("You must confirm authorization to submit this application.");
    }
    if (step === 2) {
      if (!Object.values(s2).every(Boolean)) errs.push("All six compliance confirmations are required before proceeding.");
    }
    if (step === 3) {
      if (!s3.distModel) errs.push("Distribution model is required.");
      if (!s3.marketingCheck) errs.push("Marketing compliance question is required.");
      if (!s3.whiteLabel) errs.push("White label question is required.");
      if (!s3.ruoLabels) errs.push("RUO labeling question is required.");
      if (!s3.prevExp) errs.push("Wholesale purchasing experience is required.");
      if (!s3.fdaHistory) errs.push("FDA enforcement history question is required.");
    }
    if (step === 4) {
      if (!s4.spendTier) errs.push("Estimated monthly spend tier is required.");
      if (!s4.orderSize) errs.push("Typical order size is required.");
      if (!s4.orderFreq) errs.push("Order frequency is required.");
      if (!s4.moqConfirm) errs.push("You must acknowledge the minimum order commitment.");
      if (!s4.products) errs.push("Products of interest are required.");
      if (!s4.vialSizes) errs.push("Preferred vial sizes are required.");
      if (!s4.whiteLabelInterest) errs.push("White label interest is required.");
    }
    if (step === 6) {
      if (!s6.shipAddr) errs.push("Primary shipping address is required.");
      if (!s6.addrType) errs.push("Address type (commercial or residential) is required.");
      if (!s6.shipRegion) errs.push("Domestic or international shipping is required.");
      if (!s6.storage) errs.push("On-site storage facilities is required.");
      if (!s6.payMethod) errs.push("Preferred payment method is required.");
      if (!s6.payTerms) errs.push("You must acknowledge EVLV's payment terms.");
      if (!s6.auditRights) errs.push("You must acknowledge EVLV's right to audit or suspend this account.");
      if (!s6.agreeFact) errs.push("You must confirm that all information provided is accurate.");
      if (!s6.agreeNoLiability) errs.push("You must acknowledge EVLV's liability disclaimer.");
      if (!s6.agreeTos) errs.push("You must agree to EVLV's Terms of Service and Research Use Policy.");
      if (!s6.sigName.trim()) errs.push("Digital signature (full legal name) is required.");
    }
    return errs;
  }

  function next() {
    const errs = validate();
    if (errs.length) { setErrors(errs); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setErrors([]);
    setStep(s => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prev() { setErrors([]); setStep(s => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setSubmitError("");
    setSubmitting(true);
    try {
      const payload = {
        programType: form.s4.whiteLabelInterest,
        companyName: form.s1.legalName,
        contactName: form.s1.contactName,
        email: form.s1.contactEmail,
        phone: form.s1.contactPhone,
        website: form.s1.website,
        monthlyVolume: form.s4.spendTier,
        message: [
          `Distribution model: ${form.s3.distModel}`,
          `Products of interest: ${form.s4.products}`,
          `Consulting interest: ${form.s5.consulting}`,
          form.s5.consultGoals ? `Consulting goals: ${form.s5.consultGoals}` : "",
          `Payment method: ${form.s6.payMethod}`,
          `Shipping region: ${form.s6.shipRegion}`,
          `Digital signature: ${form.s6.sigName}`,
        ].filter(Boolean).join("\n"),
        _fullApplication: form,
        _signedBy: form.s6.sigName,
        _signedDate: today,
      };
      const res = await fetch("/api/wholesale/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(res.status === 503 ? "Wholesale inquiries aren't connected yet — email us via Contact in the meantime." : data?.error || "Something went wrong submitting your application.");
      setSubmitted(true);
      trackEvent("evlv_lead", { lead_type: "wholesale_application", properties: { spendTier: form.s4.spendTier, distModel: form.s3.distModel } });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-copper/20">
          <i className="ri-checkbox-circle-fill text-2xl text-copper" />
        </div>
        <p className="mt-4 font-display text-xl font-semibold text-white">Application received</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
          Our compliance team reviews every wholesale application by hand. We will follow up by email within 2–3 business days to confirm receipt and next steps.
        </p>
        <p className="mt-5 text-xs text-white/35">All applications are subject to review and approval. EVLV reserves the right to deny any application at its sole discretion.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Progress */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>Section {step} of {TOTAL_STEPS}</span>
          <span>{STEP_LABELS[step - 1]}</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-copper transition-all duration-300" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-red-400">Please fix the following:</p>
          <ul className="space-y-1">
            {errors.map(e => <li key={e} className="text-sm text-red-300/80">{e}</li>)}
          </ul>
        </div>
      )}

      {/* ── Section 1: Business & Contact ── */}
      {step === 1 && (
        <div className="space-y-4">
          <Notice>
            <strong className="text-white">Important — please read before proceeding.</strong>
            {" "}All products supplied by EVLV are designated Research Use Only (RUO) and are strictly intended for in-vitro laboratory research and non-clinical scientific investigation. These products are <strong className="text-white">not approved by the FDA</strong> for human or veterinary use. By completing this application, you represent that you are a qualified researcher, institution, distributor, or research supply business operating in full compliance with all applicable federal, state, and local laws. <strong className="text-white">EVLV reserves the right to deny any application at its sole discretion.</strong>
          </Notice>

          <Sub>Business Details</Sub>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input label="Legal Business Name" req value={form.s1.legalName} onChange={e => set1("legalName", e.target.value)} placeholder="Acme Research LLC" />
            <Input label="DBA / Trade Name" value={form.s1.dba} onChange={e => set1("dba", e.target.value)} placeholder="If different from legal name" />
            <Input label="Business Website" req type="url" value={form.s1.website} onChange={e => set1("website", e.target.value)} placeholder="https://" />
            <Select label="Business Structure" req value={form.s1.structure} onChange={e => set1("structure", e.target.value)}>
              <option value="">Select...</option>
              {["LLC", "Corporation (C-Corp)", "Corporation (S-Corp)", "Sole Proprietorship", "Partnership", "Non-profit", "Other"].map(o => <option key={o}>{o}</option>)}
            </Select>
            <Select label="State of Incorporation" req value={form.s1.stateOfInc} onChange={e => set1("stateOfInc", e.target.value)}>
              <option value="">Select state...</option>
              {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map(s => <option key={s}>{s}</option>)}
            </Select>
            <Select label="Years in Operation" req value={form.s1.yearsInOp} onChange={e => set1("yearsInOp", e.target.value)}>
              <option value="">Select...</option>
              {["Less than 1 year", "1–2 years", "3–5 years", "5–10 years", "10+ years"].map(o => <option key={o}>{o}</option>)}
            </Select>
          </div>
          <Input label="EIN / Tax ID Number" value={form.s1.ein} onChange={e => set1("ein", e.target.value)} placeholder="XX-XXXXXXX" />
          <p className="text-xs text-white/35">Optional — not shared or used for any other purpose.</p>

          <Sub>Primary Contact</Sub>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input label="Full Legal Name" req value={form.s1.contactName} onChange={e => set1("contactName", e.target.value)} placeholder="First Last" />
            <Input label="Title / Role" req value={form.s1.contactTitle} onChange={e => set1("contactTitle", e.target.value)} placeholder="Owner, Director, Procurement..." />
            <Input label="Business Email" req type="email" value={form.s1.contactEmail} onChange={e => set1("contactEmail", e.target.value)} placeholder="you@company.com" />
            <Input label="Phone Number" req type="tel" value={form.s1.contactPhone} onChange={e => set1("contactPhone", e.target.value)} placeholder="+1 (___) ___-____" />
          </div>
          <Select label="Preferred Contact Method" value={form.s1.contactMethod} onChange={e => set1("contactMethod", e.target.value)}>
            {["Email", "Phone", "Either"].map(o => <option key={o}>{o}</option>)}
          </Select>

          <Sub>Authorized Representative</Sub>
          <Notice>The individual completing this application must be authorized to enter into agreements on behalf of the business listed above.</Notice>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input label="Authorized Rep Full Name" req value={form.s1.authRepName} onChange={e => set1("authRepName", e.target.value)} placeholder="First Last" />
            <Input label="Authorized Rep Title" req value={form.s1.authRepTitle} onChange={e => set1("authRepTitle", e.target.value)} placeholder="Owner, Officer, Director..." />
          </div>
          <Check checked={form.s1.authConfirm} onChange={() => set1("authConfirm", !form.s1.authConfirm)}>
            I confirm that I am duly authorized to submit this application and enter into agreements on behalf of the business named above.
          </Check>
        </div>
      )}

      {/* ── Section 2: RUO Compliance ── */}
      {step === 2 && (
        <div className="space-y-4">
          <Notice>
            <strong className="text-white">All six confirmations below are required.</strong> EVLV operates strictly within the Research Use Only (RUO) framework as defined under FDA guidance. The FDA considers the totality of circumstances — not just labeling — when determining intended use. Incomplete or false responses will result in immediate disqualification.
          </Notice>
          <Sub>Research Use Compliance Acknowledgment</Sub>
          {([
            { k: "c1" as const, text: <>I confirm that all products purchased from EVLV will be used exclusively for <strong className="text-white">in-vitro laboratory research and non-clinical scientific investigation</strong>. These products will not be administered to humans or animals under any circumstances.</> },
            { k: "c2" as const, text: <>I confirm that I will <strong className="text-white">NOT</strong> market, advertise, label, or sell any EVLV products with language that implies, suggests, or infers human use, therapeutic benefit, clinical application, or health outcomes of any kind. I understand that an RUO disclaimer does not neutralize therapeutic claims made elsewhere in my marketing or communications.</> },
            { k: "c3" as const, text: <>I understand that EVLV products are <strong className="text-white">NOT FDA-approved drugs</strong> and are NOT intended to diagnose, treat, cure, or prevent any disease or medical condition in humans or animals.</> },
            { k: "c4" as const, text: <>I will <strong className="text-white">NOT</strong> use EVLV products in any compounding pharmacy preparation, or supply them to any compounding facility for inclusion in products intended for human or veterinary administration.</> },
            { k: "c5" as const, text: <>I accept sole and full legal responsibility for ensuring all downstream handling, storage, distribution, and use of these products complies with all applicable federal laws including <strong className="text-white">21 CFR § 801 and § 807</strong>, as well as all applicable state and local regulations.</> },
            { k: "c6" as const, text: <>I understand that the Research Use Only designation is <strong className="text-white">not a legal shield</strong> for human use, and that EVLV disclaims all liability for any misuse, unauthorized use, or off-label application of its products.</> },
          ] as const).map(({ k, text }) => (
            <Check key={k} checked={form.s2[k]} onChange={() => set2(k, !form.s2[k])}>{text}</Check>
          ))}
        </div>
      )}

      {/* ── Section 3: Distribution & Experience ── */}
      {step === 3 && (
        <div className="space-y-4">
          <Sub>Distribution Model</Sub>
          <Notice>EVLV verifies that all accounts distribute products consistent with RUO compliance. Accounts whose public-facing content implies human use will not be approved.</Notice>
          <Select label="How does your business primarily distribute research products?" req value={form.s3.distModel} onChange={e => set3("distModel", e.target.value)}>
            <option value="">Select...</option>
            {["Direct-to-consumer via website — research use only", "Wholesale redistribution to other research businesses", "Laboratory / institutional supply", "Internal research use only — not for resale", "Contract research organization (CRO) use", "Other — describe below"].map(o => <option key={o}>{o}</option>)}
          </Select>
          {form.s3.distModel.startsWith("Other") && <Textarea label="Describe your distribution model" value={form.s3.distModelOther} onChange={e => set3("distModelOther", e.target.value)} placeholder="Describe your model..." />}
          <Select label="Does your website or any marketing material contain language suggesting human use, dosing instructions, therapeutic claims, or health benefits?" req value={form.s3.marketingCheck} onChange={e => set3("marketingCheck", e.target.value)}>
            <option value="">Select...</option>
            {["No — all content is strictly RUO compliant", "Yes — we are updating our compliance language", "Yes — and we believe our content is compliant", "Not applicable — no consumer-facing website"].map(o => <option key={o}>{o}</option>)}
          </Select>
          <Select label="Do you resell or plan to resell under your own brand or white label?" req value={form.s3.whiteLabel} onChange={e => set3("whiteLabel", e.target.value)}>
            <option value="">Select...</option>
            {["No", "Yes — under our own brand with RUO-compliant labeling", "Yes — white label through EVLV's program", "Yes — other arrangement"].map(o => <option key={o}>{o}</option>)}
          </Select>
          <Select label="If reselling, do your labels include the RUO — Not for Human Consumption disclaimer on all containers?" req value={form.s3.ruoLabels} onChange={e => set3("ruoLabels", e.target.value)}>
            <option value="">Select...</option>
            {["Yes — on all primary and secondary containers", "No — not currently", "Not applicable"].map(o => <option key={o}>{o}</option>)}
          </Select>

          <Sub>Purchasing Experience</Sub>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select label="Have you purchased peptides wholesale before?" req value={form.s3.prevExp} onChange={e => set3("prevExp", e.target.value)}>
              <option value="">Select...</option>
              {["Yes — established buyer", "No — new to wholesale purchasing"].map(o => <option key={o}>{o}</option>)}
            </Select>
            <Select label="If yes, how long?" value={form.s3.expLength} onChange={e => set3("expLength", e.target.value)}>
              <option value="">Select...</option>
              {["Less than 1 year", "1–2 years", "3–5 years", "5+ years", "Not applicable"].map(o => <option key={o}>{o}</option>)}
            </Select>
            <Input label="Current / Previous Suppliers" value={form.s3.prevSuppliers} onChange={e => set3("prevSuppliers", e.target.value)} placeholder="Optional" />
            <Input label="Monthly Spend with Current Suppliers" value={form.s3.prevSpend} onChange={e => set3("prevSpend", e.target.value)} placeholder="Optional — approximate USD" />
          </div>
          <Select label="Have you ever received an FDA warning letter or been subject to enforcement action related to research compound sales?" req value={form.s3.fdaHistory} onChange={e => set3("fdaHistory", e.target.value)}>
            <option value="">Select...</option>
            {["No", "Yes — please describe below"].map(o => <option key={o}>{o}</option>)}
          </Select>
          {form.s3.fdaHistory === "Yes — please describe below" && <Textarea label="Please describe" value={form.s3.fdaDetails} onChange={e => set3("fdaDetails", e.target.value)} placeholder="Provide details of any regulatory actions..." />}
        </div>
      )}

      {/* ── Section 4: Order Volume & Products ── */}
      {step === 4 && (
        <div className="space-y-5">
          <Sub>Estimated Monthly Spend</Sub>
          <div className="grid grid-cols-3 gap-2">
            {(["$2,000 – $5,000|Tier 1 — Standard", "$5,000 – $10,000|Tier 2 — Volume", "$10,000+|Tier 3 — Enterprise"] as const).map(opt => {
              const [val, label] = opt.split("|");
              const sel = form.s4.spendTier === val;
              return (
                <button key={val} type="button" onClick={() => set4("spendTier", val)} className={`rounded-lg border p-3 text-center transition-colors ${sel ? "border-copper bg-copper/12 text-white" : "border-white/15 bg-white/5 text-white/60 hover:bg-white/8"}`}>
                  <p className="text-sm font-semibold">{val}</p>
                  <p className="mt-0.5 text-[10px] text-white/50">{label}</p>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input label="Typical Single Order Size (USD)" req value={form.s4.orderSize} onChange={e => set4("orderSize", e.target.value)} placeholder="e.g. $3,500" />
            <Select label="Order Frequency" req value={form.s4.orderFreq} onChange={e => set4("orderFreq", e.target.value)}>
              <option value="">Select...</option>
              {["Weekly", "Bi-weekly", "Monthly", "As needed / project-based"].map(o => <option key={o}>{o}</option>)}
            </Select>
          </div>
          <Check checked={form.s4.moqConfirm} onChange={() => set4("moqConfirm", !form.s4.moqConfirm)}>
            I understand and agree that EVLV&apos;s minimum order commitment applies per order and I commit to maintaining this minimum throughout the partnership.
          </Check>

          <Sub>Product Interest</Sub>
          <Textarea req label="Products / Compounds of Interest" value={form.s4.products} onChange={e => set4("products", e.target.value)} placeholder="List specific peptides or compound categories you intend to purchase. Do not include intended use, dosing information, or clinical application language." />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select label="Preferred Vial Sizes" req value={form.s4.vialSizes} onChange={e => set4("vialSizes", e.target.value)}>
              <option value="">Select...</option>
              {["2mg", "5mg", "10mg", "15mg", "Mixed / Varies by compound"].map(o => <option key={o}>{o}</option>)}
            </Select>
            <Select label="White Label Interest" req value={form.s4.whiteLabelInterest} onChange={e => set4("whiteLabelInterest", e.target.value)}>
              <option value="">Select...</option>
              {["Yes — interested in EVLV's white label program", "No — purchasing for direct research use", "Maybe — would like more information"].map(o => <option key={o}>{o}</option>)}
            </Select>
          </div>
          <Textarea label="Custom Formulation or Packaging Requirements" value={form.s4.customPackaging} onChange={e => set4("customPackaging", e.target.value)} placeholder="Specific formulations, packaging, minimum vial quantities, etc." />
        </div>
      )}

      {/* ── Section 5: Consulting & Infrastructure ── */}
      {step === 5 && (
        <div className="space-y-5">
          <Sub>Consulting Interest</Sub>
          <Notice>
            EVLV offers consulting and infrastructure services to wholesale partners looking to build, scale, or launch their research supply operations. <strong className="text-white">All engagements are subject to the same RUO compliance standards.</strong> No service will include guidance on human use, clinical application, dosing, or any use outside of the RUO framework.
          </Notice>
          <Select label="Are you interested in consulting services?" req value={form.s5.consulting} onChange={e => set5("consulting", e.target.value)}>
            <option value="">Select...</option>
            {["Yes — I am interested in consulting", "No — wholesale supply only", "Maybe — tell me more"].map(o => <option key={o}>{o}</option>)}
          </Select>

          {form.s5.consulting !== "No — wholesale supply only" && (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">Select areas of interest</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {([
                  { title: "Wholesale Strategy", desc: "Supplier selection, pricing structure, MOQ negotiation, and account setup for research supply operations." },
                  { title: "RUO Compliance Setup", desc: "Website audit, marketing language review, labeling requirements, and documentation protocols aligned with FDA RUO guidelines." },
                  { title: "White Label Launch", desc: "Brand development, RUO-compliant labeling design, packaging setup, and go-to-market planning for your own research supply brand." },
                  { title: "Peptide Brand Building", desc: "Full brand identity, website development, compliant copy strategy, and customer acquisition for a research-use peptide brand." },
                ]).map(({ title, desc }) => {
                  const selected = form.s5.consultAreas.includes(title);
                  return (
                    <button key={title} type="button" onClick={() => toggleConsultArea(title)} className={`rounded-lg border p-4 text-left transition-colors ${selected ? "border-copper/50 bg-copper/10" : "border-white/12 bg-white/5 hover:bg-white/8"}`}>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">{desc}</p>
                    </button>
                  );
                })}
              </div>
              <Textarea label="Describe your goals" value={form.s5.consultGoals} onChange={e => set5("consultGoals", e.target.value)} placeholder="Tell us what you're trying to build or solve. Do not include any references to human use, clinical application, or dosing." />
              <Select label="Preferred Timeline" value={form.s5.consultTimeline} onChange={e => set5("consultTimeline", e.target.value)}>
                <option value="">Select...</option>
                {["Immediately — ready to start", "Within 30 days", "Within 60–90 days", "Exploratory — no firm timeline"].map(o => <option key={o}>{o}</option>)}
              </Select>
            </>
          )}

          <Sub>Storefront & Commerce Infrastructure</Sub>
          <Select label="Are you interested in EVLV's optional storefront, CRM, or order management infrastructure?" value={form.s5.storefrontInterest} onChange={e => set5("storefrontInterest", e.target.value)}>
            <option value="">Select...</option>
            {["Yes — interested in storefront setup", "Yes — interested in CRM / order management", "Yes — both", "No — not at this time", "Maybe — would like more information"].map(o => <option key={o}>{o}</option>)}
          </Select>
          <Textarea label="Additional notes on infrastructure needs" value={form.s5.storefrontNotes} onChange={e => set5("storefrontNotes", e.target.value)} placeholder="Custom storefront requirements, CRM integrations, fulfillment preferences, etc." />
        </div>
      )}

      {/* ── Section 6: Logistics, Payment & Final Agreement ── */}
      {step === 6 && (
        <div className="space-y-5">
          <Sub>Shipping & Logistics</Sub>
          <Input label="Primary Shipping Address" req value={form.s6.shipAddr} onChange={e => set6("shipAddr", e.target.value)} placeholder="Street address, city, state, ZIP" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select label="Commercial or Residential?" req value={form.s6.addrType} onChange={e => set6("addrType", e.target.value)} hint="EVLV ships to US addresses only. Residential addresses may require additional verification.">
              <option value="">Select...</option>
              {["Yes — commercial address", "No — residential address"].map(o => <option key={o}>{o}</option>)}
            </Select>
            <Select label="Domestic or International?" req value={form.s6.shipRegion} onChange={e => set6("shipRegion", e.target.value)}>
              <option value="">Select...</option>
              {["Domestic USA only", "Both domestic and international", "International only"].map(o => <option key={o}>{o}</option>)}
            </Select>
            <Select label="Cold Chain / Special Handling" value={form.s6.coldChain} onChange={e => set6("coldChain", e.target.value)}>
              {["None — standard shipping", "Cold chain required", "Signature upon delivery required", "Discreet shipping required", "Other"].map(o => <option key={o}>{o}</option>)}
            </Select>
            <Select label="On-site Storage Facilities?" req value={form.s6.storage} onChange={e => set6("storage", e.target.value)}>
              <option value="">Select...</option>
              {["Yes — climate-controlled storage", "Yes — refrigeration and freezer available", "No — working on establishing proper storage", "Other"].map(o => <option key={o}>{o}</option>)}
            </Select>
          </div>

          <Sub>Payment & Account Terms</Sub>
          <Select label="Preferred Payment Method" req value={form.s6.payMethod} onChange={e => set6("payMethod", e.target.value)}>
            <option value="">Select...</option>
            {["Wire Transfer", "ACH / Bank Transfer", "Cryptocurrency", "Other / To be discussed"].map(o => <option key={o}>{o}</option>)}
          </Select>
          <div className="space-y-3">
            <Check checked={form.s6.payTerms} onChange={() => set6("payTerms", !form.s6.payTerms)}>
              I understand that EVLV wholesale accounts are <strong className="text-white">payment-due prior to or at the time of order</strong> unless otherwise agreed in writing.
            </Check>
            <Check checked={form.s6.auditRights} onChange={() => set6("auditRights", !form.s6.auditRights)}>
              I agree that EVLV reserves the right to <strong className="text-white">audit, suspend, or terminate</strong> this wholesale account at any time if compliance concerns are identified.
            </Check>
          </div>

          <Sub>Final Agreement & Acknowledgment</Sub>
          <Notice><strong className="text-white">Please read each statement carefully.</strong> This section constitutes your formal acknowledgment of all terms and conditions of the EVLV wholesale program.</Notice>
          <div className="space-y-3">
            <Check checked={form.s6.agreeFact} onChange={() => set6("agreeFact", !form.s6.agreeFact)}>
              I confirm that all information provided in this application is <strong className="text-white">accurate and complete</strong>. I understand that providing false or misleading information is grounds for immediate account termination and may result in legal action.
            </Check>
            <Check checked={form.s6.agreeNoLiability} onChange={() => set6("agreeNoLiability", !form.s6.agreeNoLiability)}>
              I agree that EVLV products are supplied strictly as research materials and that <strong className="text-white">EVLV bears no liability</strong> for any misuse, unauthorized redistribution, or use of products outside of their intended research-only purpose.
            </Check>
            <Check checked={form.s6.agreeTos} onChange={() => set6("agreeTos", !form.s6.agreeTos)}>
              I have read, understand, and agree to EVLV&apos;s <strong className="text-white">Terms of Service and Research Use Policy</strong>, and all applicable compliance requirements as a condition of this wholesale account.
            </Check>
          </div>

          <Sub>Digital Signature</Sub>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
              Full Legal Name <span className="text-copper">*</span>
            </label>
            <input
              type="text"
              value={form.s6.sigName}
              onChange={e => set6("sigName", e.target.value)}
              placeholder="Type your full legal name"
              className="w-full rounded border-b-2 border-b-white/25 border-x-transparent border-t-transparent bg-white/5 px-3.5 pb-3 pt-3 text-base text-white outline-none placeholder:text-white/25 focus:border-b-copper/70"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", letterSpacing: "0.02em" }}
            />
            <p className="text-[11px] text-white/35 pt-1">By typing your name above you confirm all acknowledgments in this application</p>
          </div>
          <div className="max-w-[220px]">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Date</label>
            <input type="text" value={today} readOnly className="mt-1.5 w-full rounded border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white/50" />
          </div>

          {submitError && (
            <p className="flex items-center gap-2 text-sm text-red-400"><i className="ri-error-warning-line shrink-0" />{submitError}</p>
          )}

          <button type="submit" disabled={submitting} className="w-full rounded-md bg-copper py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-charcoal transition hover:bg-copper-light disabled:cursor-wait disabled:opacity-60">
            {submitting ? "Submitting application..." : "Submit wholesale application →"}
          </button>
          <p className="text-center text-xs text-white/35">Submitted applications are reviewed within 2–3 business days.</p>
        </div>
      )}

      {/* Navigation */}
      <div className={`mt-6 flex items-center ${step > 1 ? "justify-between" : "justify-end"}`}>
        {step > 1 && (
          <button type="button" onClick={prev} className="flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white/70 transition hover:bg-white/8">
            <i className="ri-arrow-left-line" /> Back
          </button>
        )}
        {step < TOTAL_STEPS && (
          <button type="button" onClick={next} className="flex items-center gap-2 rounded-md bg-white/12 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/18">
            Continue <i className="ri-arrow-right-line" />
          </button>
        )}
      </div>
    </form>
  );
}
