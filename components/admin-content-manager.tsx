"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, FileText, HelpCircle, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import type { FaqItem, GuideRecord } from "@/lib/content-store";

type AdminContent = {
  faqs: FaqItem[];
  guides: GuideRecord[];
};

type FaqForm = {
  id?: string;
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
  showOnHome: boolean;
};

type GuideForm = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  iconName: string;
  sortOrder: number;
  isPublished: boolean;
  blocksText: string;
};

const emptyFaq: FaqForm = {
  question: "",
  answer: "",
  sortOrder: 999,
  isPublished: true,
  showOnHome: false,
};

const sampleBlocks = [
  {
    type: "overview",
    title: "먼저 확인할 것",
    body: "이 기능을 사용하기 전에 확인해야 할 내용을 정리합니다.",
    cards: [
      {
        title: "준비 항목",
        body: "운영자가 미리 확인해야 하는 조건을 적습니다.",
      },
    ],
  },
  {
    type: "steps",
    title: "단계별 사용 방법",
    items: [
      {
        title: "첫 번째 단계",
        body: "관리 화면에서 이동해야 할 메뉴와 클릭해야 할 버튼을 적습니다.",
        bullets: ["메뉴 이동", "상태 확인", "저장"],
      },
    ],
  },
  {
    type: "callout",
    tone: "tip",
    title: "운영 팁",
    body: "셀러가 실수하기 쉬운 부분이나 권장 설정을 안내합니다.",
  },
];

const emptyGuide: GuideForm = {
  slug: "",
  title: "",
  category: "시작하기",
  description: "",
  duration: "약 5분",
  iconName: "file",
  sortOrder: 999,
  isPublished: true,
  blocksText: JSON.stringify(sampleBlocks, null, 2),
};

const guideIcons = [
  { value: "file", label: "문서" },
  { value: "link", label: "연동" },
  { value: "receipt", label: "송장" },
  { value: "calculator", label: "마진" },
  { value: "boxes", label: "재고" },
  { value: "package", label: "패키지" },
];

async function adminFetch<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      "x-admin-token": token,
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(payload.error || "요청을 처리할 수 없습니다.");
  }

  return payload;
}

function toFaqForm(faq: FaqItem): FaqForm {
  return { ...faq };
}

function toGuideForm(guide: GuideRecord): GuideForm {
  return {
    ...guide,
    blocksText: JSON.stringify(guide.blocks, null, 2),
  };
}

export function AdminContentManager() {
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState<"faqs" | "guides">("faqs");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [guides, setGuides] = useState<GuideRecord[]>([]);
  const [faqForm, setFaqForm] = useState<FaqForm>(emptyFaq);
  const [guideForm, setGuideForm] = useState<GuideForm>(emptyGuide);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("어드민 토큰을 입력하고 데이터를 불러오세요. 개발 환경 기본 토큰은 dev-admin 입니다.");

  const isEditingFaq = Boolean(faqForm.id);
  const isEditingGuide = Boolean(guideForm.id);

  const contentCountLabel = useMemo(() => `${faqs.length}개 FAQ · ${guides.length}개 가이드`, [faqs.length, guides.length]);

  useEffect(() => {
    const savedToken = window.localStorage.getItem("unisorder-admin-token") || (process.env.NODE_ENV === "development" ? "dev-admin" : "");
    if (savedToken) setToken(savedToken);
  }, []);

  async function loadContent(nextToken = token) {
    setIsLoading(true);
    setMessage("관리 데이터를 불러오는 중입니다.");
    try {
      window.localStorage.setItem("unisorder-admin-token", nextToken);
      const [faqPayload, guidePayload] = await Promise.all([
        adminFetch<{ faqs: FaqItem[] }>("/api/admin/faqs", nextToken),
        adminFetch<{ guides: GuideRecord[] }>("/api/admin/guides", nextToken),
      ]);
      setFaqs(faqPayload.faqs);
      setGuides(guidePayload.guides);
      setMessage("관리 데이터를 불러왔습니다.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "관리 데이터를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  async function submitFaq(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const body = JSON.stringify(faqForm);
      if (isEditingFaq && faqForm.id) {
        await adminFetch(`/api/admin/faqs/${faqForm.id}`, token, { method: "PUT", body });
        setMessage("FAQ를 수정했습니다.");
      } else {
        await adminFetch("/api/admin/faqs", token, { method: "POST", body });
        setMessage("FAQ를 등록했습니다.");
      }
      setFaqForm(emptyFaq);
      await loadContent();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "FAQ 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteSelectedFaq() {
    if (!faqForm.id || !window.confirm("선택한 FAQ를 삭제할까요?")) return;
    setIsLoading(true);
    try {
      await adminFetch(`/api/admin/faqs/${faqForm.id}`, token, { method: "DELETE" });
      setFaqForm(emptyFaq);
      setMessage("FAQ를 삭제했습니다.");
      await loadContent();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "FAQ 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  async function submitGuide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const guidePayload = {
        ...guideForm,
        blocks: JSON.parse(guideForm.blocksText) as unknown,
      };
      const body = JSON.stringify(guidePayload);
      if (isEditingGuide && guideForm.id) {
        await adminFetch(`/api/admin/guides/${guideForm.id}`, token, { method: "PUT", body });
        setMessage("이용가이드를 수정했습니다.");
      } else {
        await adminFetch("/api/admin/guides", token, { method: "POST", body });
        setMessage("이용가이드를 등록했습니다.");
      }
      setGuideForm(emptyGuide);
      await loadContent();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "이용가이드 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteSelectedGuide() {
    if (!guideForm.id || !window.confirm("선택한 이용가이드를 삭제할까요?")) return;
    setIsLoading(true);
    try {
      await adminFetch(`/api/admin/guides/${guideForm.id}`, token, { method: "DELETE" });
      setGuideForm(emptyGuide);
      setMessage("이용가이드를 삭제했습니다.");
      await loadContent();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "이용가이드 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
          <p className="text-sm font-black text-slate-500">관리 토큰</p>
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            className="mt-3 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-primary"
            placeholder="dev-admin"
            type="password"
          />
          <button
            type="button"
            onClick={() => loadContent()}
            disabled={isLoading || !token}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-black text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" />
            데이터 불러오기
          </button>
          <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">{contentCountLabel}</p>
        </div>

        <div className="rounded-lg border border-border bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("faqs")}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-3 text-left text-sm font-black ${
              activeTab === "faqs" ? "bg-primary-soft text-primary-dark" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            자주 묻는 질문
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("guides")}
            className={`mt-1 flex w-full items-center gap-2 rounded-md px-3 py-3 text-left text-sm font-black ${
              activeTab === "guides" ? "bg-primary-soft text-primary-dark" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FileText className="h-4 w-4" />
            이용가이드
          </button>
        </div>

        <div className="rounded-lg border border-primary/15 bg-primary-soft/60 p-4 text-sm font-semibold leading-6 text-primary-dark">
          {message}
        </div>
      </aside>

      {activeTab === "faqs" ? (
        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-slate-950">FAQ 목록</h2>
              <button
                type="button"
                onClick={() => setFaqForm(emptyFaq)}
                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-primary/40 hover:text-primary"
              >
                <Plus className="h-4 w-4" />
                새 FAQ
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {faqs.map((faq) => (
                <button
                  key={faq.id}
                  type="button"
                  onClick={() => setFaqForm(toFaqForm(faq))}
                  className={`w-full rounded-md border p-4 text-left transition ${
                    faqForm.id === faq.id ? "border-primary bg-primary-soft/60" : "border-border bg-white hover:border-primary/30"
                  }`}
                >
                  <p className="text-sm font-black text-slate-950">{faq.question}</p>
                  <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">{faq.answer}</p>
                  <p className="mt-3 text-xs font-black text-slate-400">
                    순서 {faq.sortOrder} · {faq.isPublished ? "공개" : "비공개"} · {faq.showOnHome ? "홈 노출" : "FAQ 페이지"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submitFaq} className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">{isEditingFaq ? "FAQ 수정" : "FAQ 등록"}</h2>
            <label className="mt-5 block text-sm font-black text-slate-700">
              질문
              <input
                value={faqForm.question}
                onChange={(event) => setFaqForm((form) => ({ ...form, question: event.target.value }))}
                className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary"
                required
              />
            </label>
            <label className="mt-4 block text-sm font-black text-slate-700">
              답변
              <textarea
                value={faqForm.answer}
                onChange={(event) => setFaqForm((form) => ({ ...form, answer: event.target.value }))}
                className="mt-2 min-h-32 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold leading-6 outline-none focus:border-primary"
                required
              />
            </label>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <label className="block text-sm font-black text-slate-700">
                노출 순서
                <input
                  value={faqForm.sortOrder}
                  onChange={(event) => setFaqForm((form) => ({ ...form, sortOrder: Number(event.target.value) }))}
                  className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary"
                  type="number"
                />
              </label>
              <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-black text-slate-700 sm:mt-7">
                <input
                  checked={faqForm.isPublished}
                  onChange={(event) => setFaqForm((form) => ({ ...form, isPublished: event.target.checked }))}
                  type="checkbox"
                />
                공개
              </label>
              <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-black text-slate-700 sm:mt-7">
                <input
                  checked={faqForm.showOnHome}
                  onChange={(event) => setFaqForm((form) => ({ ...form, showOnHome: event.target.checked }))}
                  type="checkbox"
                />
                홈 노출
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="submit" disabled={isLoading} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-black text-white hover:bg-primary-dark disabled:opacity-50">
                <Save className="h-4 w-4" />
                {isEditingFaq ? "수정 저장" : "등록"}
              </button>
              {isEditingFaq ? (
                <button type="button" onClick={deleteSelectedFaq} disabled={isLoading} className="inline-flex items-center gap-2 rounded-md border border-red-200 px-4 py-2.5 text-sm font-black text-red-600 hover:bg-red-50 disabled:opacity-50">
                  <Trash2 className="h-4 w-4" />
                  삭제
                </button>
              ) : null}
            </div>
          </form>
        </section>
      ) : (
        <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-slate-950">이용가이드 목록</h2>
              <button
                type="button"
                onClick={() => setGuideForm(emptyGuide)}
                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-primary/40 hover:text-primary"
              >
                <Plus className="h-4 w-4" />
                새 가이드
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {guides.map((guide) => (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => setGuideForm(toGuideForm(guide))}
                  className={`w-full rounded-md border p-4 text-left transition ${
                    guideForm.id === guide.id ? "border-primary bg-primary-soft/60" : "border-border bg-white hover:border-primary/30"
                  }`}
                >
                  <p className="text-sm font-black text-slate-950">{guide.title}</p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{guide.description}</p>
                  <p className="mt-3 text-xs font-black text-slate-400">
                    /guide/{guide.slug} · {guide.category} · {guide.isPublished ? "공개" : "비공개"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submitGuide} className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">{isEditingGuide ? "이용가이드 수정" : "이용가이드 등록"}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-black text-slate-700">
                제목
                <input value={guideForm.title} onChange={(event) => setGuideForm((form) => ({ ...form, title: event.target.value }))} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary" required />
              </label>
              <label className="block text-sm font-black text-slate-700">
                주소 slug
                <input value={guideForm.slug} onChange={(event) => setGuideForm((form) => ({ ...form, slug: event.target.value }))} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary" placeholder="shopee-connection" />
              </label>
              <label className="block text-sm font-black text-slate-700">
                카테고리
                <input value={guideForm.category} onChange={(event) => setGuideForm((form) => ({ ...form, category: event.target.value }))} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary" required />
              </label>
              <label className="block text-sm font-black text-slate-700">
                예상 소요
                <input value={guideForm.duration} onChange={(event) => setGuideForm((form) => ({ ...form, duration: event.target.value }))} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary" required />
              </label>
              <label className="block text-sm font-black text-slate-700">
                아이콘
                <select value={guideForm.iconName} onChange={(event) => setGuideForm((form) => ({ ...form, iconName: event.target.value }))} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary">
                  {guideIcons.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-black text-slate-700">
                노출 순서
                <input value={guideForm.sortOrder} onChange={(event) => setGuideForm((form) => ({ ...form, sortOrder: Number(event.target.value) }))} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary" type="number" />
              </label>
            </div>
            <label className="mt-4 block text-sm font-black text-slate-700">
              설명
              <textarea value={guideForm.description} onChange={(event) => setGuideForm((form) => ({ ...form, description: event.target.value }))} className="mt-2 min-h-24 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold leading-6 outline-none focus:border-primary" required />
            </label>
            <label className="mt-4 flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-black text-slate-700">
              <input checked={guideForm.isPublished} onChange={(event) => setGuideForm((form) => ({ ...form, isPublished: event.target.checked }))} type="checkbox" />
              공개 상태로 노출
            </label>
            <label className="mt-4 block text-sm font-black text-slate-700">
              가이드 블록 JSON
              <textarea
                value={guideForm.blocksText}
                onChange={(event) => setGuideForm((form) => ({ ...form, blocksText: event.target.value }))}
                className="mt-2 min-h-[420px] w-full rounded-md border border-border bg-slate-950 px-3 py-3 font-mono text-xs leading-5 text-slate-50 outline-none focus:border-primary"
                spellCheck={false}
                required
              />
            </label>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="submit" disabled={isLoading} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-black text-white hover:bg-primary-dark disabled:opacity-50">
                <Save className="h-4 w-4" />
                {isEditingGuide ? "수정 저장" : "등록"}
              </button>
              {isEditingGuide ? (
                <>
                  <a href={`/guide/${guideForm.slug}`} target="_blank" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-black text-slate-700 hover:border-primary/40 hover:text-primary">
                    공개 페이지 보기
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button type="button" onClick={deleteSelectedGuide} disabled={isLoading} className="inline-flex items-center gap-2 rounded-md border border-red-200 px-4 py-2.5 text-sm font-black text-red-600 hover:bg-red-50 disabled:opacity-50">
                    <Trash2 className="h-4 w-4" />
                    삭제
                  </button>
                </>
              ) : null}
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
