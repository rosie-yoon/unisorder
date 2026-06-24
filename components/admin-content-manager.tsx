"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Eye,
  EyeOff,
  FileText,
  HelpCircle,
  Layers,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import type { FaqItem, GuideBlock, GuideRecord } from "@/lib/content-store";

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
  blocks: GuideBlock[];
};

type GuideBlockType = GuideBlock["type"];

const emptyFaq: FaqForm = {
  question: "",
  answer: "",
  sortOrder: 999,
  isPublished: true,
  showOnHome: false,
};

const sampleBlocks: GuideBlock[] = [
  {
    type: "overview",
    title: "먼저 확인할 것",
    body: "이 기능을 사용하기 전에 확인해야 할 내용을 정리합니다.",
    cards: [{ title: "준비 항목", body: "운영자가 미리 확인해야 하는 조건을 적습니다." }],
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
  blocks: sampleBlocks,
};

const guideIcons = [
  { value: "file", label: "문서" },
  { value: "link", label: "연동" },
  { value: "receipt", label: "송장" },
  { value: "calculator", label: "마진" },
  { value: "boxes", label: "재고" },
  { value: "package", label: "패키지" },
];

const blockTypeLabels: Record<GuideBlockType, string> = {
  overview: "개요 카드",
  steps: "단계별 카드",
  callout: "안내 박스",
  faq: "FAQ 묶음",
};

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
  if (!response.ok) throw new Error(payload.error || "요청을 처리할 수 없습니다.");
  return payload;
}

function cloneBlocks(blocks: GuideBlock[]) {
  return JSON.parse(JSON.stringify(blocks)) as GuideBlock[];
}

function toFaqForm(faq: FaqItem): FaqForm {
  return { ...faq };
}

function toGuideForm(guide: GuideRecord): GuideForm {
  return {
    ...guide,
    blocks: cloneBlocks(guide.blocks),
  };
}

function createBlock(type: GuideBlockType): GuideBlock {
  if (type === "overview") {
    return {
      type,
      title: "새 개요",
      body: "가이드의 핵심 내용을 정리합니다.",
      cards: [{ title: "체크 포인트", body: "확인해야 할 내용을 입력하세요." }],
    };
  }

  if (type === "steps") {
    return {
      type,
      title: "새 단계",
      items: [{ title: "1단계", body: "단계 설명을 입력하세요.", bullets: ["확인 항목"] }],
    };
  }

  if (type === "callout") {
    return {
      type,
      tone: "tip",
      title: "운영 팁",
      body: "강조해서 안내할 내용을 입력하세요.",
    };
  }

  return {
    type,
    title: "자주 묻는 질문",
    items: [{ question: "질문을 입력하세요.", answer: "답변을 입력하세요." }],
  };
}

function splitLines(value?: string[]) {
  return value?.join("\n") ?? "";
}

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminContentManager() {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [activeTab, setActiveTab] = useState<"faqs" | "guides">("faqs");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [guides, setGuides] = useState<GuideRecord[]>([]);
  const [faqForm, setFaqForm] = useState<FaqForm>(emptyFaq);
  const [guideForm, setGuideForm] = useState<GuideForm>(() => ({ ...emptyGuide, blocks: cloneBlocks(emptyGuide.blocks) }));
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("어드민 토큰을 입력하고 데이터를 불러오세요.");

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

  function clearSavedToken() {
    window.localStorage.removeItem("unisorder-admin-token");
    setToken("");
    setFaqs([]);
    setGuides([]);
    setMessage("저장된 토큰을 삭제했습니다.");
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
      const guidePayload = { ...guideForm, blocks: guideForm.blocks };
      const body = JSON.stringify(guidePayload);
      if (isEditingGuide && guideForm.id) {
        await adminFetch(`/api/admin/guides/${guideForm.id}`, token, { method: "PUT", body });
        setMessage("이용가이드를 수정했습니다.");
      } else {
        await adminFetch("/api/admin/guides", token, { method: "POST", body });
        setMessage("이용가이드를 등록했습니다.");
      }
      setGuideForm({ ...emptyGuide, blocks: cloneBlocks(emptyGuide.blocks) });
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
      setGuideForm({ ...emptyGuide, blocks: cloneBlocks(emptyGuide.blocks) });
      setMessage("이용가이드를 삭제했습니다.");
      await loadContent();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "이용가이드 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  function updateBlock(index: number, updater: (block: GuideBlock) => GuideBlock) {
    setGuideForm((form) => ({
      ...form,
      blocks: form.blocks.map((block, blockIndex) => (blockIndex === index ? updater(block) : block)),
    }));
  }

  function addBlock(type: GuideBlockType) {
    setGuideForm((form) => ({ ...form, blocks: [...form.blocks, createBlock(type)] }));
  }

  function removeBlock(index: number) {
    setGuideForm((form) => ({ ...form, blocks: form.blocks.filter((_, blockIndex) => blockIndex !== index) }));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setGuideForm((form) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= form.blocks.length) return form;
      const blocks = [...form.blocks];
      const current = blocks[index];
      blocks[index] = blocks[nextIndex];
      blocks[nextIndex] = current;
      return { ...form, blocks };
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
          <p className="text-sm font-black text-slate-500">관리 토큰</p>
          <div className="mt-3 flex rounded-md border border-border bg-white focus-within:border-primary">
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="min-w-0 flex-1 rounded-l-md px-3 py-2 text-sm font-semibold text-slate-800 outline-none"
              placeholder="어드민 토큰 입력"
              type={showToken ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowToken((value) => !value)}
              className="inline-flex w-10 items-center justify-center text-slate-500 hover:text-primary"
              aria-label={showToken ? "토큰 숨기기" : "토큰 보기"}
            >
              {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <button
            type="button"
            onClick={() => loadContent()}
            disabled={isLoading || !token}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-black text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" />
            데이터 불러오기
          </button>
          <button
            type="button"
            onClick={clearSavedToken}
            className="mt-2 w-full rounded-md border border-border px-4 py-2 text-xs font-black text-slate-600 hover:border-primary/40 hover:text-primary"
          >
            저장된 토큰 초기화
          </button>
          <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">
            브라우저에만 저장됩니다. {contentCountLabel}
          </p>
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
                <input checked={faqForm.isPublished} onChange={(event) => setFaqForm((form) => ({ ...form, isPublished: event.target.checked }))} type="checkbox" />
                공개
              </label>
              <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-black text-slate-700 sm:mt-7">
                <input checked={faqForm.showOnHome} onChange={(event) => setFaqForm((form) => ({ ...form, showOnHome: event.target.checked }))} type="checkbox" />
                홈 노출
              </label>
            </div>
            <ActionButtons
              isEditing={isEditingFaq}
              isLoading={isLoading}
              submitLabel={isEditingFaq ? "수정 저장" : "등록"}
              onDelete={deleteSelectedFaq}
            />
          </form>
        </section>
      ) : (
        <section className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
          <GuideList guides={guides} activeId={guideForm.id} onNew={() => setGuideForm({ ...emptyGuide, blocks: cloneBlocks(emptyGuide.blocks) })} onSelect={(guide) => setGuideForm(toGuideForm(guide))} />

          <form onSubmit={submitGuide} className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-slate-950">{isEditingGuide ? "이용가이드 수정" : "이용가이드 등록"}</h2>
            <GuideMetaForm guideForm={guideForm} setGuideForm={setGuideForm} />
            <GuideBlockEditor
              blocks={guideForm.blocks}
              onAdd={addBlock}
              onMove={moveBlock}
              onRemove={removeBlock}
              onUpdate={updateBlock}
            />
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

function ActionButtons({
  isEditing,
  isLoading,
  submitLabel,
  onDelete,
}: {
  isEditing: boolean;
  isLoading: boolean;
  submitLabel: string;
  onDelete: () => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <button type="submit" disabled={isLoading} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-black text-white hover:bg-primary-dark disabled:opacity-50">
        <Save className="h-4 w-4" />
        {submitLabel}
      </button>
      {isEditing ? (
        <button type="button" onClick={onDelete} disabled={isLoading} className="inline-flex items-center gap-2 rounded-md border border-red-200 px-4 py-2.5 text-sm font-black text-red-600 hover:bg-red-50 disabled:opacity-50">
          <Trash2 className="h-4 w-4" />
          삭제
        </button>
      ) : null}
    </div>
  );
}

function GuideList({
  guides,
  activeId,
  onNew,
  onSelect,
}: {
  guides: GuideRecord[];
  activeId?: string;
  onNew: () => void;
  onSelect: (guide: GuideRecord) => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-slate-950">이용가이드 목록</h2>
        <button type="button" onClick={onNew} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-primary/40 hover:text-primary">
          <Plus className="h-4 w-4" />
          새 가이드
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {guides.map((guide) => (
          <button
            key={guide.id}
            type="button"
            onClick={() => onSelect(guide)}
            className={`w-full rounded-md border p-4 text-left transition ${activeId === guide.id ? "border-primary bg-primary-soft/60" : "border-border bg-white hover:border-primary/30"}`}
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
  );
}

function GuideMetaForm({
  guideForm,
  setGuideForm,
}: {
  guideForm: GuideForm;
  setGuideForm: React.Dispatch<React.SetStateAction<GuideForm>>;
}) {
  return (
    <>
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
    </>
  );
}

function GuideBlockEditor({
  blocks,
  onAdd,
  onMove,
  onRemove,
  onUpdate,
}: {
  blocks: GuideBlock[];
  onAdd: (type: GuideBlockType) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updater: (block: GuideBlock) => GuideBlock) => void;
}) {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-slate-950">가이드 블록</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">개요, 단계, 안내박스, FAQ를 카드 단위로 관리합니다.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(blockTypeLabels) as GuideBlockType[]).map((type) => (
            <button key={type} type="button" onClick={() => onAdd(type)} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-primary/40 hover:text-primary">
              <Plus className="h-4 w-4" />
              {blockTypeLabels[type]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {blocks.map((block, index) => (
          <article key={`${block.type}-${index}`} className="rounded-lg border border-border bg-slate-50/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-black text-slate-800 ring-1 ring-border">
                <Layers className="h-4 w-4 text-primary" />
                {index + 1}. {blockTypeLabels[block.type]}
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => onMove(index, -1)} className="rounded-md border border-border bg-white p-2 text-slate-600 hover:text-primary" aria-label="위로 이동">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => onMove(index, 1)} className="rounded-md border border-border bg-white p-2 text-slate-600 hover:text-primary" aria-label="아래로 이동">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => onRemove(index)} className="rounded-md border border-red-200 bg-white p-2 text-red-600 hover:bg-red-50" aria-label="블록 삭제">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <BlockFields block={block} index={index} onUpdate={onUpdate} />
          </article>
        ))}
      </div>
    </div>
  );
}

function BlockFields({
  block,
  index,
  onUpdate,
}: {
  block: GuideBlock;
  index: number;
  onUpdate: (index: number, updater: (block: GuideBlock) => GuideBlock) => void;
}) {
  const updateTitle = (title: string) => onUpdate(index, (current) => ({ ...current, title }) as GuideBlock);

  if (block.type === "overview") {
    return (
      <div className="mt-4 space-y-4">
        <BaseTitle title={block.title} onChange={updateTitle} />
        <TextArea label="본문" value={block.body} onChange={(body) => onUpdate(index, (current) => (current.type === "overview" ? { ...current, body } : current))} />
        <NestedListHeader label="카드" onAdd={() => onUpdate(index, (current) => (current.type === "overview" ? { ...current, cards: [...(current.cards ?? []), { title: "새 카드", body: "내용을 입력하세요." }] } : current))} />
        <div className="grid gap-3 md:grid-cols-2">
          {(block.cards ?? []).map((card, cardIndex) => (
            <div key={cardIndex} className="rounded-md border border-border bg-white p-3">
              <Input label="카드 제목" value={card.title} onChange={(title) => onUpdate(index, (current) => current.type === "overview" ? { ...current, cards: (current.cards ?? []).map((item, itemIndex) => itemIndex === cardIndex ? { ...item, title } : item) } : current)} />
              <TextArea label="카드 내용" value={card.body} onChange={(body) => onUpdate(index, (current) => current.type === "overview" ? { ...current, cards: (current.cards ?? []).map((item, itemIndex) => itemIndex === cardIndex ? { ...item, body } : item) } : current)} />
              <RemoveNestedButton onClick={() => onUpdate(index, (current) => current.type === "overview" ? { ...current, cards: (current.cards ?? []).filter((_, itemIndex) => itemIndex !== cardIndex) } : current)} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "steps") {
    return (
      <div className="mt-4 space-y-4">
        <BaseTitle title={block.title} onChange={updateTitle} />
        <NestedListHeader label="단계" onAdd={() => onUpdate(index, (current) => current.type === "steps" ? { ...current, items: [...current.items, { title: "새 단계", body: "내용을 입력하세요.", bullets: [] }] } : current)} />
        <div className="space-y-3">
          {block.items.map((item, itemIndex) => (
            <div key={itemIndex} className="rounded-md border border-border bg-white p-3">
              <Input label="단계 제목" value={item.title} onChange={(title) => onUpdate(index, (current) => current.type === "steps" ? { ...current, items: current.items.map((step, stepIndex) => stepIndex === itemIndex ? { ...step, title } : step) } : current)} />
              <TextArea label="단계 설명" value={item.body} onChange={(body) => onUpdate(index, (current) => current.type === "steps" ? { ...current, items: current.items.map((step, stepIndex) => stepIndex === itemIndex ? { ...step, body } : step) } : current)} />
              <TextArea label="체크 항목, 한 줄에 하나씩" value={splitLines(item.bullets)} onChange={(value) => onUpdate(index, (current) => current.type === "steps" ? { ...current, items: current.items.map((step, stepIndex) => stepIndex === itemIndex ? { ...step, bullets: linesToArray(value) } : step) } : current)} />
              <Input label="참고 메모" value={item.note ?? ""} onChange={(note) => onUpdate(index, (current) => current.type === "steps" ? { ...current, items: current.items.map((step, stepIndex) => stepIndex === itemIndex ? { ...step, note: note || undefined } : step) } : current)} />
              <RemoveNestedButton onClick={() => onUpdate(index, (current) => current.type === "steps" ? { ...current, items: current.items.filter((_, stepIndex) => stepIndex !== itemIndex) } : current)} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "callout") {
    return (
      <div className="mt-4 space-y-4">
        <BaseTitle title={block.title} onChange={updateTitle} />
        <label className="block text-sm font-black text-slate-700">
          톤
          <select value={block.tone} onChange={(event) => onUpdate(index, (current) => current.type === "callout" ? { ...current, tone: event.target.value as "tip" | "warning" | "info" } : current)} className="mt-2 w-full rounded-md border border-border bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-primary">
            <option value="tip">팁</option>
            <option value="info">정보</option>
            <option value="warning">주의</option>
          </select>
        </label>
        <TextArea label="본문" value={block.body} onChange={(body) => onUpdate(index, (current) => current.type === "callout" ? { ...current, body } : current)} />
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <BaseTitle title={block.title} onChange={updateTitle} />
      <NestedListHeader label="질문" onAdd={() => onUpdate(index, (current) => current.type === "faq" ? { ...current, items: [...current.items, { question: "새 질문", answer: "답변을 입력하세요." }] } : current)} />
      <div className="space-y-3">
        {block.items.map((item, itemIndex) => (
          <div key={itemIndex} className="rounded-md border border-border bg-white p-3">
            <Input label="질문" value={item.question} onChange={(question) => onUpdate(index, (current) => current.type === "faq" ? { ...current, items: current.items.map((faq, faqIndex) => faqIndex === itemIndex ? { ...faq, question } : faq) } : current)} />
            <TextArea label="답변" value={item.answer} onChange={(answer) => onUpdate(index, (current) => current.type === "faq" ? { ...current, items: current.items.map((faq, faqIndex) => faqIndex === itemIndex ? { ...faq, answer } : faq) } : current)} />
            <RemoveNestedButton onClick={() => onUpdate(index, (current) => current.type === "faq" ? { ...current, items: current.items.filter((_, faqIndex) => faqIndex !== itemIndex) } : current)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BaseTitle({ title, onChange }: { title: string; onChange: (value: string) => void }) {
  return <Input label="블록 제목" value={title} onChange={onChange} />;
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="mt-3 block text-sm font-black text-slate-700">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold outline-none focus:border-primary" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="mt-3 block text-sm font-black text-slate-700">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-24 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold leading-6 outline-none focus:border-primary" />
    </label>
  );
}

function NestedListHeader({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-black text-slate-700">{label}</p>
      <button type="button" onClick={onAdd} className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-3 py-2 text-xs font-black text-slate-700 hover:border-primary/40 hover:text-primary">
        <Plus className="h-4 w-4" />
        추가
      </button>
    </div>
  );
}

function RemoveNestedButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-3 inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs font-black text-red-600 hover:bg-red-50">
      <Trash2 className="h-4 w-4" />
      삭제
    </button>
  );
}
