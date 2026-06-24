"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, ClipboardCheck, PackageCheck } from "lucide-react";

const stories = [
  {
    label: "주문 처리",
    title: "국가별 주문 확인 시간을 줄이고 출고 흐름을 통일한 사례",
    seller: "Shopee 8개국 운영 셀러",
    metric: "35%",
    metricLabel: "출고 준비 시간 감소",
    before: "국가별·샵별 주문을 따로 확인해 당일 처리 우선순위를 잡기 어려웠습니다.",
    after: "통합 대시보드에서 주문 상태와 TOP 판매 상품을 함께 보며 처리 흐름을 먼저 정리했습니다.",
    icon: ClipboardCheck,
    tone: "from-emerald-400 to-teal-300",
  },
  {
    label: "재고·발주",
    title: "반복 발주를 줄이고 SKU 기준으로 입고 현황을 관리한 사례",
    seller: "상품 수가 빠르게 늘어난 셀러",
    metric: "48%",
    metricLabel: "재고 운영비용 절감",
    before: "같은 제품을 하루에도 여러 번 확인하고, 이미 보유한 상품을 다시 주문하는 일이 반복됐습니다.",
    after: "SKU 기준으로 주문과 재고를 연결해 부족 상품과 발주 수량을 한 화면에서 점검했습니다.",
    icon: PackageCheck,
    tone: "from-sky-400 to-blue-300",
  },
  {
    label: "마진 분석",
    title: "잘 팔리는 상품과 실제 남는 상품을 구분한 사례",
    seller: "마진 점검이 필요한 성장 셀러",
    metric: "72%",
    metricLabel: "발주 판단 시간 감소",
    before: "판매량은 보였지만 매입가, 환율, 정산 흐름이 흩어져 실제 수익성을 바로 보기 어려웠습니다.",
    after: "상품별 마진과 판매가격 점검 대상을 분리해 소싱과 가격 조정의 우선순위를 잡았습니다.",
    icon: BarChart3,
    tone: "from-violet-400 to-fuchsia-300",
  },
];

export function GrowthStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = stories[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? stories.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === stories.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
      <div>
        <h2 className="text-balance text-3xl font-black leading-tight text-slate-950 md:text-4xl">
          운영이 정리되면
          <br />
          성장 속도도 달라집니다
        </h2>
        <p className="mt-4 max-w-xl text-lg font-semibold leading-8 text-slate-600">
          주문 처리, 재고 대응, 마진 점검처럼 매일 반복되는 운영 지표를 중심으로 성장사례를 보여줍니다.
        </p>

        <div className="mt-7 flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrevious}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary"
            aria-label="이전 성장사례 보기"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-white text-slate-700 shadow-sm transition hover:border-primary/35 hover:text-primary"
            aria-label="다음 성장사례 보기"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="ml-2 flex items-center gap-2">
            {stories.map((story, index) => (
              <button
                key={story.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  activeIndex === index ? "w-8 bg-primary" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`${story.label} 사례 보기`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-primary/15 bg-[linear-gradient(135deg,#ffffff_0%,#f8fffb_48%,#eefbf6_100%)] p-3 shadow-[0_26px_70px_rgba(15,23,42,0.08)]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {stories.map((story) => {
            const Icon = story.icon;
            const isActive = story.label === activeStory.label;

            return (
              <article key={story.label} className="min-w-full p-2 md:p-4" aria-hidden={!isActive}>
                <div className="relative overflow-hidden rounded-lg border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:p-8">
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${story.tone}`} />
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary-dark ring-1 ring-primary/15">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-primary-dark">{story.label}</p>
                          <p className="text-xs font-bold text-slate-500">{story.seller}</p>
                        </div>
                      </div>
                      <h3 className="mt-6 text-2xl font-black leading-tight tracking-tight text-slate-950 md:text-3xl">
                        {story.title}
                      </h3>
                    </div>

                    <div className="shrink-0 rounded-lg border border-primary/15 bg-primary-soft/60 px-5 py-4 text-center">
                      <p className="text-4xl font-black text-primary-dark md:text-5xl">{story.metric}</p>
                      <p className="mt-1 text-xs font-black text-slate-600">{story.metricLabel}</p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3 md:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Before</p>
                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{story.before}</p>
                    </div>
                    <div className="rounded-lg border border-primary/15 bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">After</p>
                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{story.after}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
