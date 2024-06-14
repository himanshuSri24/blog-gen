"use client";

import { useEffect } from "react";
import { api } from "~/trpc/react";

export default function Home() {
  // const data = api.user.getAll.useQuery({ page: 1, limit: 10 });

  // const createContentMutation = api.content.create.useMutation();
  // useEffect(() => {
  //   const content = createContentMutation.mutate({
  //     user_mongo_id: "6664b5122e4d1d4f5fdeb881",
  //     title: "Something",
  //   });
  //   console.log(content);
  // }, []);

  return <div>Hello World</div>;
}
