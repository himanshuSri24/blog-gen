import type {
  createContentInput,
  deleteContentInput,
  getContentInput,
  updateContentInput,
} from "../inputs/content.input";
import type { z } from "zod";

import { TRPCError } from "@trpc/server";
import contentModel from "../models/content.model";

export const createContent = async (input: z.infer<typeof createContentInput>) => {
    const content = await contentModel.create(input);
    return content;
};

export const getContent = async (input: z.infer<typeof getContentInput>) => {

    // if (!input.id && !input.user_mongo_id && !input.title && !input.blog_mongo_id && !input.linkedin_post_mongo_id && !input.youtube_transcript_mongo_id ) {
    //   throw new TRPCError({
    //     code: "BAD_REQUEST",
    //     message: "At least one of the following fields is required: id, user_mongo_id, title, blog_mongo_id, linkedin_post_mongo_id, youtube_transcript_mongo_id",
    //   });
    // }

    if (input.from_date && !input.to_date) {
      input.to_date = new Date();
    }

    if (input.from_date && input.to_date && input.from_date > input.to_date) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "from_date cannot be greater than to_date",
      });
    }

    const query: {
        _id?: string;
        user_mongo_id?: string;
        title?: string;
        blog_mongo_id?: string;
        linkedin_post_mongo_id?: string;
        youtube_transcript_mongo_id?: string;
        createdAt?: { $gte?: Date; $lte?: Date };
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
};

export const getContents = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const content = await contentModel
    .find()
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  return content;
};

export const updateContent = async (input: z.infer<typeof updateContentInput>) => {
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
};

export const deleteContent = async (input: z.infer<typeof deleteContentInput>) => {
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
};
