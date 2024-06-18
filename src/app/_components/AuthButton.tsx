// components/AuthButton.js
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button disabled>Loading...</button>;
  }

  if (session) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }

  return <button onClick={() => signIn()}>Sign In</button>;
}
