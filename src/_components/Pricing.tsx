"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

// Stripe Plans >> fill in your own priceId & link
export const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_fZefZE4jq8fA2Hu7su"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PpVZw2Nkv1LFCTzlqIhvoh6"
        : "",
    price: 19,
    duration: "/month",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aEUbJo8zGeDYci4001"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PpVeP2Nkv1LFCTzKBw3sQtH"
        : "",

    price: 99,
    duration: "/year",
  },
];

const Pricing = () => {
  const { data: session } = useSession();
  const [plan, setPlan] = useState(plans[0]);

  return (
    <>
      <section id="pricing">
        <div className="mx-auto max-w-5xl px-8 py-24">
          <div className="mb-20 flex w-full flex-col text-center">
            <p className="text-primary mb-5 font-medium">Pricing</p>
            <h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
              Hello YouTube
            </h2>
          </div>

          <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
            <div className="w-full max-w-lg">
              <div className="bg-base-100 relative z-10 flex h-full flex-col gap-5 rounded-xl p-8 lg:gap-8">
                <div className="flex items-center gap-8">
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setPlan(plans[0])}
                  >
                    <input
                      type="radio"
                      name="monthly"
                      className="radio"
                      checked={plan?.price === 19}
                    />
                    <span>Pay monthly</span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setPlan(plans[1])}
                  >
                    <input
                      type="radio"
                      name="yearly"
                      className="radio"
                      checked={plan?.price === 99}
                    />
                    <span>Pay yearly (60% OFF 💰)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className={`text-5xl font-extrabold tracking-tight`}>
                    ${plan?.price}
                  </p>
                  <div className="mb-[4px] flex flex-col justify-end">
                    <p className="text-base-content/80 text-sm font-semibold uppercase tracking-wide">
                      {plan?.duration}
                    </p>
                  </div>
                </div>

                <ul className="flex-1 space-y-2.5 text-base leading-relaxed">
                  {[
                    {
                      name: "NextJS boilerplate",
                    },
                    { name: "User oauth" },
                    { name: "Database" },
                    { name: "Emails" },
                    { name: "1 year of updates" },
                    { name: "24/7 support" },
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-[18px] w-[18px] shrink-0 opacity-80"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span>{feature.name} </span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <a
                    className="btn btn-primary btn-block"
                    target="_blank"
                    href={
                      plan?.link + "?prefilled_email=" + session?.user?.email
                    }
                  >
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fixed bottom-8 right-8">
        <a
          href="https://shipfa.st?ref=stripe_pricing_viodeo"
          className="border-base-content/20 hover:border-base-content/40 hover:text-base-content/90 text-base-content/80 inline-block cursor-pointer rounded border bg-white px-2 py-1 text-sm font-medium duration-200 hover:scale-105"
        >
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-base-content flex items-center gap-0.5 font-bold tracking-tight">
              {/* <Image
                src={logo}
                alt="ShipFast logo"
                priority={true}
                className="h-5 w-5"
                width={20}
                height={20}
              /> */}
              ShipFast
            </span>
          </div>
        </a>
      </section>
    </>
  );
};

export default Pricing;
