"use client";

import { api } from "~/trpc/react";

export default function Home() {
  const data = api.user.getAll.useQuery({ page: 1, limit: 10 });
  console.log(data);
  return <div>Hello World</div>;
}
