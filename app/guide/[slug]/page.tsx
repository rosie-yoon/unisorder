import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GuideHero, GuideRenderer } from "@/components/guide-renderer";
import { getGuideBySlug, getGuides } from "@/lib/guides";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const guides = await getGuides({ publishedOnly: true });
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug, { publishedOnly: true });
  if (!guide) return {};
  return {
    title: `${guide.title} 가이드`,
    description: guide.description,
    alternates: {
      canonical: `/guide/${guide.slug}`,
    },
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [guide, guides] = await Promise.all([
    getGuideBySlug(slug, { publishedOnly: true }),
    getGuides({ publishedOnly: true }),
  ]);
  if (!guide) notFound();
  const relatedGuides = guides.filter((item) => item.slug !== guide.slug).slice(0, 4);

  return (
    <main>
      <GuideHero guide={guide} />
      <div className="shell py-10">
        <Link href="/guide" className="mb-8 inline-flex items-center gap-2 text-sm font-black text-slate-600 hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          가이드 목록으로
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <GuideRenderer blocks={guide.blocks} />
          <aside>
            <RelatedGuideList guides={relatedGuides} />
          </aside>
        </div>
      </div>
    </main>
  );
}

function RelatedGuideList({ guides }: { guides: Awaited<ReturnType<typeof getGuides>> }) {
  if (guides.length === 0) return null;

  return (
    <div className="sticky top-24 rounded-lg border border-primary/15 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <p className="text-sm font-black text-slate-500">추천 가이드</p>
      <div className="mt-4 space-y-3">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.slug}
              href={`/guide/${guide.slug}`}
              className="group block rounded-md border border-border bg-slate-50/70 p-4 transition hover:border-primary/35 hover:bg-primary-soft"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-primary shadow-sm">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-slate-500">{guide.category} · {guide.duration}</span>
                  <span className="mt-1 block text-sm font-black leading-6 text-slate-950">{guide.title}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-black text-primary">
                    보기
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
