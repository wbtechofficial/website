import { NextResponse } from "next/server";
import { getRegisteredUserCountAction } from "@/@module/home/server/actions";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getRegisteredUserCountAction();
    return NextResponse.json({ count });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch registered user count.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
