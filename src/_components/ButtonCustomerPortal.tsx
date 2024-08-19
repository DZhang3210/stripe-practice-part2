"use client";

import { useSession, signIn } from "next-auth/react";

const customerPortalLink =
  "https://billing.stripe.com/p/login/test_bIY03Yf059cJa406oo";

export const ButtonCustomerPortal = () => {
  const { data: session, status } = useSession();
  if (status == "authenticated") {
    return (
      <a
        href={customerPortalLink + "?prefilled_email=" + session.user?.email}
        className="btn"
      >
        Billing
      </a>
    );
  }
  return <button onClick={() => signIn("github")}> Sign In</button>;
};
