"use client";

import { useEffect } from "react";
import { api } from "~/trpc/react";

export default function Home() {
  // const data = api.user.getAll.useQuery({ page: 1, limit: 10 });

  const createContentMutation = api.content.create.useMutation();
  useEffect(() => {
    const content = createContentMutation.mutate({
      user_mongo_id: "6664b5122e4d1d4f5fdeb883",
      title: "Hello",
    });
    console.log(content);
  }, []);

  // const data = api.blog.get.useQuery({
  //   id: "666d2f8704d2c49b5450ae83",
  // });
  // console.log(data);

  // const createBlogMutation = api.blog.create.useMutation();
  // useEffect(() => {
  //   const blog = createBlogMutation.mutate({
  //     content_mongo_id: "666cc764998e8c455d254f1d",
  //     blog_details: "something here",
  //   });
  //   console.log(blog);
  // }, []);

  return <div>Hello world</div>;
}
