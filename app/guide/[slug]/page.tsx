import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Route } from "lucide-react";
import { GuideNavigation } from "@/components/guide-navigation";
import { GuideHero, GuideRenderer } from "@/components/guide-renderer";
import { getGuideBySlug, getGuidePathNames, getGuides, getRecommendedGuidePaths } from "@/lib/guides";

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
  const guidePathNames = getGuidePathNames(guide);
  const currentPaths = getRecommendedGuidePaths(guides).filter((path) => guidePathNames.includes(path.name));

  return (
    <main>
      <GuideHero guide={guide} />
      <div className="shell py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <GuideNavigation guides={guides} currentSlug={guide.slug} />
          <div className="min-w-0">
            <CurrentPathList paths={currentPaths} currentSlug={guide.slug} />
            <GuideRenderer blocks={guide.blocks} />
          </div>
        </div>
      </div>
    </main>
  );
}

function CurrentPathList({
  paths,
  currentSlug,
}: {
  paths: ReturnType<typeof getRecommendedGuidePaths>;
  currentSlug: string;
}) {
  if (paths.length === 0) return null;

  return (
    <div className="mb-8 rounded-lg border border-primary/15 bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-black text-primary-dark">
        <Route className="h-4 w-4" />
        이 문서의 추천 경로
      </div>
      <div className="mt-3 space-y-3">
        {paths.map((path) => (
          <div key={path.name}>
            <p className="text-sm font-black text-slate-950">{path.name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {path.guides.map((guide, index) => (
                <Link
                  key={`${path.name}-${guide.slug}`}
                  href={`/guide/${guide.slug}`}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold leading-5 ${
                    currentSlug === guide.slug ? "bg-primary-soft text-primary-dark" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-black text-primary ring-1 ring-primary/20">
                    {index + 1}
                  </span>
                  <span>{guide.title}</span>
                  {currentSlug === guide.slug ? null : <ArrowRight className="h-3.5 w-3.5 shrink-0" />}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
