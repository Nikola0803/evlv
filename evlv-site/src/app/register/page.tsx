import { Metadata } from "next";
import { AccountAccess } from "@/app/account/AccountAccess";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Open a free EVLV research account and get 10% off your first order.",
};

export default function RegisterPage() {
  return <AccountAccess initialMode="register" />;
}
