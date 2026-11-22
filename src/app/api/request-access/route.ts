import { Resend } from "resend";
import { z } from "zod";
import { createAccessToken } from "@/lib/access-token";

const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().trim(),
  botcheck: z.unknown().optional(),
});

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60 * 1000;
const requestsByIp = new Map<string, number[]>();
let lastRateLimitCleanup = 0;

function isRateLimited(ip: string, now: number) {
  if (now - lastRateLimitCleanup >= RATE_LIMIT_CLEANUP_INTERVAL_MS) {
    for (const [knownIp, timestamps] of requestsByIp) {
      const recentTimestamps = timestamps.filter(
        (timestamp) => now - timestamp < RATE_WINDOW_MS,
      );
      if (recentTimestamps.length === 0) {
        requestsByIp.delete(knownIp);
      } else {
        requestsByIp.set(knownIp, recentTimestamps);
      }
    }
    lastRateLimitCleanup = now;
  }

  const recentRequests = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );
  requestsByIp.set(ip, recentRequests);

  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }

  recentRequests.push(now);
  return false;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "botcheck" in body &&
    body.botcheck
  ) {
    return Response.json({ success: true });
  }

  if (isRateLimited(getClientIp(request), Date.now())) {
    return Response.json(
      { error: "Too many requests. Please try again in 15 minutes." },
      { status: 429 },
    );
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Enter a name between 2 and 100 characters and a valid email." },
      { status: 400 },
    );
  }

  const resendApiKey =
    process.env.NODE_ENV === "production"
      ? (process.env.PROD_RESEND_API_KEY as string)
      : (process.env.DEV_RESEND_API_KEY as string);
  const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!resendApiKey || !tokenSecret) {
    return Response.json(
      { error: "Access email delivery is not configured." },
      { status: 500 },
    );
  }

  const siteUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SITE_URL || "https://andrewvirya.me"
      : "http://localhost:3000";
  let deckLink: URL;
  let cvLink: URL;
  try {
    deckLink = new URL("/api/access", siteUrl);
    deckLink.searchParams.set("type", "deck");
    cvLink = new URL("/api/access", siteUrl);
    cvLink.searchParams.set("type", "cv");
  } catch {
    return Response.json(
      { error: "The site URL is not configured correctly." },
      { status: 500 },
    );
  }

  const cleanEmail = parsed.data.email.trim().toLowerCase();
  const token = createAccessToken(cleanEmail, 24);
  deckLink.searchParams.set("token", token);
  cvLink.searchParams.set("token", token);
  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Andrew Virya <noreply@andrewvirya.me>",
      to: cleanEmail,
      subject: "Your portfolio and resume access links",
      text: [
        `Hi ${parsed.data.name.trim()},`,
        "",
        "Here are your personal access links. They expire in 24 hours.",
        "",
        `Portfolio deck: ${deckLink.toString()}`,
        `Resume: ${cvLink.toString()}`,
        "",
        "If you did not request these links, you can ignore this email.",
      ].join("\n"),
    });

    if (error) {
      console.error("Resend could not deliver the portfolio access email.");
      return Response.json(
        { error: "Could not send access links. Please try again later." },
        { status: 502 },
      );
    }
  } catch {
    console.error("Resend could not deliver the portfolio access email.");
    return Response.json(
      { error: "Could not send access links. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
}
