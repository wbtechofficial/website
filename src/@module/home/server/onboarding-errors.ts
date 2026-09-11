/**
 * Thrown when a submission conflicts with an existing record (duplicate
 * email or phone number). Carries which field caused the conflict so the
 * client can surface an inline, field-specific error instead of a raw
 * database message.
 *
 * Kept in its own module (rather than in server/actions.ts) because files
 * marked "use server" may only export async functions.
 */
export class OnboardingConflictError extends Error {
    field: "email" | "contactNumber";

    constructor(field: "email" | "contactNumber", message: string) {
        super(message);
        this.name = "OnboardingConflictError";
        this.field = field;
    }
}
