import { Metadata } from "next";
import { AccountAccess } from "@/app/account/AccountAccess";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your EVLV research account.",
};

export default function LoginPage() {
  return <AccountAccess initialMode="signin" redirectTo="/shop" />;
}
