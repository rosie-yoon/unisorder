import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin-auth";
import { createGuide, getGuides } from "@/lib/content-store";

function errorResponse(error: unknown, status = 400) {
  return NextResponse.json({ error: error instanceof Error ? error.message : "요청을 처리할 수 없습니다." }, { status });
}

function revalidateGuidePages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/guide");
  revalidatePath("/guide/[slug]", "page");
  if (slug) revalidatePath(`/guide/${slug}`);
}

export async function GET(request: NextRequest) {
  const auth = await assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  const guides = await getGuides();
  return NextResponse.json({ guides });
}

export async function POST(request: NextRequest) {
  const auth = await assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const guide = await createGuide(await request.json());
    revalidateGuidePages(guide.slug);
    return NextResponse.json({ guide }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
