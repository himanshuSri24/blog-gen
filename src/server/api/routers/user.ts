import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import userModel from "~/server/models/user-model";

// ------------------------- All checks --------------------------------------

const emailSchema = z
  .string()
  .email()
  .refine(
    (email) => {
      const allowedDomains = ["example.com", "anotherdomain.com", "gmail.com"];
      const domain: string | undefined = email.split("@")[1];
      return domain && allowedDomains.includes(domain);
    },
    {
      message: "Email domain not allowed",
    },
  );

// ------------------------- Schema --------------------------------------

const userScehma = z.object({
  email: emailSchema,
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  password: z.string(),
});

const getUserScehma = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
});

const updateUserSchema = z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  updateData: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string().optional(),
  }),
});

// ----------------------- Router ---------------------------

export const userRouter = createTRPCRouter({
  // To create new user
  create: publicProcedure.input(userScehma).mutation(async ({ input }) => {
    const existingUser = await userModel
      .findOne({ $or: [{ username: input.username }, { email: input.email }] })
      .lean();

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
    console.log(`User : ${user}`);
    return user;
  }),

  get: publicProcedure.input(getUserScehma).query(async ({ input }) => {
    let query: any = {};
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
        message: "No user exists with the provided criteria",
      });
    }

    return existingUser;
  }),

  getAll: publicProcedure.query(async () => {
    return userModel.find().lean();
  }),

  update: publicProcedure
    .input(updateUserSchema)
    .mutation(async ({ input }) => {
      let query: any = {};

      if (input.id) {
        query._id = input.id;
      }
      if (input.username) {
        query.username = input.username;
      }
      if (input.email) {
        query.email = input.email;
      }

      const updatedUser = await userModel
        .findOneAndUpdate(query, input.updateData, { new: true })
        .lean();

      if (!updatedUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user exists with the provided criteria",
        });
      }

      return updatedUser;
    }),

  delete: publicProcedure.input(getUserScehma).mutation(async ({ input }) => {
    let query: any = {};
    if (input.id) {
      query._id = input.id;
    }
    if (input.username) {
      query.username = input.username;
    }
    if (input.email) {
      query.email = input.email;
    }

    const deletedUser = await userModel.findOneAndDelete(query).lean();

    if (!deletedUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user exists with the provided criteria",
      });
    }

    return deletedUser;
  }),
});
