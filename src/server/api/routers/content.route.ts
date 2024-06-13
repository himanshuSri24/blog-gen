import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import contentModel from "~/server/models/content.model";

// ------------------------- Schema --------------------------------------

const contentSchema = z.object({
  user_mongo_id: z.string(),
  title: z.string(),
  user_prompt: z.string().optional(), // if some user wants to pass the prompt as well along with the title so optional since some not all
  blog_mongo_id: z.string().optional(),
  linkedin_post_mongo_id: z.string().optional(),
  youtube_transcript_mongo_id: z.string().optional(),
});

const getContentSchema = z
  .object({
    id: z.string().optional(),
    user_mongo_id: z.string().optional(),
    title: z.string().optional(),
    blog_mongo_id: z.string().optional(),
    linkedin_post_mongo_id: z.string().optional(),
    youtube_transcript_mongo_id: z.string().optional(),
    from_date: z.date().optional(),
    to_date: z.date().optional(),
  })
  .refine((data) => {
    // If from_date is provided and to_date is not, set to_date to the current date
    if (data.from_date && !data.to_date) {
      data.to_date = new Date();
    }
  });

const updateContentSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  user_prompt: z.string().optional(),
  blog_mongo_id: z.string().optional(),
  linkedin_post_mongo_id: z.string().optional(),
  youtube_transcript_mongo_id: z.string().optional(),
});

// ----------------------- Router ---------------------------

export const contentRouter = createTRPCRouter({
  // To create new content
  create: publicProcedure.input(contentSchema).mutation(async ({ input }) => {
    const content = await contentModel.create(input);
    return content._id;
  }),

  // To get content based on query
  get: publicProcedure.input(getContentSchema).query(async ({ input }) => {
    const query: {
      _id?: string;
      user_mongo_id?: string;
      title?: string;
      blog_mongo_id?: string;
      linkedin_post_mongo_id?: string;
      youtube_transcript_mongo_id?: string;
      from_date?: Date;
      to_date?: Date;
    } = {};

    if (input.id) {
      query._id = input.id;
    }
    if (input.user_mongo_id) {
      query.user_mongo_id = input.user_mongo_id;
    }
    if (input.title) {
      query.title = input.title;
    }
    if (input.blog_mongo_id) {
      query.blog_mongo_id = input.blog_mongo_id;
    }
    if (input.linkedin_post_mongo_id) {
      query.linkedin_post_mongo_id = input.linkedin_post_mongo_id;
    }
    if (input.youtube_transcript_mongo_id) {
      query.youtube_transcript_mongo_id = input.youtube_transcript_mongo_id;
    }
    if (input.from_date ?? input.to_date) {
      query.createdAt = {};
      if (input.from_date) {
        query.createdAt.$gte = input.from_date;
      }
      if (input.to_date) {
        query.createdAt.$lte = input.to_date;
      }
    }

    const contents = await contentModel.find(query).lean();

    if (!contents || contents.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No content found with the provided criteria",
      });
    }

    return contents;
  }),

  // To get all contents
  getAll: publicProcedure.query(async () => {
    const contents = await contentModel.find().lean();
    return contents;
  }),

  update: publicProcedure
    .input(updateContentSchema)
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      const updatedContent = await contentModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .lean();

      if (!updatedContent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Content not found with the provided ID",
        });
      }

      return updatedContent;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const deletedContent = await contentModel.findByIdAndDelete(id).lean();

      if (!deletedContent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Content not found with the provided ID",
        });
      }

      return {
        message: "Content deleted successfully",
        id: deletedContent._id,
      };
    }),
});
