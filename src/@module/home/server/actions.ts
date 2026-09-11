"use server";

import { createClient } from "@/integrations/supabase/server";
import { sendWelcomeEmail } from "@/lib/email";
import { COUNTRY_BY_ISO } from "@/lib/country-codes";
import { onboardingFormSchema, type OnboardingFormData } from "../schemas/onboarding.schema";
import { OnboardingConflictError } from "./onboarding-errors";

/**
 * Maps a Postgres unique-violation (23505) raised by the `profiles` table
 * to the form field that caused it, based on the constraint/column name in
 * the error. Falls back to a generic conflict if the column can't be
 * determined (e.g. constraint renamed in the DB) so we never leak the raw
 * error to the client.
 */
function toOnboardingConflictError(insertError: {
    code?: string;
    message?: string;
    details?: string | null;
}): OnboardingConflictError | null {
    if (insertError.code !== "23505") return null;

    const text = `${insertError.message ?? ""} ${insertError.details ?? ""}`.toLowerCase();

    if (text.includes("email")) {
        return new OnboardingConflictError("email", "This email is already registered.");
    }
    if (text.includes("contact_number") || text.includes("phone")) {
        return new OnboardingConflictError(
            "contactNumber",
            "This phone number is already registered.",
        );
    }

    // Unknown unique constraint - still avoid leaking the raw DB error.
    return new OnboardingConflictError(
        "email",
        "This email or phone number is already registered.",
    );
}

export async function joinCommunityAction(data: OnboardingFormData) {
    // 1. Validate payload using the zod schema
    const validation = onboardingFormSchema.safeParse(data);
    if (!validation.success) {
        throw new Error("Validation failed. Please check your form inputs.");
    }

    const { name, email, contactNumber, countryCode, profession, organisation_name } =
        validation.data;

    const known = COUNTRY_BY_ISO.get(countryCode);
    if (!known) {
        throw new Error("Validation failed. Please select a valid country code.");
    }
    if (!contactNumber.startsWith(`+${known.dial}`)) {
        throw new Error("Validation failed. Please check your form inputs.");
    }
    const validCountryCode = known.iso;

    // 2. Initialize Supabase client
    const supabase = await createClient();

    // 3. Guard rail: Check if email already exists
    const { data: existingEmail, error: emailCheckError } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .maybeSingle();

    if (emailCheckError) {
        console.error("Supabase email query error:", emailCheckError);
        throw new Error("Database lookup failed during validation checks.");
    }

    if (existingEmail) {
        throw new OnboardingConflictError("email", "This email is already registered.");
    }

    // 4. Guard rail: Check if contact number already exists
    const { data: existingPhone, error: phoneCheckError } = await supabase
        .from("profiles")
        .select("contact_number")
        .eq("contact_number", contactNumber)
        .maybeSingle();

    if (phoneCheckError) {
        console.error("Supabase contact query error:", phoneCheckError);
        throw new Error("Database lookup failed during validation checks.");
    }

    if (existingPhone) {
        throw new OnboardingConflictError(
            "contactNumber",
            "This phone number is already registered.",
        );
    }

    // 5. Insert new record (E.164 with leading "+")
    const insertPayload = {
        name,
        email,
        contact_number: contactNumber,
        country_code: validCountryCode,
        profession,
        organisation_name,
    };
    const { error: insertError } = await supabase.from("profiles").insert(insertPayload);

    if (insertError) {
        // Log full details server-side only; the client never sees raw DB errors.
        console.error("Supabase insert error:", insertError);

        // A duplicate can still slip through between the guard-rail checks
        // above and this insert (race condition between two concurrent
        // submissions). Translate it into the same friendly, field-specific
        // error the guard rails use instead of a generic failure.
        const conflictError = toOnboardingConflictError(insertError);
        if (conflictError) {
            throw conflictError;
        }

        throw new Error("Failed to submit onboarding profile. Please try again.");
    }

    // 6. Send welcome email via Resend
    try {
        await sendWelcomeEmail({ email, name });
    } catch (emailErr) {
        console.error("Failed to send welcome email during onboarding:", emailErr);
        // Note: Database insert succeeded, so we don't throw to avoid breaking user experience
    }

    return {
        success: true,
        message: "Successfully joined the community!",
    };
}

export async function getRegisteredUserCountAction(): Promise<number> {
    try {
        const supabase = await createClient();

        const { data: rpcCount, error: rpcError } = await supabase.rpc("get_registered_user_count");

        if (!rpcError && typeof rpcCount === "number") {
            return rpcCount;
        }

        const { count, error } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true });

        if (error) {
            console.error("Supabase count query error:", error);
            return 0;
        }

        return count ?? 0;
    } catch (error) {
        console.error("Unexpected error in getRegisteredUserCountAction:", error);
        return 0;
    }
}
