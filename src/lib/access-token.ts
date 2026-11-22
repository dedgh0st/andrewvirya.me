import { createHmac, timingSafeEqual } from "node:crypto";

type AccessTokenPayload = {
  email: string;
  exp: number;
};

function getSecret() {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not configured.");
  }

  return secret;
}

export function createAccessToken(email: string, ttlHours = 24): string {
  const payload: AccessTokenPayload = {
    email,
    exp: Date.now() + ttlHours * 3600 * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", getSecret())
    .update(encoded)
    .digest("base64url");

  return `${encoded}.${sig}`;
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  const [encoded, signature, ...extraParts] = token.split(".");
  if (!encoded || !signature || extraParts.length > 0) {
    return null;
  }

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(encoded)
    .digest();
  const providedSignature = Buffer.from(signature, "base64url");

  if (
    providedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(providedSignature, expectedSignature)
  ) {
    return null;
  }

  try {
    const payload: unknown = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    );
    if (
      typeof payload !== "object" ||
      payload === null ||
      !("email" in payload) ||
      !("exp" in payload) ||
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      !Number.isFinite(payload.exp) ||
      Date.now() > payload.exp
    ) {
      return null;
    }

    return { email: payload.email, exp: payload.exp };
  } catch {
    return null;
  }
}
