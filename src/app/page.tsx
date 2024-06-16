"use client";
import { signIn, signOut } from "next-auth/react";

export default function Component() {
  const session = false
  if (session) {
    return (
      <>
        <button className="bg-black p-5 text-white " onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button className="bg-black p-5 text-white " onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
