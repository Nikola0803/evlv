import type { Metadata } from "next";
import { AccountAccess } from "@/app/account/AccountAccess";

export const metadata: Metadata = {
  title: "Gym Flyer Access | 25% First Order Reward",
  description: "Create an EVLV research account and unlock the private 25% first-order flyer reward.",
  robots: { index: false, follow: true },
};

export default function Join25Page() {
  return (
    <main className="bg-[#f5f7f5] py-3 md:py-6">
      <div className="mx-auto max-w-[1120px] px-4 pt-7 text-center md:pt-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage-deep">Private gym flyer offer</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight text-charcoal md:text-5xl">
          25% off your first EVLV order
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/55 md:text-base">
          Create your account below. Your personal reward is added automatically, with no code to enter at checkout.
        </p>
      </div>
      <AccountAccess initialMode="register" offer="join25" welcomePercent={25} redirectTo="/shop?join=25" />
    </main>
  );
}
