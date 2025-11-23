import { z } from "zod";

export const commentPayloadSchema = z
  .object({
    slug: z.string().min(1).max(160),
    content: z
      .string()
      .trim()
      .min(1, "Comment must be at least 1 character long.")
      .max(1000, "Comment must be 1000 characters or less."),
    authorName: z
      .string()
      .trim()
      .min(1, "Name should contain at least 1 character.")
      .max(60, "Name should be 60 characters or less.")
      .optional()
      .or(z.literal("").transform(() => undefined)),
    authorUrl: z
      .string()
      .trim()
      .url("Please provide a valid URL.")
      .max(200, "URL should be 200 characters or less.")
      .optional()
      .or(z.literal("").transform(() => undefined)),
  })
  .strict();
