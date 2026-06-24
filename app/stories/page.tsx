import { TrendingUp } from "lucide-react";

const stories = [
  {
    title: "한글 송장으로 출고 작업 시간을 줄인 셀러",
    metric: "출고 준비 시간 35% 감소",
    body: "주문 확인과 송장 출력 기준을 통일해 팀 작업자의 반복 문의를 줄인 사례입니다.",
  },
  {
    title: "SKU 정리 후 재고 누락을 줄인 운영팀",
    metric: "품절 대응 속도 2배 개선",
    body: "옵션명 중심으로 관리하던 상품을 SKU 기준으로 재정리해 재고 경고를 빠르게 확인했습니다.",
  },
];

export default function StoriesPage() {
  return (
    <main className="shell py-14">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-950">성장 사례</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          실제 셀러의 운영 변화와 성과를 중심으로 정리할 섹션입니다. 1차는 카드 구조를 먼저 준비했습니다.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {stories.map((story) => (
          <article key={story.title} className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <TrendingUp className="h-7 w-7 text-primary" />
            <p className="mt-5 text-sm font-black text-primary-dark">{story.metric}</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{story.title}</h2>
            <p className="mt-4 leading-7 text-slate-600">{story.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
