import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {}

export const config = {
    matcher: ["/"],
};
