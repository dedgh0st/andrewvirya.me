import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/access-token";

const invalidTokenMessage =
  "This access link is invalid or has expired. Request a new link at https://andrewvirya.me.";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  if (!token || !verifyAccessToken(token)) {
    return new Response(invalidTokenMessage, {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const targetUrl =
    type === "cv" ? process.env.RESUME_URL : process.env.PORTFOLIO_DECK_URL;

  if (!targetUrl) {
    return new Response("The requested resource is not available.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const target = new URL(targetUrl);
    if (target.protocol !== "https:" && target.protocol !== "http:") {
      throw new Error("Unsupported redirect URL protocol.");
    }
    return NextResponse.redirect(target, { status: 302 });
  } catch {
    return new Response("The requested resource is not available.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
