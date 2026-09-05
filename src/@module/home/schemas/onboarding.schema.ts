import { z } from "zod";

export const onboardingFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid email address."),
  contactNumber: z
    .string()
    .trim()
    .min(8, "Enter a valid phone number with country code.")
    .max(20, "Enter a valid phone number with country code.")
    .regex(
      /^[+\d][\d\s\-.()]*$/,
      "Contact number may contain only digits, spaces, and + - . ( ).",
    )
    .transform((v) => v.replace(/[\s\-.()]/g, ""))
    .refine((v) => /^\+[1-9]\d{7,14}$/.test(v), {
      message:
        "Enter a valid international number in E.164 format (e.g. +919876543210).",
    }),
  profession: z.enum(["Working Professional", "Student"]),
  organisation_name: z
    .string()
    .min(2, "Organisation/Institution name must be at least 2 characters.")
    .max(100, "Organisation/Institution name must be at most 100 characters."),
});

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
