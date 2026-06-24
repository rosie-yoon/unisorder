import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminUserById, type AdminUser, type PublicAdminUser } from "@/lib/admin-users";

export const adminSessionCookieName = "unisorder_admin_session";
const sessionMaxAgeSeconds = 60 * 60 * 8;

type SessionPayload = {
  sub: string;
  username: string;
  sessionVersion: number;
  exp: number;
};

export type AdminAuthResult =
  | { ok: true; user: PublicAdminUser }
  | { ok: false; status: number; message: string };

function getSessionSecret() {
  return (
    process.env.UNISORDER_ADMIN_SESSION_SECRET ||
    process.env.UNISORDER_ADMIN_SETUP_KEY ||
    process.env.UNISORDER_ADMIN_TOKEN ||
    (process.env.NODE_ENV === "production" ? undefined : "dev-admin-session-secret")
  );
}

export function getSetupKey() {
  return process.env.UNISORDER_ADMIN_SETUP_KEY ?? (process.env.NODE_ENV === "production" ? undefined : "dev-admin");
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("UNISORDER_ADMIN_SESSION_SECRET 환경변수를 설정해야 어드민 로그인을 사용할 수 있습니다.");
  }
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function toPublicUser(user: AdminUser): PublicAdminUser {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

export function createAdminSessionValue(user: AdminUser) {
  const payload: SessionPayload = {
    sub: user.id,
    username: user.username,
    sessionVersion: user.sessionVersion,
    exp: Math.floor(Date.now() / 1000) + sessionMaxAgeSeconds,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function setAdminSessionCookie(response: NextResponse, sessionValue: string) {
  response.cookies.set(adminSessionCookieName, sessionValue, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(adminSessionCookieName, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

async function verifySession(sessionValue?: string): Promise<PublicAdminUser | undefined> {
  if (!sessionValue) return undefined;
  const [encodedPayload, signature] = sessionValue.split(".");
  if (!encodedPayload || !signature || !safeEqual(signature, sign(encodedPayload))) return undefined;

  const payload = JSON.parse(decodeBase64Url(encodedPayload)) as Partial<SessionPayload>;
  if (!payload.sub || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return undefined;

  const user = await getAdminUserById(payload.sub);
  if (!user || !user.isActive || user.sessionVersion !== payload.sessionVersion) return undefined;
  return toPublicUser(user);
}

export async function getAdminSession(request: NextRequest) {
  return verifySession(request.cookies.get(adminSessionCookieName)?.value);
}

export async function assertAdmin(request: NextRequest): Promise<AdminAuthResult> {
  const secret = getSessionSecret();
  if (!secret) {
    return {
      ok: false,
      status: 500,
      message: "UNISORDER_ADMIN_SESSION_SECRET 환경변수를 설정해야 어드민 API를 사용할 수 있습니다.",
    };
  }

  const user = await getAdminSession(request);
  if (!user) {
    return {
      ok: false,
      status: 401,
      message: "로그인이 필요합니다.",
    };
  }

  return { ok: true, user };
}
