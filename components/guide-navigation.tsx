import Link from "next/link";
import { ArrowRight, BookOpenCheck, Route } from "lucide-react";
import { getGuideCategoryGroups, getRecommendedGuidePaths, type Guide } from "@/lib/guides";

export function GuideNavigation({ guides, currentSlug }: { guides: Guide[]; currentSlug?: string }) {
  const paths = getRecommendedGuidePaths(guides);
  const groups = getGuideCategoryGroups(guides);

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <section className="rounded-lg border border-primary/15 bg-[linear-gradient(180deg,#ffffff_0%,#f1fbf6_100%)] p-4">
        <div className="flex items-center gap-2 text-sm font-black text-primary-dark">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white">
            <Route className="h-4 w-4" />
          </span>
          추천 경로
        </div>
        <div className="mt-3 space-y-3">
          {paths.map((path) => (
            <div key={path.name}>
              <p className="text-sm font-black leading-5 text-slate-950">{path.name}</p>
              <div className="mt-1 space-y-1">
                {path.guides.map((guide, index) => (
                  <Link
                    key={`${path.name}-${guide.slug}`}
                    href={`/guide/${guide.slug}`}
                    className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm font-bold leading-5 transition ${
                      currentSlug === guide.slug ? "bg-white text-primary-dark ring-1 ring-primary/20" : "text-slate-600 hover:bg-white/75 hover:text-slate-950"
                    }`}
                  >
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-black text-primary ring-1 ring-primary/20">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{guide.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-black text-slate-800">
          <BookOpenCheck className="h-4 w-4 text-primary" />
          전체 문서
        </div>
        <div className="mt-3 space-y-4">
          {groups.map((group) => (
            <div key={group.category}>
              <p className="text-xs font-black text-slate-500">{group.category}</p>
              <div className="mt-1 space-y-1">
                {group.guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guide/${guide.slug}`}
                    className={`group flex items-center justify-between gap-2 rounded-md px-2 py-2 text-sm font-bold leading-5 transition ${
                      currentSlug === guide.slug ? "bg-primary-soft text-primary-dark" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    <span className="min-w-0 truncate">{guide.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
