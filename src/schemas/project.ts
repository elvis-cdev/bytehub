import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(5000),

  budget: z
    .number()
    .positive("Budget must be greater than zero")
    .optional(),

  deadline: z.date().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
