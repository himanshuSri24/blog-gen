"use client";

import { api } from "~/trpc/react";

export default function Home() {
  const {
    data: getUserData,
    isSuccess: isGetUserSuccess,
    error: getUserError,
    isLoading: isGetUserLoading,
  } = api.user.getAll.useQuery();

  if (isGetUserLoading) {
    return <h1>Is Loading</h1>;
  }

  if (isGetUserSuccess) {
    console.log(getUserData);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Hello
    </main>
  );
}
