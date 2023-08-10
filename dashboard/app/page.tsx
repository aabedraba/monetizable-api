import { authOptions } from "./api/auth/[...nextauth]/auth-options";
import { SignInPage } from "@/components/sign-in-page";
import { StripePricingTable } from "@/components/stripe-pricing-table";
import { getSubscription } from "@/lib/get-subscription";
import { isLoggedInSession } from "@/lib/logged-in";
import { getRequiredEnvVar } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Script from "next/script";

export default async function IndexPage() {
  const session = await getServerSession(authOptions);
  if (isLoggedInSession(session)) {
    const subscription = await getSubscription(session)

    if (!subscription.error) {
      redirect("/dashboard");
    }
  }

  return (
    <>
      <Script src="https://js.stripe.com/v3/pricing-table.js" />

      {session?.user ? <StripePricingTable /> : <SignInPage />}
    </>
  );
}
