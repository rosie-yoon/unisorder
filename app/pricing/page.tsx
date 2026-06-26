import Link from "next/link";
import { ArrowRight, CheckCircle2, CirclePlus, HeartHandshake, Star, TrendingUp, Zap } from "lucide-react";

const commonPlanFeatures = [
  "통합 대시보드",
  "실시간 주문 수집",
  "통합 주문 처리",
  "한글 송장 출력",
  "쇼피 프리디클레어",
  "수동 재고 차감 발주리스트",
  "운영 분석 리포트",
];

const proPlanFeatures = [
  "통합 대시보드",
  "실시간 주문 수집",
  "통합 주문 처리",
  "한글 송장 출력",
  "쇼피 프리디클레어",
  "실시간 재고 연동",
  "SKU 통합 재고 관리",
  "자동 재고 차감 발주리스트",
  "운영 분석 리포트",
  "부가세신고자료 원클릭 다운로드",
];

const proOnlyPlanFeatures = [
  "실시간 재고 연동",
  "SKU 통합 재고 관리",
  "자동 재고 차감 발주리스트",
  "부가세신고자료 원클릭 다운로드",
];

const plans = [
  {
    name: "Free",
    price: "무료",
    description: "쇼피 입문 셀러를 위한 플랜",
    platform: "Shopee 8개국",
    orderLimit: "200건/월",
    icon: Star,
    iconTone: "bg-sky-50 text-sky-600 ring-sky-100",
    features: commonPlanFeatures,
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
    features: commonPlanFeatures,
  },
  {
    name: "Pro",
    price: "월 150,000원",
    vat: "VAT 별도",
    description: "다음 단계로 도약하는 셀러를 위한 플랜",
    platform: "Shopee 8개국",
    orderLimit: "무제한",
    icon: TrendingUp,
    iconTone: "bg-blue-50 text-blue-600 ring-blue-100",
    features: proPlanFeatures,
  },
];

export default function PricingPage() {
  return (
    <main className="shell py-16">
      <div className="mx-auto mb-10 max-w-4xl text-center">
        <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
          운영 효율화의 시작
          <br />
          유니스오더와 함께하세요
        </h1>
        <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">지금 성장 단계에 맞는 플랜을 선택하세요.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article key={plan.name} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ring-1 ${plan.iconTone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-slate-950">{plan.name}</h2>
                  <p className="mt-2 min-h-12 text-sm font-semibold leading-6 text-slate-600">{plan.description}</p>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-3xl font-black tracking-tight text-slate-950">{plan.price}</p>
                {plan.vat ? <p className="pb-1 text-sm font-bold text-slate-500">({plan.vat})</p> : null}
              </div>

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

              <div className="mt-6 flex-1 rounded-lg border border-slate-200 bg-white/80 p-4">
                <p className="text-sm font-black text-slate-800">포함 기능</p>
                <ul className="mt-3 space-y-2.5">
                  {plan.features.map((feature) => {
                    const isProOnly = plan.name === "Pro" && proOnlyPlanFeatures.includes(feature);
                    const FeatureIcon = isProOnly ? CirclePlus : CheckCircle2;

                    return (
                      <li key={feature} className="flex items-start gap-2.5 text-sm font-bold leading-5 text-slate-700">
                        <FeatureIcon className={`mt-0.5 h-4 w-4 shrink-0 ${isProOnly ? "text-blue-500" : "text-primary"}`} />
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <Link
                href="https://unisorder.com/login"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-primary/40 hover:text-primary"
              >
                시작하기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8">
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
    </main>
  );
}
