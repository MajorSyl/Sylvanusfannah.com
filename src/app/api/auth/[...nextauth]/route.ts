import { NextResponse } from "next/server";
import { handlers } from "@/auth";
import { isAuthConfigured } from "@/lib/env";

type Handler = (typeof handlers)["GET"];

const guard =
  (handler: Handler): Handler =>
  async (req) => {
    if (!isAuthConfigured()) {
      return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 });
    }
    return handler(req);
  };

export const GET = guard(handlers.GET);
export const POST = guard(handlers.POST);
