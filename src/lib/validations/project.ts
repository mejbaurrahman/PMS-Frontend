import { z } from "zod";

export const createProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters.")
      .max(100, "Project name is too long."),

    description: z
      .string()
      .trim()
      .max(1000, "Description is too long.")
      .optional(),

    organizationId: z.string().trim().min(1, "Organization ID is required."),

    teamId: z.string().trim().min(1, "Team ID is required."),

    startDate: z.string().optional(),

    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) {
        return true;
      }

      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date cannot be before start date.",
      path: ["endDate"],
    },
  );

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
