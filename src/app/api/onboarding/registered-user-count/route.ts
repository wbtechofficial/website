import { NextResponse } from "next/server";
import { getRegisteredUserCountAction } from "@/@module/home/server/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const count = await getRegisteredUserCountAction();
    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch registered user count.";
    return NextResponse.json({ error: message, count: 0 }, { status: 500 });
  }
}
