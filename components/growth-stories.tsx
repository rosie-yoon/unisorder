"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const stories = [
  {
    title: "국가별 주문과 재고를 한곳에서 확인해 발주·포장 흐름을 단순화했습니다",
    seller: "6개국 12개샵 운영 셀러",
    nickname: "M 셀러님",
    quote: "샵이 늘어나면서 주문 확인보다 정리에 더 많은 시간이 들기 시작했어요.",
    quoteLines: ["샵이 늘어나면서 주문 확인보다", "정리에 더 많은 시간이 들기 시작했어요."],
    before: "샵별로 주문을 따로 확인하고 재고를 수기로 맞추느라 반복 정리에 많은 시간이 쓰였습니다.",
    after: "통합 화면에서 주문과 재고를 함께 확인하면서 상품 확장과 판매 전략에 더 집중할 수 있었습니다.",
    avatar: "👩‍💻",
    accent: "bg-emerald-400",
  },
  {
    title: "외부에서도 발주 타이밍을 놓치지 않고 주문 흐름을 유지했습니다",
    seller: "4년차 장기 운영 셀러",
    nickname: "J 셀러님",
    quote: "사무실에 있지 않아도 주문 흐름을 놓치지 않는 게 가장 컸어요.",
    quoteLines: ["사무실에 있지 않아도", "주문 흐름을 놓치지 않는 게 가장 컸어요."],
    before: "자리를 비우거나 여행 중일 때 발주 타이밍을 놓칠까 봐 개인 일정을 쉽게 잡기 어려웠습니다.",
    after: "외부에서도 주문 확인과 발주가 가능해져 장소에 얽매이지 않는 운영 구조를 만들 수 있었습니다.",
    avatar: "🧑‍💼",
    accent: "bg-sky-400",
  },
  {
    title: "한글 송장과 발주 시스템으로 주문이 늘어도 혼자 운영할 수 있었습니다",
    seller: "6개월차 투잡 셀러",
    nickname: "R 셀러님",
    quote: "주문이 늘어나는 건 좋은데, 혼자 감당할 수 있을지가 제일 걱정이었어요.",
    quoteLines: ["주문이 늘어나는 건 좋은데,", "혼자 감당할 수 있을지가 제일 걱정이었어요."],
    before: "외국어 상품명 확인과 송장 준비에 퇴근 후 시간이 빠르게 사라져 혼자 감당하기 어렵게 느껴졌습니다.",
    after: "한글 송장으로 상품 확인 시간을 줄이고 발주 흐름을 단순화해, 추가 인력 없이 투잡 운영을 이어갈 수 있었습니다.",
    avatar: "🙋‍♀️",
    accent: "bg-violet-400",
  },
];

export function GrowthStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeStory = stories[activeIndex];

  const goToNext = () => {
    setActiveIndex((current) => (current === stories.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current === stories.length - 1 ? 0 : current + 1));
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
      <div>
        <h2 className="text-balance text-3xl font-black leading-tight text-slate-950 md:text-4xl">
          운영이 단순해지면
          <br />
          성장할 공간이 생깁니다
        </h2>
        <p className="mt-4 max-w-xl text-lg font-semibold leading-8 text-slate-600">
          반복 업무에 묶여 있던 시간이 줄어들수록, 상품과 전략에 집중할 수 있는 시간은 늘어납니다.
        </p>

        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-1.5 px-1">
            {stories.map((story, index) => (
              <button
                key={story.seller}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition ${
                  activeIndex === index ? "w-7 bg-primary" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`${story.seller} 사례 보기`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goToNext}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-primary-soft hover:text-primary-dark"
            aria-label="다음 성장사례 보기"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {stories.map((story) => {
            const isActive = story.seller === activeStory.seller;

            return (
              <article key={story.seller} className="min-w-full" aria-hidden={!isActive}>
                <div className="relative flex min-h-[620px] flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.07)] md:min-h-[560px] md:p-8">
                  <div className="flex flex-1 flex-col gap-6">
                    <div className="min-w-0">
                      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                        <span className="shrink-0 text-4xl leading-none" aria-hidden="true">{story.avatar}</span>
                        <span className={`h-10 w-1 rounded-full ${story.accent}`} aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-400">{story.seller}</p>
                          <p className="mt-1 text-xl font-black leading-tight text-slate-950">{story.nickname}</p>
                        </div>
                      </div>
                      <blockquote className="relative mt-6 rounded-[1.35rem] rounded-bl-md bg-[#fff1b8] px-6 py-6 text-xl font-black leading-snug text-slate-950 shadow-[0_8px_0_rgba(245,158,11,0.16)] md:px-7 md:py-7 md:text-2xl">
                        <span className="sr-only">“{story.quote}”</span>
                        <span className="break-keep" aria-hidden="true">
                          {story.quoteLines.map((line, index) => (
                            <span key={line} className="block">
                              {index === 0 ? "“" : ""}
                              {line}
                              {index === story.quoteLines.length - 1 ? "”" : ""}
                            </span>
                          ))}
                        </span>
                        <span className="absolute -bottom-5 left-8 h-6 w-8 bg-[#fff1b8] [clip-path:polygon(0_0,100%_0,0_100%)]" aria-hidden="true" />
                      </blockquote>
                      <h3 className="mt-7 min-h-[82px] text-lg font-black leading-snug text-slate-900 md:min-h-[82px] md:text-[22px]">
                        {story.title}
                      </h3>
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
