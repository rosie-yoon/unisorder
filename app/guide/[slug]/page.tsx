import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
  const guide = await getGuideBySlug(slug, { publishedOnly: true });
  if (!guide) notFound();

  return (
    <main>
      <GuideHero guide={guide} />
      <div className="shell py-10">
        <Link href="/guide" className="mb-8 inline-flex items-center gap-2 text-sm font-black text-slate-600 hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          가이드 목록으로
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          <GuideRenderer blocks={guide.blocks} />
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-border bg-white p-5">
              <p className="text-sm font-black text-slate-500">이 문서</p>
              <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
                {guide.blocks.map((block, index) => (
                  <li key={`${block.type}-${index}`}>{block.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
