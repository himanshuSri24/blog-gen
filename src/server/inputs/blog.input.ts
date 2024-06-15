import { z } from "zod";
import { objectIdSchema } from "../types/global.type";

export const createBlogInput = z.object({
    content_mongo_id: objectIdSchema,
    blog_details: z.string(),
    image_url: z.string().optional(),
    sources: z.string().optional(),
    comment: z.object({
      blog_id: objectIdSchema,
      message: z.string(),
    }).optional(),
    likes: z.number().optional(),
});

export const getBlogInput = z.object({
    id: objectIdSchema.optional(),
    content_mongo_id: objectIdSchema.optional(),
    from_date: z.date().optional(),
    to_date: z.date().optional(),
})


export const getBlogsInput = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
});

export const updateBlogInput = z.object({
    id: objectIdSchema.optional(),
    content_mongo_id: objectIdSchema.optional(),
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
  .refine((data) => data.id ?? data.content_mongo_id, {
    message: "Either id or content_mongo_id must be provided",
  });

export const deleteBlogInput = z.object({
  id: objectIdSchema,
});
