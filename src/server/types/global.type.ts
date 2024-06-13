import { z } from "zod";

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
