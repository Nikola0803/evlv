"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { saveAuth } from "@/lib/auth";
import { setStoredCouponCode } from "@/lib/referral";

type Mode = "signin" | "register";
type AuthPayload = { token?: string; accessToken?: string; access_token?: string; email?: string; username?: string; name?: string; user_id?: string; id?: string; user?: AuthPayload; customer?: AuthPayload; data?: AuthPayload; error?: string; message?: string; couponCode?: string };

function getSession(data: AuthPayload, fallbackEmail: string) {
  const root = data.data ?? data;
  const user = root.user ?? root.customer ?? root;
  const token = root.token ?? root.accessToken ?? root.access_token;
  const email = user.email ?? root.email ?? fallbackEmail;
  const username = user.username ?? user.name ?? root.username ?? root.name ?? email.split("@")[0];
  const userId = user.user_id ?? user.id ?? root.user_id ?? root.id;
  return token && userId ? { token, email, username, user_id: userId } : null;
}

function PortalBenefit({ icon, title, copy }: { icon: string; title: string; copy: string }) {
  return <article className="rounded-2xl border border-[#dbe7e1] bg-white/80 p-4 shadow-[0_12px_32px_rgba(11,47,44,.05)] backdrop-blur-sm"><span className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-[#e6f1ec] text-lg text-[#0b4b45]"><i className={icon} /></span><h3 className="text-sm font-bold text-[#103a35]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#61746e]">{copy}</p></article>;
}

export function AccountAccess({ initialMode = "signin", redirectTo = "/account", partnerMode = false, offer, welcomePercent = 10 }: { initialMode?: Mode; redirectTo?: string; partnerMode?: boolean; offer?: "join25"; welcomePercent?: number }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [company, setCompany] = useState("");
  const [businessType, setBusinessType] = useState("RESEARCHER");
  const [phone, setPhone] = useState("");
  const [ruoAttested, setRuoAttested] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const isJoinOffer = offer === "join25";
  const isRegistration = mode === "register";
  const portalLabel = partnerMode ? "EVLV partner portal" : isJoinOffer ? "EVLV member access" : "EVLV researcher account";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("google") !== "1") return;
    let active = true;
    async function completeGoogleSignIn() {
      setGoogleLoading(true);
      try {
        const response = await fetch("/api/auth/google/session", { method: "POST", cache: "no-store" });
        const data = (await response.json().catch(() => ({}))) as AuthPayload;
        const session = getSession(data, "");
        if (!response.ok || !session) throw new Error(data.error ?? "Google sign-in could not be completed. Please try again.");
        saveAuth(session);
        const destination = params.get("returnTo");
        window.location.replace(destination?.startsWith("/") && !destination.startsWith("//") ? destination : redirectTo);
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "Google sign-in could not be completed. Please try again.");
      } finally {
        if (active) setGoogleLoading(false);
      }
    }
    completeGoogleSignIn();
    return () => { active = false; };
  }, [redirectTo]);

  function switchMode(next: Mode) { setMode(next); setError(""); }
  function startGoogleSignIn() {
    const destination = redirectTo.startsWith("/") && !redirectTo.startsWith("//") ? redirectTo : "/account";
    window.location.assign(`/api/auth/google/start?returnTo=${encodeURIComponent(destination)}`);
  }
  async function request(path: string, body: Record<string, unknown>) {
    const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = (await response.json().catch(() => ({}))) as AuthPayload;
    if (!response.ok) throw new Error(data.error ?? data.message ?? "We could not complete that request. Please try again.");
    return data;
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (password.length < 8) { setError("Use at least 8 characters for your password."); return; }
    if (mode === "register" && password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (mode === "register" && !ruoAttested) { setError("Confirm the research-use acknowledgement to create an account."); return; }
    setSubmitting(true);
    try {
      let data = await request(mode === "signin" ? "/api/auth/login" : "/api/auth/register", mode === "signin" ? { email, password } : { email, password, name: fullName, dateOfBirth, company, businessType, phone, ruoAttested, marketingOptIn, ...(isJoinOffer ? { offer: "JOIN25" } : {}) });
      const registrationCouponCode = mode === "register" && typeof data.couponCode === "string" ? data.couponCode : undefined;
      let session = getSession(data, email);
      if (mode === "register" && !session) { data = await request("/api/auth/login", { email, password }); session = getSession(data, email); }
      if (!session) throw new Error("Your account response did not include a valid session. Please contact support.");
      saveAuth(session);
      if (registrationCouponCode) setStoredCouponCode(registrationCouponCode);
      const destination = mode === "register" && !partnerMode
        ? isJoinOffer ? "/shop?join=25" : redirectTo === "/account" ? "/shop?welcome=10" : redirectTo
        : redirectTo;
      window.location.href = destination;
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again."); }
    finally { setSubmitting(false); }
  }

  return <main className="cp-access-shell min-h-[calc(100vh-100px)] bg-[#f7fbf9] px-4 pb-7 pt-2 sm:pb-10 sm:pt-4 lg:pb-12 lg:pt-5 xl:flex xl:h-[100dvh] xl:overflow-hidden"><div className="mx-auto max-w-[1320px] xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
    <header className="mb-6 flex shrink-0 items-center justify-between gap-5 px-1 sm:mb-9"><Link href="/" className="inline-flex items-center" aria-label="EVLV home"><img src="/logo/evlv-logo-dark.png" alt="EVLV" className="h-7 w-auto sm:h-8" /></Link><div className="hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[.1em] text-[#54716a] sm:flex"><span>Batch documentation</span><i className="h-3 w-px bg-[#cbdad4]" /><span>U.S. dispatch</span><i className="h-3 w-px bg-[#cbdad4]" /><span>Research use only</span></div></header>
    <section className={`grid items-center gap-10 xl:min-h-0 xl:flex-1 xl:grid-cols-[440px_minmax(0,1fr)] xl:gap-16 ${isRegistration ? "xl:items-stretch" : ""}`}>
      <div className={`order-1 rounded-[24px] border border-[#d7e5df] bg-white p-5 shadow-[0_22px_70px_rgba(8,57,50,.10)] sm:p-8 xl:order-1 ${isRegistration ? "xl:h-full xl:min-h-0 xl:overflow-y-auto" : ""}`}>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#3d7569]">{portalLabel}</p><h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.04] tracking-[-.035em] text-[#103a35] sm:text-[38px]">{mode === "signin" ? "Welcome back." : "Create your account."}</h1>
        <p className="mt-3 text-sm leading-6 text-[#667972]">{mode === "signin" ? "Sign in to manage orders, saved addresses, documentation access, and approved account benefits." : isJoinOffer ? "Register with your flyer access to unlock your single-use 25% account reward." : `Create one secure account and receive ${welcomePercent}% off your first eligible order.`}</p>
        <div className="mt-7 grid grid-cols-2 rounded-xl bg-[#edf5f1] p-1.5"><button type="button" onClick={() => switchMode("signin")} className={`rounded-lg px-4 py-3 text-xs font-bold transition ${mode === "signin" ? "bg-[#0b3d37] text-white shadow-sm" : "text-[#60746d] hover:text-[#103a35]"}`}>Sign in</button><button type="button" onClick={() => switchMode("register")} className={`rounded-lg px-4 py-3 text-xs font-bold transition ${mode === "register" ? "bg-[#0b3d37] text-white shadow-sm" : "text-[#60746d] hover:text-[#103a35]"}`}>Register</button></div>
        <button type="button" onClick={startGoogleSignIn} disabled={googleLoading || submitting} className="mt-5 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#cbdcd5] bg-white px-4 text-xs font-bold text-[#183c36] shadow-sm transition hover:border-[#8eb9aa] hover:bg-[#f7fbf9] disabled:cursor-wait disabled:opacity-60"><span className="grid h-5 w-5 place-items-center rounded-full bg-white text-base font-bold text-[#4285f4]" aria-hidden="true">G</span>{googleLoading ? "Finishing Google sign-in..." : "Continue with Google"}</button>
        <div className="my-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#9aa9a4]"><span className="h-px flex-1 bg-[#e1ebe6]" />use your email<span className="h-px flex-1 bg-[#e1ebe6]" /></div>
        <form onSubmit={handleSubmit} className="space-y-4"><Field label="Email address" type="email" value={email} onChange={setEmail} autoComplete="email" />
          {mode === "signin" && <PasswordField value={password} onChange={setPassword} visible={showPassword} onToggle={() => setShowPassword((value) => !value)} autoComplete="current-password" />}
          {mode === "register" && <>
            <PasswordField value={password} onChange={setPassword} visible={showPassword} onToggle={() => setShowPassword((value) => !value)} autoComplete="new-password" />
            <PasswordField label="Confirm password" value={confirmPassword} onChange={setConfirmPassword} visible={showPassword} onToggle={() => setShowPassword((value) => !value)} autoComplete="new-password" />
            <div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" value={fullName} onChange={setFullName} autoComplete="name" /><Field label="Date of birth" type="date" value={dateOfBirth} onChange={setDateOfBirth} autoComplete="bday" /></div>
            <Field label="Company or institution" value={company} onChange={setCompany} autoComplete="organization" required={false} />
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#294c45]">Business type or industry</span><select value={businessType} onChange={(event) => setBusinessType(event.target.value)} className="h-12 w-full rounded-xl border border-[#cfddd7] bg-[#fbfdfc] px-4 text-sm text-[#152522] outline-none transition focus:border-[#347c6c] focus:ring-4 focus:ring-[#347c6c]/10"><option value="RESEARCHER">Researcher</option><option value="CLINIC">Clinic</option><option value="UNIVERSITY">University</option><option value="DISTRIBUTOR">Distributor</option><option value="OTHER">Other</option></select></label>
            <Field label="Phone number" type="tel" value={phone} onChange={setPhone} autoComplete="tel" />
            <details className="group rounded-xl border border-[#d9e7e1] bg-[#f8fbf9] text-xs leading-5 text-[#5f746c]"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-bold text-[#254a43]"><span>Research-use terms and eligibility</span><i className="ri-add-line text-base transition group-open:rotate-45" /></summary><div className="border-t border-[#d9e7e1] px-4 pb-4"><p className="pt-3">Products are supplied strictly for lawful in-vitro laboratory and analytical research. They are not for human or veterinary use, consumption, application, diagnosis, or treatment.</p><p className="mt-2">By registering, you confirm that you are at least 21 years old and that any purchase will be used exclusively for lawful research purposes.</p><Link href="/terms" target="_blank" className="mt-3 inline-block font-bold text-[#15584e] underline underline-offset-2">View Terms &amp; Conditions</Link></div></details>
            <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#385b53]"><input required type="checkbox" checked={ruoAttested} onChange={(event) => setRuoAttested(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0b3d37]" />I acknowledge that I am accessing EVLV materials solely for lawful in-vitro research, have read and agree to the Terms of Service, and am authorized to handle and use them.</label>
            <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#60736c]"><input type="checkbox" checked={marketingOptIn} onChange={(event) => setMarketingOptIn(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#0b3d37]" />Send me product updates, new documentation notices, and occasional account offers.</label>
          </>}
          {error && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-xs font-medium leading-5 text-red-700"><i className="ri-error-warning-line mt-0.5" />{error}</p>}
          <button type="submit" disabled={submitting} className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#0b3d37] px-5 text-xs font-bold uppercase tracking-[.13em] text-white transition hover:bg-[#15584e] disabled:cursor-wait disabled:opacity-60">{submitting ? "Please wait..." : mode === "signin" ? "Sign in securely" : isJoinOffer ? "Create account and apply 25%" : `Create account and save ${welcomePercent}%`} <i className="ri-arrow-right-line text-base" /></button>
        </form><p className="mt-5 text-center text-[11px] leading-5 text-[#83928d]">By continuing, you agree to EVLV&rsquo;s <Link href="/terms" className="underline underline-offset-2">Terms</Link> and <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.</p>
      </div>
      <div className="order-2 self-center xl:order-2"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#4a8376]">Research today. Discover tomorrow.</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[.98] tracking-[-.045em] text-[#103a35] sm:text-5xl xl:text-6xl">Documented <span className="text-[#287d6a]">research compounds.</span></h2><p className="mt-5 max-w-2xl text-base leading-7 text-[#61746e] sm:text-lg">EVLV organizes research-use-only materials around identifiable catalogue records, labeled strengths, and batch-specific documentation where it is published. Strictly for laboratory and analytical research.</p>
        <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2"><PortalBenefit icon="ri-building-4-line" title="Institutional and bulk enquiries" copy="Reviewed pricing and supply terms for laboratories, distributors, and qualified research-supply partners." /><PortalBenefit icon="ri-file-search-line" title="Product-specific documentation" copy="Review published COAs and related report types against the exact product and identified lot where available." /><PortalBenefit icon="ri-git-branch-line" title="Batch record clarity" copy="Catalogue identity, labeled strength, and the published record stay connected so one report is not treated as a blanket claim." /><PortalBenefit icon="ri-customer-service-2-line" title="Dedicated support" copy="Get order, dispatch, account, and documentation help from the EVLV team when you need it." /></div>
        <div className="relative mt-5 min-h-[190px] overflow-hidden rounded-[24px] border border-[#d9e8e1] bg-[#e9f2ed] p-6 sm:mt-8 sm:min-h-[220px] sm:p-8 xl:hidden"><div className="absolute inset-y-0 right-0 w-[52%] bg-[linear-gradient(90deg,rgba(233,242,237,1),rgba(233,242,237,.12)),url('/images/certified/evlv-quality-transparency-v2.png')] bg-cover bg-center" /><div className="relative z-10 max-w-sm"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#4c786d]">Documentation first</p><p className="mt-3 font-display text-2xl font-semibold leading-tight text-[#103a35] sm:text-3xl">Built for researchers who expect a cleaner record.</p></div></div>
      </div>
    </section>
    <footer className="mt-10 flex shrink-0 flex-col justify-between gap-3 border-t border-[#dbe7e1] px-1 pt-5 text-[10px] font-medium text-[#7d9089] sm:mt-14 sm:flex-row xl:mt-3 xl:pt-3"><span>© EVLV {new Date().getFullYear()} · Warrior Distributions LLC</span><span>Strictly for lawful laboratory and analytical research · Not for human or veterinary use</span></footer>
  </div></main>;
}

function Field({ label, type = "text", value, onChange, autoComplete, required = true }: { label: string; type?: string; value: string; onChange: (value: string) => void; autoComplete: string; required?: boolean }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#294c45]">{label}{required && <span aria-hidden="true"> *</span>}</span><input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} className="h-12 w-full rounded-xl border border-[#cfddd7] bg-[#fbfdfc] px-4 text-base text-[#152522] outline-none transition placeholder:text-[#9caaa5] focus:border-[#347c6c] focus:ring-4 focus:ring-[#347c6c]/10" /></label>;
}

function PasswordField({ label = "Password", value, onChange, visible, onToggle, autoComplete }: { label?: string; value: string; onChange: (value: string) => void; visible: boolean; onToggle: () => void; autoComplete: string }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-[#294c45]">{label} <span aria-hidden="true">*</span></span><span className="relative block"><input required type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} className="h-12 w-full rounded-xl border border-[#cfddd7] bg-[#fbfdfc] px-4 pr-12 text-base text-[#152522] outline-none transition focus:border-[#347c6c] focus:ring-4 focus:ring-[#347c6c]/10" /><button type="button" onClick={onToggle} aria-label={visible ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-[#789088] transition hover:text-[#174d43]"><i className={visible ? "ri-eye-off-line" : "ri-eye-line"} /></button></span></label>;
}
