import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuides, guideCategories } from "@/lib/guides";

export const dynamic = "force-dynamic";

export default async function GuideIndexPage() {
  const guides = await getGuides({ publishedOnly: true });

  return (
    <main className="shell py-14">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Guide</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">이용 가이드</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          기능별 매뉴얼을 단계별 카드와 안내 박스로 정리합니다. 이후 어드민에서 같은 구조로 문서를 추가합니다.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {guideCategories.map((category) => (
          <span key={category} className="rounded-full border border-border bg-white px-3 py-1 text-sm font-bold text-slate-600">
            {category}
          </span>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link key={guide.slug} href={`/guide/${guide.slug}`} className="rounded-lg border border-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40">
              <Icon className="h-7 w-7 text-primary" />
              <p className="mt-5 text-sm font-bold text-slate-500">{guide.category} · {guide.duration}</p>
              <h2 className="mt-2 text-xl font-black text-slate-950">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{guide.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-primary">
                자세히 보기
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
