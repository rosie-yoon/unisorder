import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin-auth";
import { createFaq, getFaqs } from "@/lib/content-store";

function errorResponse(error: unknown, status = 400) {
  return NextResponse.json({ error: error instanceof Error ? error.message : "요청을 처리할 수 없습니다." }, { status });
}

function revalidateFaqPages() {
  revalidatePath("/");
  revalidatePath("/faq");
}

export async function GET(request: NextRequest) {
  const auth = await assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  const faqs = await getFaqs();
  return NextResponse.json({ faqs });
}

export async function POST(request: NextRequest) {
  const auth = await assertAdmin(request);
  if (!auth.ok) return errorResponse(new Error(auth.message), auth.status);

  try {
    const faq = await createFaq(await request.json());
    revalidateFaqPages();
    return NextResponse.json({ faq }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
