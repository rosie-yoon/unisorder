"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  Download,
  FileText,
  Gift,
  Globe2,
  PackageCheck,
  ReceiptText,
  RefreshCw,
  Truck,
} from "lucide-react";

const featureTabs = [
  {
    icon: ClipboardList,
    label: "통합 대시보드",
    title: (
      <>
        2개 플랫폼 8개국 주문을
        <br />
        한 화면에서
      </>
    ),
    description: (
      <>
        국가별·샵별로 흩어진 주문 현황을 한 번에 확인하고
        <br />
        오늘 처리할 업무 흐름을 정리합니다.
      </>
    ),
    tabActive: "border-sky-300 bg-sky-50 text-sky-700 shadow-[0_10px_24px_rgba(14,165,233,0.14)]",
    iconTone: "text-sky-600",
    bullets: [
      { text: "Shopee·Lazada 통합 현황 조회", icon: Globe2, tone: "bg-sky-50 text-sky-600 ring-sky-100" },
      { text: "발송 대기·처리중·취소·반품 상태 확인", icon: RefreshCw, tone: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
      { text: "TOP 5 판매 상품 현황 확인", icon: Gift, tone: "bg-amber-50 text-amber-600 ring-amber-100" },
    ],
  },
  {
    icon: PackageCheck,
    label: "통합 주문처리",
    title: "통합 페이지에서 반복 확인 없이 주문 처리 흐름을 빠르게",
    description: "상품 확인, SKU 매칭, 송장 출력처럼 반복 업무를 한 화면에서 이어갑니다.",
    tabActive: "border-emerald-300 bg-emerald-50 text-emerald-700 shadow-[0_10px_24px_rgba(16,185,129,0.14)]",
    iconTone: "text-emerald-600",
    bullets: [
      { text: "실시간 주문 수집과 상태 동기화", icon: RefreshCw, tone: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
      { text: "상품·옵션 기준 주문 확인", icon: PackageCheck, tone: "bg-sky-50 text-sky-600 ring-sky-100" },
      { text: "처리 누락과 중복 작업 감소", icon: ClipboardList, tone: "bg-violet-50 text-violet-600 ring-violet-100" },
    ],
  },
  {
    icon: FileText,
    label: "한글 송장",
    title: (
      <>
        외국어 상품 정보를
        <br />
        한글로 정확하게
      </>
    ),
    description: (
      <>
        8개국 언어로 표시되는 상품명과 옵션을 발주·포장 단계에서
        <br />
        확인하기 쉬운 형태로 정리합니다.
      </>
    ),
    tabActive: "border-violet-300 bg-violet-50 text-violet-700 shadow-[0_10px_24px_rgba(139,92,246,0.14)]",
    iconTone: "text-violet-600",
    bullets: [
      { text: "한글 송장 출력", icon: FileText, tone: "bg-violet-50 text-violet-600 ring-violet-100" },
      { text: "상품명·옵션 확인 시간 단축", icon: RefreshCw, tone: "bg-sky-50 text-sky-600 ring-sky-100" },
      { text: "오포장과 오출고 리스크 감소", icon: Truck, tone: "bg-rose-50 text-rose-600 ring-rose-100" },
    ],
  },
  {
    icon: Boxes,
    label: "재고·발주",
    title: "빠르고 정확한 발주와 입고관리",
    description: "SKU 기준으로 주문과 재고 흐름을 연결해 반복 발주와 입고 현황을 점검하여 효율화를 높입니다.",
    tabActive: "border-amber-300 bg-amber-50 text-amber-700 shadow-[0_10px_24px_rgba(245,158,11,0.14)]",
    iconTone: "text-amber-600",
    bullets: [
      { text: "SKU 기반 재고 관리", icon: Boxes, tone: "bg-amber-50 text-amber-600 ring-amber-100" },
      { text: "재고 부족 상품 확인", icon: PackageCheck, tone: "bg-rose-50 text-rose-600 ring-rose-100" },
      { text: "발주 판단에 필요한 수량 정리", icon: ClipboardList, tone: "bg-sky-50 text-sky-600 ring-sky-100" },
    ],
  },
  {
    icon: BarChart3,
    label: "마진 분석",
    title: "상품별 실제 수익성을 바로 확인",
    description: (
      <>
        매입가, 판매가, 정산 흐름을 연결해
        <br />
        상품의 수익 및 마진을 빠르게 파악합니다.
      </>
    ),
    tabActive: "border-indigo-300 bg-indigo-50 text-indigo-700 shadow-[0_10px_24px_rgba(99,102,241,0.14)]",
    iconTone: "text-indigo-600",
    bullets: [
      { text: "상품별 마진 추적", icon: BarChart3, tone: "bg-indigo-50 text-indigo-600 ring-indigo-100" },
      { text: "환율·매입가 기준 수익 확인", icon: RefreshCw, tone: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
      { text: "판매가격 점검 상품 구분", icon: ReceiptText, tone: "bg-amber-50 text-amber-600 ring-amber-100" },
    ],
  },
  {
    icon: ReceiptText,
    label: "부가세신고 자료",
    title: (
      <>
        8개국 주문 및 정산내역
        <br />
        원클릭 다운로드
      </>
    ),
    description: (
      <>
        부가세신고자료와 소포수령증 발급에 필요한 문서를
        <br />
        클릭 한 번으로 내려받습니다.
      </>
    ),
    tabActive: "border-rose-300 bg-rose-50 text-rose-700 shadow-[0_10px_24px_rgba(244,63,94,0.14)]",
    iconTone: "text-rose-600",
    bullets: [
      { text: "완료 주문내역 엑셀 파일 제공", icon: Download, tone: "bg-emerald-50 text-emerald-600 ring-emerald-100" },
      { text: "정산 내역 PDF 파일 제공", icon: FileText, tone: "bg-rose-50 text-rose-600 ring-rose-100" },
    ],
  },
];

export function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = featureTabs[activeIndex];

  return (
    <div className="mt-8 md:mt-10">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-2 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
        <div className="grid min-w-[760px] grid-cols-6 gap-2">
          {featureTabs.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={feature.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`focus-ring flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border px-3 py-3 text-sm font-black transition ${
                  isActive ? feature.tabActive : "border-transparent bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? feature.iconTone : "text-slate-500"}`} />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
        <div className="break-keep">
          <h3 className="text-2xl font-black leading-tight text-slate-950 md:text-4xl">{active.title}</h3>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600 md:text-lg">{active.description}</p>

          <div className="mt-7 grid gap-4">
            {active.bullets.map((bullet) => {
              const BulletIcon = bullet.icon;
              return (
                <div key={bullet.text} className="flex items-start gap-3">
                  <div className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md shadow-sm ring-1 ${bullet.tone}`}>
                    <BulletIcon className="h-4 w-4" />
                  </div>
                  <p className="text-base font-bold leading-7 text-slate-700">{bullet.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-primary/10 bg-[linear-gradient(180deg,#f8fffb_0%,#eef8f5_100%)] p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
          <div className="relative overflow-hidden rounded-lg border border-white bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
            <Image
              src="/product/unisorder-dashboard.png"
              alt={`${active.label} 기능 화면 예시`}
              width={1252}
              height={1269}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
