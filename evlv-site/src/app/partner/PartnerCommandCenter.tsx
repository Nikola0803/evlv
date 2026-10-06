"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AccountAccess } from "@/app/account/AccountAccess";
import { PayoutSettings, type PayoutInfo } from "@/app/account/PayoutSettings";
import { clearAuth, getStoredToken, getStoredUser } from "@/lib/auth";

type View = "overview" | "performance" | "conversions" | "payouts" | "links";
type Status = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

type PerformancePoint = { date: string; clicks: number; conversions: number; commissionCents: number };
type Conversion = {
  orderNumber: number;
  placedAt: string;
  orderStatus: "COMPLETED" | "PROCESSING" | "ON_HOLD" | "REFUNDED";
  grossCents: number;
  commissionCents: number;
};
type Payout = {
  id: string;
  amountCents: number;
  status: "REQUESTED" | "PAID" | "REJECTED";
  requestedAt: string;
  paidAt?: string | null;
};

interface PartnerData extends PayoutInfo {
  status: Status;
  affiliateName?: string;
  affiliateEmail?: string;
  referralCode?: string;
  ratePercent?: number;
  clicks30d?: number;
  clicksTotal?: number;
  totalConversions?: number;
  conversionRate?: number;
  salesConfirmed?: number;
  salesPending?: number;
  grossRevenueCents?: number;
  lifetimeCommissionCents?: number;
  paidCommissionCents?: number;
  commissionAvailableCents?: number;
  commissionPendingCents?: number;
  minPayoutCents?: number;
  performance?: PerformancePoint[];
  recentConversions?: Conversion[];
  payoutHistory?: Payout[];
}

const NAV: { key: View; label: string; icon: string }[] = [
  { key: "overview", label: "Overview", icon: "ri-command-line" },
  { key: "performance", label: "Performance", icon: "ri-line-chart-line" },
  { key: "conversions", label: "Conversions", icon: "ri-shopping-bag-3-line" },
  { key: "payouts", label: "Payouts", icon: "ri-wallet-3-line" },
  { key: "links", label: "Campaign Links", icon: "ri-links-line" },
];

const DESTINATIONS = [
  { label: "EVLV Home", path: "/" },
  { label: "Shop All", path: "/shop" },
  { label: "GLP Research", path: "/shop?focus=metabolic" },
  { label: "COA Library", path: "/coas" },
  { label: "Research Journal", path: "/journal" },
];

const PAYOUT_LABELS: Record<NonNullable<PayoutInfo["payoutMethod"]>, string> = {
  venmo: "Venmo",
  zelle: "Zelle",
  cashapp: "Cash App",
  bank_ach: "Bank Transfer (ACH)",
};

function money(cents = 0) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function shortDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function PartnerCommandCenter() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<View>("overview");
  const [copied, setCopied] = useState("");
  const [destination, setDestination] = useState(DESTINATIONS[0].path);
  const [requesting, setRequesting] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/affiliate/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: getStoredToken() }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body?.error || "Partner Command is temporarily unavailable.");
      setData(body);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Partner Command is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setMounted(true);
    if (getStoredUser() && getStoredToken()) load();
    else setLoading(false);
  }, []);

  const baseUrl = typeof window === "undefined" ? "https://www.evlvpeptides.com" : window.location.origin;
  const referralCode = data?.referralCode ?? "";
  const mainLink = referralCode ? `${baseUrl}/?ref=${encodeURIComponent(referralCode)}` : "";
  const campaignLink = useMemo(() => {
    if (!referralCode) return "";
    const url = new URL(destination, baseUrl);
    url.searchParams.set("ref", referralCode);
    url.searchParams.set("utm_source", "partner");
    url.searchParams.set("utm_medium", "referral");
    return url.toString();
  }, [baseUrl, destination, referralCode]);

  async function copy(value: string, id: string) {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(""), 1600);
  }

  async function requestPayout() {
    setRequesting(true);
    setRequestMessage("");
    try {
      const response = await fetch("/api/affiliate/payout-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: getStoredToken() }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body?.error || "The payout request could not be created.");
      setRequestMessage(`Payout request submitted for ${money(body.amountCents)}.`);
      await load();
    } catch (cause) {
      setRequestMessage(cause instanceof Error ? cause.message : "The payout request could not be created.");
    } finally {
      setRequesting(false);
    }
  }

  if (!mounted) return null;
  if (!getStoredUser() || !getStoredToken()) {
    return <AccountAccess initialMode="signin" redirectTo="/partner" partnerMode />;
  }
  if (loading) return <PortalState icon="ri-loader-4-line animate-spin" title="Loading Partner Command" body="Syncing attribution and commission data…" />;
  if (error) return <PortalState icon="ri-error-warning-line" title="Unable to load the portal" body={error} action={<button onClick={load} className="portal-button">Try again</button>} />;
  if (!data || data.status === "NONE") {
    return <PortalState icon="ri-user-add-line" title="Partner access has not been requested" body="Submit an application first. Once approved, this becomes your private performance command center." action={<Link href="/ambassadors#apply" className="portal-button">Apply for consideration</Link>} />;
  }
  if (data.status === "PENDING") return <PortalState icon="ri-time-line" title="Application under review" body="Your application is in the review queue. We will email you as soon as a decision is made." />;
  if (data.status === "REJECTED") return <PortalState icon="ri-information-line" title="Partner access is not active" body="Contact the EVLV partnerships team if your audience or circumstances have changed." />;

  const available = data.commissionAvailableCents ?? 0;
  const minPayout = data.minPayoutCents ?? 0;
  const canRequest = Boolean(data.payoutMethod) && available >= minPayout;

  return (
    <main className="min-h-screen bg-[#eef2ef] text-[#102d28]">
      <div className="border-b border-white/10 bg-[#082a27] text-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-7 md:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9fc9bc]">EVLV Partner Command</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-.03em] md:text-4xl">Welcome back, {data.affiliateName?.split(" ")[0] || "Partner"}.</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#9fc9bc]/25 bg-[#9fc9bc]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#b9d9ce]">Approved Partner</span>
            <button onClick={() => { clearAuth(); window.location.href = "/partner"; }} className="rounded-lg border border-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/70 hover:bg-white/10">Sign out</button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[250px_1fr]">
        <aside className="border-b border-[#d5dfda] bg-white p-4 lg:min-h-[calc(100vh-110px)] lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">
            {NAV.map((item) => (
              <button key={item.key} onClick={() => setView(item.key)} className={`flex min-w-max items-center gap-3 rounded-lg px-4 py-3 text-left text-xs font-bold uppercase tracking-[.1em] transition lg:w-full ${view === item.key ? "bg-[#102d28] text-white" : "text-[#60706b] hover:bg-[#eef3f0] hover:text-[#102d28]"}`}>
                <i className={`${item.icon} text-lg`} /><span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 hidden rounded-xl bg-[#e3efea] p-4 lg:block">
            <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#567d72]">Private terms</p>
            <p className="mt-2 font-display text-2xl font-semibold">{data.ratePercent ?? 0}%</p>
            <p className="mt-1 text-xs leading-5 text-[#60706b]">Current commission rate on eligible confirmed product revenue.</p>
          </div>
        </aside>

        <section className="min-w-0 p-5 md:p-8 lg:p-10">
          {view === "overview" && (
            <div className="space-y-7">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric icon="ri-cursor-line" label="Clicks · 30 days" value={String(data.clicks30d ?? 0)} hint={`${data.clicksTotal ?? 0} lifetime`} />
                <Metric icon="ri-shopping-bag-3-line" label="Confirmed conversions" value={String(data.salesConfirmed ?? 0)} hint={`${data.salesPending ?? 0} pending`} />
                <Metric icon="ri-percent-line" label="Conversion rate" value={`${data.conversionRate ?? 0}%`} hint="Lifetime attributed" />
                <Metric icon="ri-money-dollar-circle-line" label="Available commission" value={money(available)} hint={`${money(data.commissionPendingCents)} pending`} accent />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
                <Panel title="30-day performance" eyebrow="Attribution signal">
                  <PerformanceChart points={data.performance ?? []} />
                </Panel>
                <Panel title="Your primary referral link" eyebrow="Ready to deploy">
                  <p className="text-sm leading-6 text-[#60706b]">Every visitor entering through this link is attributed to your partner profile.</p>
                  <code className="mt-5 block break-all rounded-lg bg-[#eef3f0] p-4 text-xs text-[#315d53]">{mainLink}</code>
                  <button onClick={() => copy(mainLink, "main")} className="portal-button mt-4 w-full">{copied === "main" ? "Copied" : "Copy referral link"}</button>
                </Panel>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <Panel title="Commission position" eyebrow="Earnings">
                  <div className="grid grid-cols-2 gap-3">
                    <MiniMetric label="Lifetime earned" value={money(data.lifetimeCommissionCents)} />
                    <MiniMetric label="Paid to date" value={money(data.paidCommissionCents)} />
                    <MiniMetric label="Available" value={money(available)} />
                    <MiniMetric label="Pending" value={money(data.commissionPendingCents)} />
                  </div>
                </Panel>
                <Panel title="Recent conversions" eyebrow="Latest activity">
                  <ConversionList conversions={(data.recentConversions ?? []).slice(0, 5)} />
                  <button onClick={() => setView("conversions")} className="mt-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#356f60]">View all conversion activity →</button>
                </Panel>
              </div>
            </div>
          )}

          {view === "performance" && <Panel title="Performance analytics" eyebrow="Rolling 30 days"><PerformanceChart points={data.performance ?? []} large /><div className="mt-7 grid gap-3 sm:grid-cols-3"><MiniMetric label="Attributed revenue" value={money(data.grossRevenueCents)} /><MiniMetric label="Lifetime clicks" value={String(data.clicksTotal ?? 0)} /><MiniMetric label="Total conversions" value={String(data.totalConversions ?? 0)} /></div></Panel>}

          {view === "conversions" && <Panel title="Conversion ledger" eyebrow="Privacy-safe attribution"><p className="mb-6 max-w-2xl text-sm leading-6 text-[#60706b]">Order references, status, revenue, and commission are shown without exposing customer identity or shipping information.</p><ConversionList conversions={data.recentConversions ?? []} /></Panel>}

          {view === "payouts" && (
            <div className="space-y-6">
              <Panel title="Payout position" eyebrow="Earnings control">
                <div className="grid gap-4 md:grid-cols-3"><MiniMetric label="Available now" value={money(available)} /><MiniMetric label="Minimum payout" value={money(minPayout)} /><MiniMetric label="Payout rail" value={data.payoutMethod ? PAYOUT_LABELS[data.payoutMethod] : "Not configured"} /></div>
                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#dce5e1] pt-6"><button disabled={!canRequest || requesting} onClick={requestPayout} className="portal-button disabled:cursor-not-allowed disabled:opacity-40">{requesting ? "Submitting…" : "Request payout"}</button><p className="text-xs text-[#60706b]">{requestMessage || (canRequest ? "Requests are reviewed and paid manually." : "Configure a payout method and reach the minimum balance first.")}</p></div>
              </Panel>
              <PayoutSettings initial={{ payoutMethod: data.payoutMethod, payoutDestination: data.payoutDestination, bankAccountHolder: data.bankAccountHolder, bankRoutingNumber: data.bankRoutingNumber, bankAccountNumber: data.bankAccountNumber, bankAccountType: data.bankAccountType }} onSaved={(info) => setData((current) => current ? { ...current, ...info } : current)} />
              <Panel title="Payout history" eyebrow="Ledger"><PayoutHistory payouts={data.payoutHistory ?? []} /></Panel>
            </div>
          )}

          {view === "links" && (
            <div className="grid gap-6 xl:grid-cols-[1fr_.8fr]">
              <Panel title="Campaign link builder" eyebrow="Attribution tools">
                <p className="text-sm leading-6 text-[#60706b]">Choose a destination. Partner attribution and campaign tags are added automatically.</p>
                <label className="mt-6 block text-[10px] font-bold uppercase tracking-[.12em] text-[#567d72]">Destination</label>
                <select value={destination} onChange={(event) => setDestination(event.target.value)} className="mt-2 w-full rounded-lg border border-[#cedbd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#356f60]">{DESTINATIONS.map((item) => <option key={item.path} value={item.path}>{item.label}</option>)}</select>
                <code className="mt-4 block break-all rounded-lg bg-[#eef3f0] p-4 text-xs leading-5 text-[#315d53]">{campaignLink}</code>
                <button onClick={() => copy(campaignLink, "campaign")} className="portal-button mt-4">{copied === "campaign" ? "Copied" : "Copy campaign link"}</button>
              </Panel>
              <Panel title="Partner operating rules" eyebrow="Protect attribution">
                <ul className="space-y-4 text-sm leading-6 text-[#60706b]"><li className="flex gap-3"><i className="ri-check-line text-[#356f60]" />Always use an attributed link rather than a plain storefront URL.</li><li className="flex gap-3"><i className="ri-check-line text-[#356f60]" />Do not make medical, treatment, or human-use claims.</li><li className="flex gap-3"><i className="ri-check-line text-[#356f60]" />Use approved research-use-only positioning and current EVLV creative.</li><li className="flex gap-3"><i className="ri-check-line text-[#356f60]" />Contact the partnerships team before paid media or custom campaigns.</li></ul>
              </Panel>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function PortalState({ icon, title, body, action }: { icon: string; title: string; body: string; action?: React.ReactNode }) {
  return <main className="flex min-h-[70vh] items-center justify-center bg-[#eef2ef] px-5 py-16"><div className="max-w-xl rounded-2xl border border-[#d5dfda] bg-white p-10 text-center shadow-[0_24px_80px_rgba(16,45,40,.08)]"><i className={`${icon} text-4xl text-[#356f60]`} /><h1 className="mt-5 font-display text-3xl font-semibold text-[#102d28]">{title}</h1><p className="mt-3 text-sm leading-7 text-[#60706b]">{body}</p>{action && <div className="mt-7">{action}</div>}</div></main>;
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-[#d5dfda] bg-white p-6 shadow-[0_12px_35px_rgba(16,45,40,.04)] md:p-8"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#64897f]">{eyebrow}</p><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-.025em] text-[#102d28]">{title}</h2><div className="mt-6">{children}</div></section>;
}

function Metric({ icon, label, value, hint, accent }: { icon: string; label: string; value: string; hint: string; accent?: boolean }) {
  return <div className={`rounded-2xl border p-5 ${accent ? "border-[#356f60] bg-[#102d28] text-white" : "border-[#d5dfda] bg-white text-[#102d28]"}`}><div className={`flex h-9 w-9 items-center justify-center rounded-full ${accent ? "bg-white/10 text-[#b9d9ce]" : "bg-[#e3efea] text-[#356f60]"}`}><i className={icon} /></div><p className="mt-5 font-display text-3xl font-semibold tracking-[-.035em]">{value}</p><p className={`mt-1 text-[9px] font-bold uppercase tracking-[.14em] ${accent ? "text-white/60" : "text-[#64897f]"}`}>{label}</p><p className={`mt-3 text-xs ${accent ? "text-white/45" : "text-[#81908b]"}`}>{hint}</p></div>;
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-[#eef3f0] p-4"><p className="text-[9px] font-bold uppercase tracking-[.12em] text-[#64897f]">{label}</p><p className="mt-2 font-display text-xl font-semibold text-[#102d28]">{value}</p></div>;
}

function PerformanceChart({ points, large = false }: { points: PerformancePoint[]; large?: boolean }) {
  const visible = points.slice(-14);
  const max = Math.max(1, ...visible.map((point) => point.clicks));
  return <div><div className={`flex items-end gap-2 rounded-xl bg-[#eef3f0] px-4 pb-4 pt-7 ${large ? "h-80" : "h-52"}`}>{visible.map((point) => <div key={point.date} className="group flex h-full min-w-0 flex-1 flex-col justify-end"><div title={`${point.clicks} clicks · ${point.conversions} conversions`} className="relative min-h-[4px] rounded-t bg-[#356f60] transition group-hover:bg-[#c68855]" style={{ height: `${Math.max(3, (point.clicks / max) * 100)}%` }}>{point.conversions > 0 && <span className="absolute -top-2 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#c68855]" />}</div></div>)}</div><div className="mt-3 flex items-center justify-between text-[9px] font-bold uppercase tracking-[.12em] text-[#81908b]"><span>{visible[0]?.date ? shortDate(visible[0].date) : "No activity"}</span><span className="flex items-center gap-4"><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#356f60]" />Clicks</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-[#c68855]" />Conversions</span></span><span>{visible.at(-1)?.date ? shortDate(visible.at(-1)!.date) : ""}</span></div></div>;
}

function ConversionList({ conversions }: { conversions: Conversion[] }) {
  if (!conversions.length) return <div className="rounded-xl border border-dashed border-[#cedbd6] p-8 text-center text-sm text-[#81908b]">No attributed conversions yet.</div>;
  return <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead><tr className="border-b border-[#dce5e1] text-[9px] font-bold uppercase tracking-[.12em] text-[#64897f]"><th className="pb-3">Order</th><th className="pb-3">Date</th><th className="pb-3">Status</th><th className="pb-3 text-right">Revenue</th><th className="pb-3 text-right">Commission</th></tr></thead><tbody>{conversions.map((item) => <tr key={`${item.orderNumber}-${item.placedAt}`} className="border-b border-[#edf1ef] text-sm"><td className="py-3 font-mono text-xs text-[#315d53]">#{item.orderNumber}</td><td className="py-3 text-[#60706b]">{shortDate(item.placedAt)}</td><td className="py-3"><span className="rounded-full bg-[#eef3f0] px-2 py-1 text-[9px] font-bold uppercase tracking-[.08em] text-[#567d72]">{item.orderStatus.replace("_", " ")}</span></td><td className="py-3 text-right text-[#60706b]">{money(item.grossCents)}</td><td className="py-3 text-right font-semibold text-[#102d28]">{money(item.commissionCents)}</td></tr>)}</tbody></table></div>;
}

function PayoutHistory({ payouts }: { payouts: Payout[] }) {
  if (!payouts.length) return <div className="rounded-xl border border-dashed border-[#cedbd6] p-8 text-center text-sm text-[#81908b]">No payout requests yet.</div>;
  return <div className="space-y-2">{payouts.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 rounded-xl bg-[#eef3f0] px-4 py-3"><div><p className="text-sm font-semibold text-[#102d28]">{money(item.amountCents)}</p><p className="mt-0.5 text-[10px] text-[#81908b]">Requested {shortDate(item.requestedAt)}</p></div><span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.1em] text-[#567d72]">{item.status}</span></div>)}</div>;
}
