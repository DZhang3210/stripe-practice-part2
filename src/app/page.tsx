"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <main>
      <button onClick={() => signIn("github")}> Sign In</button>
    </main>
  );
}
