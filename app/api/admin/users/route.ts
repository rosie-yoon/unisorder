import { NextRequest, NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin-auth";
import { createAdminUser, getPublicAdminUsers } from "@/lib/admin-users";

function errorResponse(error: unknown, status = 400) {
  return NextResponse.json({ error: error instanceof Error ? error.message : "요청을 처리할 수 없습니다." }, { status });
}

export async function GET(request: NextRequest) {
  const auth = await assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  const users = await getPublicAdminUsers();
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const auth = await assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const user = await createAdminUser(await request.json());
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
