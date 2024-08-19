"use client";
import { ButtonCustomerPortal } from "@/_components/ButtonCustomerPortal";
import Pricing from "@/_components/Pricing";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <>
      <header className="mx-auto flex max-w-7xl justify-end p-4">
        <ButtonCustomerPortal />
      </header>
      <main className="bg-base-200 min-h-screen">
        <Pricing />
      </main>
    </>
  );
}
