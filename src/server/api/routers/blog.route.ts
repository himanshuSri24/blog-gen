import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import {
  createBlogInput,
  deleteBlogInput,
  getBlogInput,
  getBlogsInput,
  updateBlogInput,
} from "~/server/inputs/blog.input";

import { 
  createBlog, 
  deleteBlog, 
  getBlog, 
  getBlogs, 
  updateBlog 
} from "~/server/services/blog.service";


export const blogRouter = createTRPCRouter({
  create: publicProcedure.input(createBlogInput).mutation(async ({ input }) => {
    const newBlog = await createBlog(input);
    return newBlog;
  }),

  get: publicProcedure.input(getBlogInput).query(async ({ input }) => {
    const blog = await getBlog(input);
    return blog;
  }),

  getAll: publicProcedure.input(getBlogsInput).query(async () => {
    const blogs = await getBlogs({ page: 1, limit: 10 });
    return blogs;
  }),


  update: publicProcedure
    .input(updateBlogInput)
    .mutation(async ({ input }) => {
      const updatedBlog = await updateBlog(input);
      return updatedBlog;
    }),

  delete: publicProcedure
    .input(deleteBlogInput)
    .mutation(async ({ input }) => {
      const deletedBlog = await deleteBlog(input);
      return deletedBlog;
    }),
});
