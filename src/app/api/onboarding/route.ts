import { NextResponse } from "next/server";
import { joinCommunityAction } from "@/@module/home/server/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await joinCommunityAction(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 400 },
    );
  }
}
