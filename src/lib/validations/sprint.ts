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
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date cannot be before start date.",
    path: ["endDate"],
  });

export const updateSprintSchema = z
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

export const updateSprintStatusSchema = z.object({
  status: z.enum(["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"]),
});

export type CreateSprintInput = z.infer<typeof createSprintSchema>;

export type UpdateSprintInput = z.infer<typeof updateSprintSchema>;

export type UpdateSprintStatusInput = z.infer<typeof updateSprintStatusSchema>;
