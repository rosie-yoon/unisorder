import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin-auth";
import { deleteFaq, updateFaq } from "@/lib/content-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function errorResponse(error: unknown, status = 400) {
  return NextResponse.json({ error: error instanceof Error ? error.message : "요청을 처리할 수 없습니다." }, { status });
}

function revalidateFaqPages() {
  revalidatePath("/");
  revalidatePath("/faq");
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const auth = assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const { id } = await context.params;
    const faq = await updateFaq(id, await request.json());
    revalidateFaqPages();
    return NextResponse.json({ faq });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const auth = assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const { id } = await context.params;
    await deleteFaq(id);
    revalidateFaqPages();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
