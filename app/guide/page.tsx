import Link from "next/link";
import { ArrowRight, BookOpenCheck, Route } from "lucide-react";
import { GuideNavigation } from "@/components/guide-navigation";
import { getGuides, getRecommendedGuidePaths } from "@/lib/guides";

export const dynamic = "force-dynamic";

export default async function GuideIndexPage() {
  const guides = await getGuides({ publishedOnly: true });
  const paths = getRecommendedGuidePaths(guides);

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf9_42%,#ffffff_100%)]">
      <section className="shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <GuideNavigation guides={guides} />

          <div className="space-y-8">
            <section>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-black text-primary-dark">
                  <Route className="h-4 w-4" />
                  처음 설정할 때 많이 보는 순서
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {paths.map((path) => (
                  <article key={path.name} className="rounded-lg border border-primary/15 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xl font-black text-slate-950">{path.name}</p>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                          {path.guides.length}개 문서를 순서대로 확인합니다.
                        </p>
                      </div>
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary-dark">
                        <BookOpenCheck className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {path.guides.slice(0, 4).map((guide, index) => (
                        <Link
                          key={`${path.name}-${guide.slug}`}
                          href={`/guide/${guide.slug}`}
                          className="flex items-center gap-3 rounded-md bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-primary-soft hover:text-primary-dark"
                        >
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-primary ring-1 ring-primary/20">
                            {index + 1}
                          </span>
                          <span className="min-w-0 flex-1">{guide.title}</span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border bg-white p-5 md:p-6">
              <div className="flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-black tracking-tight text-slate-950">전체 문서</h2>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {guides.map((guide) => {
                  const Icon = guide.icon;
                  return (
                    <Link
                      key={guide.slug}
                      href={`/guide/${guide.slug}`}
                      className="group rounded-lg border border-border bg-slate-50/60 p-5 transition hover:border-primary/35 hover:bg-primary-soft"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-primary ring-1 ring-border">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-bold text-slate-500">{guide.category} · {guide.duration}</span>
                          <span className="mt-1 block text-lg font-black text-slate-950">{guide.title}</span>
                          <span className="mt-2 block text-sm font-semibold leading-6 text-slate-600">{guide.description}</span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
