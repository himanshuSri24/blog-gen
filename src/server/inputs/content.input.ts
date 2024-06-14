import { z } from "zod";
import { objectIdSchema } from "../types/global.type";

export const createContentInput = z.object({
    user_mongo_id: objectIdSchema,
    title: z.string(),
    user_prompt: z.string().optional(), // if some user wants to pass the prompt as well along with the title so optional since some not all
    blog_mongo_id: objectIdSchema.optional(),
    linkedin_post_mongo_id: objectIdSchema.optional(),
    youtube_transcript_mongo_id: objectIdSchema.optional(),
});

export const getContentInput = z.object({
    id: objectIdSchema.optional(),
    user_mongo_id: objectIdSchema.optional(),
    title: z.string().optional(),
    blog_mongo_id: objectIdSchema.optional(),
    linkedin_post_mongo_id: objectIdSchema.optional(),
    youtube_transcript_mongo_id: objectIdSchema.optional(),
    from_date: z.date().optional(),
    to_date: z.date().optional(),
  })
  .refine((data) => {
    // If from_date is provided and to_date is not, set to_date to the current date
    if (data.from_date && !data.to_date) {
      data.to_date = new Date();
    }
});

export const getContentsInput = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
});

export const updateContentInput = z.object({
    id: objectIdSchema,
    title: z.string().optional(),
    user_prompt: z.string().optional(),
    blog_mongo_id: objectIdSchema.optional(),
    linkedin_post_mongo_id: objectIdSchema.optional(),
    youtube_transcript_mongo_id: objectIdSchema.optional(),
});

export const deleteContentInput = z.object({
  id: z.string(),
});
