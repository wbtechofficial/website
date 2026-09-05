"use server";

import { createClient } from "@/integrations/supabase/server";
import { sendWelcomeEmail } from "@/lib/email";
import { splitE164 } from "@/lib/country-codes";
import { onboardingFormSchema, type OnboardingFormData } from "../schemas/onboarding.schema";

export async function joinCommunityAction(data: OnboardingFormData) {
    // 1. Validate payload using the zod schema
    const validation = onboardingFormSchema.safeParse(data);
    if (!validation.success) {
        throw new Error("Validation failed. Please check your form inputs.");
    }

    const { name, email, contactNumber, profession, organisation_name } = validation.data;

    // Derive country ISO (e.g. "IN") from the E.164 dial code automatically.
    const countryCode = splitE164(contactNumber).iso;

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
        throw new Error("Email address is already registered in the community.");
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
        throw new Error("Contact number is already registered in the community.");
    }

    // 5. Insert new record (E.164 with leading "+")
    const { error: insertError } = await supabase.from("profiles").insert({
        name,
        email,
        contact_number: contactNumber,
        country_code: countryCode,
        profession,
        organisation_name,
    });

    if (insertError) {
        console.error("Supabase insert error:", insertError);
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
