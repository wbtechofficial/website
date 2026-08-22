import { z } from "zod";

export const onboardingFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid email address."),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits."),
  profession: z.enum(["Working Professional", "Student"]),
  organisation_name: z
    .string()
    .min(2, "Organisation/Institution name must be at least 2 characters.")
    .max(100, "Organisation/Institution name must be at most 100 characters."),
});

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
