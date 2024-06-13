import userModel from "../models/user.model";
import type {
  createUserInput,
  deleteUserInput,
  getUserInput,
  updateUserInput,
} from "../inputs/user.input";
import type { z } from "zod";

import { TRPCError } from "@trpc/server";

export const createUser = async (input: z.infer<typeof createUserInput>) => {
  const existingUser = await userModel.findOne(input).lean();

  if (existingUser) {
    throw new TRPCError({
      code: "CONFLICT",
      message:
        existingUser.email === input.email
          ? "Email ID already in use"
          : "Username already in use",
    });
  }

  const user = await userModel.create(input);
  return user;
};

export const getUser = async (input: z.infer<typeof getUserInput>) => {
  const query: { _id?: string; username?: string; email?: string } = {};
  if (input.id) {
    query._id = input.id;
  }
  if (input.username) {
    query.username = input.username;
  }
  if (input.email) {
    query.email = input.email;
  }
  const existingUser = await userModel.findOne(query).lean();

  if (!existingUser) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "No User Found",
    });
  }

  return existingUser;
};

export const getUsers = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const users = await userModel
    .find()
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  return users;
};

export const updateUser = async (input: z.infer<typeof updateUserInput>) => {
  const { id, ...updateData } = input;

  const updatedUser = await userModel
    .findByIdAndUpdate(id, updateData, {
      new: true,
    })
    .lean();

  if (!updatedUser) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "No User Found" });
  }

  return updatedUser;
};

export const deleteUser = async (input: z.infer<typeof deleteUserInput>) => {
  const { id } = input;
  const deletedUser = await userModel.findByIdAndDelete(id).lean();
  if (!deletedUser) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "No User Found",
    });
  }

  return deletedUser;
};
