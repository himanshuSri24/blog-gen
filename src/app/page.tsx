"use client";

import { api } from "~/trpc/react";

export default function Home() {
  const data = api.user.getAll.useQuery();
  console.log(data);
  return <div>Hello World</div>;
}
