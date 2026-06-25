import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  CheckCircle2,
  ClipboardList,
  FileText,
  Globe2,
  HeartHandshake,
  HelpCircle,
  Languages,
  ReceiptText,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { FeatureShowcase } from "@/components/feature-showcase";
import { GrowthStories } from "@/components/growth-stories";
import { getFaqs } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const heroHighlights = [
  {
    icon: ClipboardList,
    text: "2개 플랫폼 8개국 통합 대시보드",
  },
  {
    icon: FileText,
    text: "실시간 주문 처리 & 한글 송장 출력",
  },
  {
    icon: BarChart3,
    text: "실시간 주문 추적 & 수익 분석",
  },
  {
    icon: Boxes,
    text: "스마트 재고 & 발주 관리",
  },
  {
    icon: ReceiptText,
    text: "부가세신고자료 & 소포수령증 발급 자료 원클릭 제공",
  },
];

const heroProofs = [
  "해외 역직구 전문 셀러들의 실운영 노하우를 담은 크로스보더 셀러 플랫폼",
];

const problemCards = [
  {
    title: "오늘 처리할 주문 한눈에 안 보임",
    body: (
      <>
        국가별·샵별 주문을 따로 열어보느라
        <br />
        처리 흐름이 계속 끊겨요.
      </>
    ),
    icon: Globe2,
    tone: "bg-sky-50 text-sky-600 ring-sky-100",
    accent: "from-sky-400 to-cyan-300",
  },
  {
    title: "상품명은 외국어, 실수는 내 책임",
    body: (
      <>
        8개국 언어로 표시되는 상품명과 옵션을
        <br />
        매번 확인하며 발주·포장해야 해요.
      </>
    ),
    icon: Languages,
    tone: "bg-violet-50 text-violet-600 ring-violet-100",
    accent: "from-violet-400 to-fuchsia-300",
  },
  {
    title: "같은 제품 오늘만 2번째 주문",
    body: (
      <>
        통합으로 주문 확인이 안 되어 같은 제품을
        <br />
        하루에 여러 번 주문하게 됩니다.
      </>
    ),
    icon: ShoppingCart,
    tone: "bg-amber-50 text-amber-600 ring-amber-100",
    accent: "from-amber-400 to-orange-300",
  },
];

const solutionMetrics = [
  {
    value: "72%",
    label: "발주시간 감소",
  },
  {
    value: "48%",
    label: "재고 운영비용 절감",
  },
];

const pricingPreview = [
  {
    name: "Free",
    price: "무료",
    description: "쇼피 입문 셀러를 위한 플랜",
    platform: "Shopee 8개국",
    orderLimit: "200건/월",
    icon: Star,
    iconTone: "bg-sky-50 text-sky-600 ring-sky-100",
    features: ["통합 대시보드", "주문 수집", "기본 운영 흐름 확인"],
  },
  {
    name: "Basic",
    price: "월 70,000원",
    vat: "VAT 별도",
    description: "본격적으로 성장하는 셀러를 위한 플랜",
    platform: "Shopee 8개국",
    orderLimit: "무제한",
    icon: Zap,
    iconTone: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    features: ["통합 주문처리", "한글 송장 출력", "주문 수집 무제한"],
  },
  {
    name: "Pro",
    price: "월 150,000원",
    vat: "VAT 별도",
    description: "다음 단계로 도약하는 셀러를 위한 플랜",
    platform: "Shopee 8개국",
    orderLimit: "무제한",
    icon: TrendingUp,
    iconTone: "bg-violet-50 text-violet-600 ring-violet-100",
    features: ["재고·발주 관리", "마진 분석", "운영 자료 다운로드"],
  },
];

export default async function HomePage() {
  const faqs = await getFaqs({ publishedOnly: true, homeOnly: true });

  return (
    <main>
      <section id="home" className="scroll-mt-20 overflow-hidden bg-white">
        <div className="shell py-9 text-center md:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-sm font-bold text-primary-dark md:mb-6">
              <Sparkles className="h-4 w-4" />
              Shopee·Lazada 2개 플랫폼 8개국 운영 통합
            </div>
            <p className="text-lg font-black text-slate-500 md:text-xl">
              주문은 늘어나는데, 관리 시간은 줄어들지 않으시죠?
            </p>
            <h1 className="mx-auto mt-4 max-w-5xl text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:mt-6 md:text-6xl">
              <span className="block">주문 처리에</span>
              <span className="block text-primary">운영 시간을 빼앗기지 마세요</span>
            </h1>
            <p className="mx-auto mt-6 max-w-4xl text-lg font-bold leading-8 text-slate-700 md:mt-7 md:text-xl">
              <span className="box-decoration-clone rounded-md bg-gradient-to-r from-primary-soft via-white to-accent-soft px-2 py-1 text-primary-dark shadow-[inset_0_-10px_0_rgba(25,185,127,0.10)]">
                복잡한 크로스보더 운영, 주문부터 재고, 마진까지 한곳에서 관리하세요.
              </span>
            </p>

            <div className="mx-auto mt-7 max-w-5xl rounded-lg border border-primary/15 bg-gradient-to-br from-white via-white to-primary-soft/45 p-3 text-left shadow-sm md:mt-9 md:p-4">
              <div className="grid gap-2 md:grid-cols-12 md:gap-3">
                {heroHighlights.map((item, index) => {
                  const Icon = item.icon;
                  const layoutClass = [
                    "md:col-span-4",
                    "md:col-span-4",
                    "md:col-span-4",
                    "md:col-start-3 md:col-span-4",
                    "md:col-span-5",
                  ][index];
                  return (
                    <div
                      key={item.text}
                      className={`flex items-center gap-3 rounded-md border border-border/70 bg-white/82 px-3 py-3 shadow-[0_8px_24px_rgba(7,138,99,0.05)] ${layoutClass}`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-6 text-slate-800">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:mt-10">
              <Link
                href="https://app.unisorder.com/login"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary via-[#18c789] to-[#34d399] px-8 py-3.5 text-lg font-black text-white shadow-[0_20px_25px_-5px_rgba(7,138,99,0.32),0_8px_10px_-6px_rgba(7,138,99,0.32)] transition hover:-translate-y-0.5 hover:from-primary-dark hover:via-primary hover:to-[#27d697] sm:min-w-60"
              >
                무료로 시작하기
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/guide"
                className="focus-ring inline-flex items-center justify-center rounded-md border border-border bg-white px-8 py-3.5 text-lg font-black text-slate-700 transition hover:border-primary/40 hover:text-primary sm:min-w-60"
              >
                이용 가이드 보기
              </Link>
            </div>

            <div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left text-lg font-semibold leading-8 text-slate-600 md:mt-10 md:text-center md:text-xl">
              {heroProofs.map((proof) => (
                <div key={proof} className="flex items-start justify-center gap-2">
                  <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-primary md:h-6 md:w-6" />
                  <span>{proof}</span>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-9 max-w-6xl rounded-lg border border-primary/15 bg-gradient-to-br from-primary-soft via-white to-accent-soft p-2 shadow-[0_28px_80px_rgba(15,23,42,0.14)] md:mt-12 md:p-4">
              <div className="rounded-md border border-white bg-white p-1.5 shadow-[0_18px_55px_rgba(7,138,99,0.16)] md:p-2">
                <Image
                  src="/product/unisorder-dashboard.png"
                  alt="UnisOrder 통합 대시보드 화면"
                  width={1252}
                  height={1269}
                  className="h-auto w-full rounded-md border border-slate-100 object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="break-keep overflow-hidden border-y border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf9_46%,#ffffff_100%)] py-16 md:py-24">
        <div className="shell">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-balance text-3xl font-black leading-tight text-slate-950 md:text-4xl">
              혹시 이런 고민으로
              <br className="hidden sm:block" /> 밤을 지새우고 계신가요?
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-6xl rounded-lg border border-primary/10 bg-white/78 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.07)] backdrop-blur md:mt-12 md:p-4">
            <div className="grid gap-3 lg:grid-cols-3">
              {problemCards.map((problem) => {
                const Icon = problem.icon;
                return (
                  <article
                    key={problem.title}
                    className="relative overflow-hidden rounded-lg border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:min-h-68"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${problem.accent}`} />
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ring-1 ${problem.tone}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-[1.32rem] font-black leading-snug text-slate-950 lg:whitespace-nowrap lg:text-[1.18rem] xl:text-[1.32rem]">
                      {problem.title}
                    </h3>
                    <p className="mt-4 max-w-[28rem] text-base font-semibold leading-7 text-slate-600 lg:text-[0.95rem] lg:leading-7 xl:text-base">
                      {problem.body}
                    </p>
                  </article>
                );
              })}
            </div>

            <Link
              href="https://app.unisorder.com/login"
              className="focus-ring group mt-3 block rounded-lg border border-primary/15 bg-[radial-gradient(circle_at_50%_-30%,rgba(25,185,127,0.10),transparent_38%),linear-gradient(180deg,#ffffff_0%,#fbfefd_100%)] p-5 text-center shadow-[0_18px_45px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:-translate-y-0.5 hover:border-primary/30 md:mt-4 md:p-8"
            >
              <div className="mx-auto max-w-4xl">
                <p className="text-xl font-black text-primary-dark md:text-2xl">단순 반복 업무는 유니스오더에 맡기고</p>
                <p className="mt-2 text-base font-semibold leading-7 text-slate-600 md:text-lg">
                  셀러님은 제품 소싱과 마케팅에 더 집중하세요.
                </p>

                <div className="mx-auto mt-5 grid max-w-sm grid-cols-2 gap-3 text-center md:mt-6">
                  {solutionMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-md border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                      <p className="text-3xl font-black text-primary md:text-4xl">{metric.value}</p>
                      <p className="mt-1 text-xs font-black text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary via-[#18c789] to-[#34d399] px-7 py-4 text-base font-black text-white shadow-[0_18px_28px_-8px_rgba(7,138,99,0.38)] transition group-hover:from-primary-dark group-hover:via-primary group-hover:to-[#27d697] sm:w-auto sm:min-w-80 md:mt-6 md:text-lg">
                  지금 바로 고민 해결하러 가기
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="shell scroll-mt-20 pb-24 pt-16 md:pb-28">
        <div className="mb-8 text-center">
          <h2 className="bg-gradient-to-r from-[#056647] via-primary to-[#41d9a1] bg-clip-text text-3xl font-black text-transparent drop-shadow-[0_10px_24px_rgba(25,185,127,0.10)] md:text-4xl">
            글로벌 셀러들을 위한 올인원 솔루션
          </h2>
        </div>
        <FeatureShowcase />
      </section>

      <section id="stories" className="mt-6 scroll-mt-20 border-y border-primary/10 bg-[linear-gradient(180deg,#f7fbf9_0%,#ffffff_52%,#f8fbfa_100%)] py-20 md:mt-8 md:py-24">
        <div className="shell">
          <GrowthStories />
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 border-y border-border bg-slate-50 py-16">
        <div className="shell">
          <div className="mx-auto mb-12 max-w-5xl text-center">
            <h2 className="text-balance text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
              <span className="block bg-gradient-to-r from-primary via-[#28c98f] to-[#5ee6b3] bg-clip-text text-transparent">
                운영 효율화의 시작
              </span>
              <span className="block">유니스오더와 함께하세요</span>
            </h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-slate-500 md:text-2xl">
              지금 성장 단계에 맞는 플랜을 선택하세요.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {pricingPreview.map((plan) => (
              <article
                key={plan.name}
                className="relative rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]"
              >
                <div>
                  <p className="text-xl font-black text-slate-950">{plan.name}</p>
                </div>
                <div className="mt-6">
                  <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                    <h3 className="text-4xl font-black tracking-tight text-slate-950">{plan.price}</h3>
                    {plan.vat ? <span className="pb-1 text-sm font-bold text-slate-500">({plan.vat})</span> : null}
                  </div>
                </div>
                <p className="mt-5 min-h-14 text-base font-semibold leading-7 text-slate-600">{plan.description}</p>

                <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/80">
                  <div className="border-r border-slate-200 p-3">
                    <p className="text-xs font-black text-slate-500">지원 플랫폼</p>
                    <p className="mt-1 text-sm font-black text-slate-950">{plan.platform}</p>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-black text-slate-500">주문수집</p>
                    <p className="mt-1 text-sm font-black text-slate-950">{plan.orderLimit}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-dashed border-slate-200 bg-white/70 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-black text-slate-800">플랜별 포함 기능</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">상세 기능 구성은 다음 단계에서 확정됩니다.</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="https://app.unisorder.com/login"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-primary/40 hover:text-primary"
                >
                  시작하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-950 md:text-3xl">Lazada 추가</p>
                <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-slate-600">
                  Lazada 옵션을 추가해 사용 중인 플랜과 동일한 기능으로 Lazada를 연동할 수 있습니다.
                  <br />
                  유료 플랜(Basic/Pro) 구독자 전용 서비스
                </p>
              </div>
            </div>
            <div className="mt-5 shrink-0 border-t border-slate-100 pt-4 md:mt-0 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-500">Add-on</p>
              <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">월 30,000원</p>
              <p className="mt-1 text-sm font-bold text-slate-500">(VAT 별도)</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-border bg-white py-16">
        <div className="shell">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-black text-slate-950">자주 묻는 질문</h2>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
            {faqs.map((faq) => (
              <details key={faq.id} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center gap-3 text-lg font-black text-slate-950">
                  <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                  {faq.question}
                </summary>
                <p className="mt-3 pl-8 leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
