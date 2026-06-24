import Link from "next/link";
import { Check, Crown, Rocket, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "무료",
    description: "초기 셀러가 운영 흐름을 확인하기 위한 플랜",
    icon: Star,
    features: ["기본 주문 확인", "기본 가이드 열람", "단일 사용자"],
  },
  {
    name: "Basic",
    price: "월 49,000원",
    description: "마켓플레이스 주문과 한글 송장을 본격적으로 관리하는 플랜",
    icon: Check,
    highlight: true,
    features: ["Shopee·Lazada 주문 관리", "한글 커스텀 송장", "SKU 관리", "이메일 지원"],
  },
  {
    name: "Pro",
    price: "월 109,000원",
    description: "재고와 마진까지 함께 관리하는 성장 셀러용 플랜",
    icon: Crown,
    features: ["Basic 전체 기능", "통합 재고 관리", "마진 분석", "서브 계정"],
  },
  {
    name: "Business",
    price: "문의",
    description: "팀 운영, 대량 주문, 맞춤 컨설팅이 필요한 셀러용 플랜",
    icon: Rocket,
    features: ["Pro 전체 기능", "팀 운영 지원", "SKU 컨설팅", "우선 지원"],
  },
];

export default function PricingPage() {
  return (
    <main className="shell py-14">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Pricing</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">운영 규모에 맞춰 시작하세요</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          1차 MVP에서는 요금제 문구를 구조화해 두고, 어드민에서 금액과 기능표를 관리할 수 있도록 확장합니다.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article
              key={plan.name}
              className={`rounded-lg border bg-white p-6 shadow-sm ${
                plan.highlight ? "border-primary ring-4 ring-primary/10" : "border-border"
              }`}
            >
              <Icon className="h-7 w-7 text-primary" />
              <h2 className="mt-5 text-xl font-black text-slate-950">{plan.name}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{plan.description}</p>
              <p className="mt-6 text-2xl font-black text-slate-950">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="https://app.unisorder.com/login"
                className="mt-6 inline-flex w-full justify-center rounded-md bg-primary px-4 py-3 text-sm font-black text-white transition hover:bg-primary-dark"
              >
                시작하기
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
