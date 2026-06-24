import { BarChart3, Boxes, FileSpreadsheet, FileText, PackageCheck, RefreshCcw } from "lucide-react";

const featureGroups = [
  { icon: PackageCheck, title: "주문 통합 관리", body: "Shopee·Lazada 주문 상태와 처리 흐름을 한 화면에서 확인합니다." },
  { icon: FileText, title: "한글 송장 출력", body: "작업자가 바로 이해할 수 있는 송장 포맷으로 피킹 시간을 줄입니다." },
  { icon: Boxes, title: "SKU/재고 관리", body: "상품 옵션과 재고를 SKU 기준으로 연결하고 부족 재고를 감지합니다." },
  { icon: BarChart3, title: "마진 분석", body: "매입가, 배송비, 수수료를 반영해 실제 수익성을 확인합니다." },
  { icon: RefreshCcw, title: "플랫폼 동기화", body: "마켓플레이스 운영 데이터를 유니스오더 업무 흐름으로 가져옵니다." },
  { icon: FileSpreadsheet, title: "운영 데이터 정리", body: "엑셀에 흩어진 반복 업무를 구조화된 데이터로 전환합니다." },
];

export default function FeaturesPage() {
  return (
    <main className="shell py-14">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-primary">Features</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">글로벌 셀러 운영에 필요한 핵심 기능</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          주문 처리, 송장 출력, SKU 재고, 정산과 마진 분석까지 실제 운영 흐름을 기준으로 기능을 구성합니다.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featureGroups.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-black text-slate-950">{feature.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{feature.body}</p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
