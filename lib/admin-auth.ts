import type { NextRequest } from "next/server";

export function getAdminToken() {
  return process.env.UNISORDER_ADMIN_TOKEN ?? (process.env.NODE_ENV === "production" ? undefined : "dev-admin");
}

export function assertAdmin(request: NextRequest) {
  const configuredToken = getAdminToken();

  if (!configuredToken) {
    return {
      ok: false as const,
      status: 500,
      message: "UNISORDER_ADMIN_TOKEN 환경변수를 설정해야 어드민 API를 사용할 수 있습니다.",
    };
  }

  const token = request.headers.get("x-admin-token");
  if (token !== configuredToken) {
    return {
      ok: false as const,
      status: 401,
      message: "어드민 인증 토큰이 올바르지 않습니다.",
    };
  }

  return { ok: true as const };
}
