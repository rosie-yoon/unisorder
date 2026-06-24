import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionValue, setAdminSessionCookie } from "@/lib/admin-auth";
import { verifyAdminCredentials } from "@/lib/admin-users";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const user = await verifyAdminCredentials(body.username, body.password);
    if (!user) return errorResponse("아이디 또는 비밀번호가 올바르지 않습니다.", 401);

    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        isActive: user.isActive,
        sessionVersion: user.sessionVersion,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    setAdminSessionCookie(response, createAdminSessionValue(user));
    return response;
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "로그인에 실패했습니다.");
  }
}
