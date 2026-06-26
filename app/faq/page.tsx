import { getFaqs } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getFaqs({ publishedOnly: true });
  const visibleFaqs = faqs.slice(0, 5);

  return (
    <main className="shell py-14">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-950">자주 묻는 질문</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          고객 문의와 내부 운영 기준을 정리해 가입 전후의 마찰을 줄입니다.
        </p>
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
        {visibleFaqs.map((faq) => (
          <article key={faq.id} className="p-6">
            <h2 className="text-lg font-black text-slate-950">{faq.question}</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">{faq.answer}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
