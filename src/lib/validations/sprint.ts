import { z } from "zod";

export const createSprintSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Sprint name must be at least 2 characters.")
      .max(100, "Sprint name is too long."),

    description: z
      .string()
      .trim()
      .max(1000, "Description is too long.")
      .optional(),

    projectId: z.string().trim().min(1, "Project is required."),

    startDate: z.string().min(1, "Start date is required."),

    endDate: z.string().min(1, "End date is required."),
  })
  .refine(
    (data) => {
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date cannot be before start date.",
      path: ["endDate"],
    },
  );

export type CreateSprintInput = z.infer<typeof createSprintSchema>;
