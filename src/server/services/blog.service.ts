import blogModel from "../models/blog.model";
import type {
  createBlogInput,
  deleteBlogInput,
  getBlogInput,
  updateBlogInput,
} from "../inputs/blog.input";
import type { z } from "zod";

import { TRPCError } from "@trpc/server";
import { updateContent } from "./content.service";

export const createBlog = async (input: z.infer<typeof createBlogInput>) => {
    const blog = await blogModel.create(input);

    await updateContent({
      id: input.content_mongo_id,
      blog_mongo_id: blog._id.toString(),
    })

    // await api.content.update({
    //   id: input.content_mongo_id,
    //   blog_mongo_id: blog._id.toString(),
    // });
    return blog;
};

export const getBlog = async (input: z.infer<typeof getBlogInput>) => {

  if(!input.id && !input.content_mongo_id && !input.from_date && !input.to_date) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "At least one of the following fields is required: id, content_mongo_id, from_date, to_date",
    });
  }

  if(input.from_date && !input.to_date) {
    input.to_date = new Date();
  }

  if(input.from_date && input.to_date && input.from_date > input.to_date) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "from_date cannot be greater than to_date",
    });
  }

    const query: {
        _id?: string;
        content_mongo_id?: string;
        createdAt?: { $gte?: Date; $lte?: Date };
      } = {};
  
      // Build the query based on input fields
      if (input.id) {
        query._id = input.id;
      }
      if (input.content_mongo_id) {
        query.content_mongo_id = input.content_mongo_id;
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
  
      const blogs = await blogModel.find(query).lean();
  
      if (!blogs || blogs.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No blogs found with the provided criteria",
        });
      }
  
      return blogs;
};

export const getBlogs = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const Blogs = await blogModel
    .find()
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  return Blogs;
};

export const updateBlog = async (input: z.infer<typeof updateBlogInput>) => {
    const { id, content_mongo_id, ...updateData } = input;
    const query: { _id?: string; content_mongo_id?: string } = {};

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
};

export const deleteBlog = async (input: z.infer<typeof deleteBlogInput>) => {
    const { id } = input;

    const deletedBlog = await blogModel.findByIdAndDelete(id).lean();

    if (!deletedBlog) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Blog not found with the provided ID",
      });
    }

    try {
    } catch (error) {
      console.error("Failed to update associated content:", error);
    }

    return { message: "Blog deleted successfully", id: deletedBlog._id };
};
