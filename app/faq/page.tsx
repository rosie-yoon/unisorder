import { getFaqs } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getFaqs({ publishedOnly: true });

  return (
    <main className="shell py-14">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-950">자주 묻는 질문</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          고객 문의와 내부 운영 기준을 정리해 가입 전후의 마찰을 줄입니다.
        </p>
      </div>
      <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
        {faqs.map((faq) => (
          <details key={faq.id} className="group p-6">
            <summary className="cursor-pointer list-none text-lg font-black text-slate-950">
              {faq.question}
            </summary>
            <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
