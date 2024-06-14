import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createContentInput, deleteContentInput, getContentInput, getContentsInput, updateContentInput } from "~/server/inputs/content.input";
import { createContent, deleteContent, getContent, getContents, updateContent } from "~/server/services/content.service";



export const contentRouter = createTRPCRouter({
  // To create new content
  create: publicProcedure.input(createContentInput).mutation(async ({ input }) => {
    const content = await createContent(input);
    return content;
  }),

  // To get content based on query
  get: publicProcedure.input(getContentInput).query(async ({ input }) => {
    console.log("Something")
    console.log(input);
    const content = await getContent(input);
    return content;
  }),

  // To get all contents
  getAll: publicProcedure.input(getContentsInput).query(async ({input}) => {
    const { page, limit } = getContentsInput.parse(input);
    const contents = await getContents({ page, limit });
    return contents;
  }),

  update: publicProcedure
    .input(updateContentInput)
    .mutation(async ({ input }) => {
      const updatedContent = await updateContent(input);
      return updatedContent
    }),

  delete: publicProcedure
    .input(deleteContentInput)
    .mutation(async ({ input }) => {
      const deletedContent = await deleteContent(input);
      return deletedContent;
    }),
});
