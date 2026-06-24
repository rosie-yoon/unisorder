import { NextRequest, NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin-auth";
import { deleteAdminUser, updateAdminUser } from "@/lib/admin-users";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function errorResponse(error: unknown, status = 400) {
  return NextResponse.json({ error: error instanceof Error ? error.message : "요청을 처리할 수 없습니다." }, { status });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = await assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const { id } = await context.params;
    const user = await updateAdminUser(id, await request.json());
    return NextResponse.json({ user });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = await assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const { id } = await context.params;
    await deleteAdminUser(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
