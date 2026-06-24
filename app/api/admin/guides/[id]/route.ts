import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin-auth";
import { deleteGuide, updateGuide } from "@/lib/content-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function errorResponse(error: unknown, status = 400) {
  return NextResponse.json({ error: error instanceof Error ? error.message : "요청을 처리할 수 없습니다." }, { status });
}

function revalidateGuidePages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/guide");
  if (slug) revalidatePath(`/guide/${slug}`);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const { id } = await context.params;
    const guide = await updateGuide(id, await request.json());
    revalidateGuidePages(guide.slug);
    return NextResponse.json({ guide });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const { id } = await context.params;
    await deleteGuide(id);
    revalidateGuidePages();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
