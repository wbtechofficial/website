import { NextResponse } from "next/server";
import { joinCommunityAction } from "@/@module/home/server/actions";
import { OnboardingConflictError } from "@/@module/home/server/onboarding-errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await joinCommunityAction(body);
    return NextResponse.json(result);
  } catch (error: any) {
    const isConflict = error instanceof OnboardingConflictError;

    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred.",
        // Lets the client attach the error to the right form field
        // (e.g. "email" or "contactNumber") instead of a generic toast.
        ...(isConflict ? { field: error.field } : {}),
      },
      { status: isConflict ? 409 : 400 },
    );
  }
}
