import { z } from "zod";
import mongoose from "mongoose";

export const emailSchema = z
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


export const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: "Invalid MongoDB ObjectId",
});