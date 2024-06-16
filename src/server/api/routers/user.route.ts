// ------------------------- Imports --------------------------------------
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import {
  createUserInput,
  deleteUserInput,
  getUserInput,
  getUsersInput,
  updateUserInput,
} from "~/server/inputs/user.input";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "~/server/services/user.service";

// ------------------------- Router --------------------------------------
export const userRouter = createTRPCRouter({
  create: publicProcedure.input(createUserInput).mutation(async ({ input }) => {
    const newUser = await createUser(input);
    return newUser;
  }),

  get: publicProcedure.input(getUserInput).query(async ({ input }) => {
    const user = await getUser(input);
    return user;
  }),

  getAll: publicProcedure.input(getUsersInput).query(async ({input}) => { 
    const { page, limit } = getUsersInput.parse(input);
    const contents = await getUsers({ page, limit });
    return contents;
  }),

  update: publicProcedure.input(updateUserInput).mutation(async ({ input }) => {
    const updatedUser = await updateUser(input);
    return updatedUser;
  }),

  delete: publicProcedure.input(deleteUserInput).mutation(async ({ input }) => {
    const deletedUser = await deleteUser(input);
    return deletedUser;
  }),
});
