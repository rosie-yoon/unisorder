import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionValue, getSetupKey, setAdminSessionCookie } from "@/lib/admin-auth";
import { createAdminUser, getAdminUserCount, verifyAdminCredentials } from "@/lib/admin-users";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const userCount = await getAdminUserCount();
    if (userCount > 0) return errorResponse("첫 관리자 설정은 이미 완료되었습니다.", 409);

    const setupKey = getSetupKey();
    if (!setupKey) return errorResponse("UNISORDER_ADMIN_SETUP_KEY 환경변수를 설정해주세요.", 500);

    const body = (await request.json()) as {
      setupKey?: string;
      username?: string;
      password?: string;
      displayName?: string;
    };

    if (body.setupKey !== setupKey) return errorResponse("설치 키가 올바르지 않습니다.", 401);

    const created = await createAdminUser({
      username: body.username ?? "",
      password: body.password ?? "",
      displayName: body.displayName,
    });
    const fullUser = await verifyAdminCredentials(body.username, body.password);
    if (!fullUser) return errorResponse("첫 관리자 생성 후 로그인에 실패했습니다.", 500);

    const response = NextResponse.json({ user: created }, { status: 201 });
    setAdminSessionCookie(response, createAdminSessionValue(fullUser));
    return response;
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "첫 관리자 생성에 실패했습니다.");
  }
}
