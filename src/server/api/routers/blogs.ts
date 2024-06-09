import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import blogModel from "~/server/models/blog-model";
import { api } from "~/trpc/server";

// ----------------------- Schema --------------------------

const blogSchema = z.object({
  content_mongo_id: z.string(),
  blog_details: z.string(),
  image_url: z.string().optional(),
  sources: z.string().optional(),
  comment: z.object({
    user_id: z.string(),
    message: z.string(),
  }),
  likes: z.number(),
});

const getBlogSchema = z
  .object({
    id: z.string(),
    content_mongo_id: z.string(),
    from_date: z.date().optional(),
    to_date: z.date().optional(),
  })
  .refine((data) => {
    // If from_date is provided and to_date is not, set to_date to the current date
    if (data.from_date && !data.to_date) {
      data.to_date = new Date();
    }
  });

const updateBlogSchema = z
  .object({
    id: z.string().optional(),
    content_mongo_id: z.string().optional(),
    blog_details: z.string().optional(),
    image_url: z.string().optional(),
    sources: z.string().optional(),
    comment: z
      .object({
        user_id: z.string(),
        message: z.string(),
      })
      .optional(),
    likes: z.number().optional(),
  })
  .refine((data) => data.id || data.content_mongo_id, {
    message: "Either id or content_mongo_id must be provided",
  });

// ----------------------------- Router ------------------------------------

export const blogRouter = createTRPCRouter({
  create: publicProcedure.input(blogSchema).mutation(async ({ input }) => {
    const blog = await blogModel.create(input);
    const content = await api.content.update({
      id: input.content_mongo_id,
      blog_mongo_id: blog._id.toString(),
    });
    return blog._id;
  }),

  get: publicProcedure.input(getBlogSchema).query(async ({ input }) => {
    const query: any = {};

    // Build the query based on input fields
    if (input.id) {
      query._id = input.id;
    }
    if (input.content_mongo_id) {
      query.content_mongo_id = input.content_mongo_id;
    }
    if (input.from_date || input.to_date) {
      query.createdAt = {};
      if (input.from_date) {
        query.createdAt.$gte = input.from_date;
      }
      if (input.to_date) {
        query.createdAt.$lte = input.to_date;
      }
    }

    const blogs = await blogModel.find(query).lean();

    if (!blogs || blogs.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No blogs found with the provided criteria",
      });
    }

    return blogs;
  }),

  getAll: publicProcedure.query(async () => {
    const contents = await blogModel.find().lean();
    return contents;
  }),

  update: publicProcedure
    .input(updateBlogSchema)
    .mutation(async ({ input }) => {
      const { id, content_mongo_id, ...updateData } = input;
      const query: any = {};

      if (id) {
        query._id = id;
      } else if (content_mongo_id) {
        query.content_mongo_id = content_mongo_id;
      }

      const updatedBlog = await blogModel
        .findOneAndUpdate(query, updateData, { new: true })
        .lean();

      if (!updatedBlog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog not found with the provided ID or content_mongo_id",
        });
      }

      return updatedBlog;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const deletedBlog = await blogModel.findByIdAndDelete(id).lean();

      if (!deletedBlog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog not found with the provided ID",
        });
      }

      try {
        await api.content.update({
          id: deletedBlog.content_mongo_id,
          blog_mongo_id: "",
        });
      } catch (error) {
        console.error("Failed to update associated content:", error);
      }

      return { message: "Blog deleted successfully", id: deletedBlog._id };
    }),
});
