import { z } from "zod";
import { emailSchema } from "~/server/types/global.type";

export const createUserInput = z.object({
  email: emailSchema,
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  password: z.string(),
});

export const getUserInput = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: emailSchema.optional(),
});

export const getUsersInput = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const updateUserInput = z.object({
  id: z.string(),
  username: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  password: z.string().optional(),
});

export const deleteUserInput = z.object({
  id: z.string(),
});
