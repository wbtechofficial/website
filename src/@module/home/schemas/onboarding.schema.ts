import { z } from "zod";
import { COUNTRY_DIAL_CODES } from "@/base/constants/country-codes";

const KNOWN_ISO = new Set(COUNTRY_DIAL_CODES.map((c) => c.iso));
const DIAL_BY_ISO = new Map(COUNTRY_DIAL_CODES.map((c) => [c.iso, c.dial]));

export const onboardingFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must be at most 50 characters."),
    email: z.string().email("Invalid email address."),
    // Explicit ISO selected in the picker (e.g. "CA", "US", "IN").
    // This is the source of truth — required, never guessed from the dial code,
    // because many countries share a dial (US/CA → +1, RU/KZ → +7, ...).
    countryIso: z
      .string()
      .trim()
      .toUpperCase()
      .pipe(
        z
          .string()
          .length(2, "Select a country code.")
          .refine((v) => KNOWN_ISO.has(v), "Select a valid country code."),
      ),
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
  })
  .superRefine((val, ctx) => {
    // Guard against ISO/dial mismatch (e.g. ISO=CA but number starts with +91).
    // Shared dials are fine: US and CA both legitimately start with +1.
    const expectedDial = DIAL_BY_ISO.get(val.countryIso);
    if (expectedDial && !val.contactNumber.startsWith(`+${expectedDial}`)) {
      ctx.addIssue({
        code: "custom",
        path: ["contactNumber"],
        message: `Number must start with +${expectedDial} for the selected country.`,
      });
    }
  });

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
export type OnboardingFormInput = z.input<typeof onboardingFormSchema>;
