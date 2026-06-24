import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isPublished: boolean;
  showOnHome: boolean;
};

export type GuideBlock =
  | {
      type: "overview";
      title: string;
      body: string;
      cards?: Array<{ title: string; body: string }>;
    }
  | {
      type: "steps";
      title: string;
      items: Array<{
        title: string;
        body: string;
        bullets?: string[];
        note?: string;
      }>;
    }
  | {
      type: "callout";
      tone: "tip" | "warning" | "info";
      title: string;
      body: string;
    }
  | {
      type: "faq";
      title: string;
      items: Array<{ question: string; answer: string }>;
    };

export type GuideRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  iconName: string;
  sortOrder: number;
  isPublished: boolean;
  videoUrl?: string;
  blocks: GuideBlock[];
};

export type ContentData = {
  faqs: FaqItem[];
  guides: GuideRecord[];
};

export type FaqInput = Omit<FaqItem, "id"> & { id?: string };
export type GuideInput = Omit<GuideRecord, "id"> & { id?: string };

const contentFilePath = () => path.join(process.cwd(), "data", "content.json");
const supabaseUrl = () => process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseServiceRoleKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;
const hasSupabaseConfig = () => Boolean(supabaseUrl() && supabaseServiceRoleKey());

const sortByOrder = <T extends { sortOrder: number }>(items: T[]) =>
  [...items].sort((a, b) => a.sortOrder - b.sortOrder);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const createId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `guide-${Date.now().toString(36)}`;
}

function ensureText(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} 값을 입력해주세요.`);
  }

  return value.trim();
}

function ensureNumber(value: unknown, fallback = 999) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) return Number(value);
  return fallback;
}

function ensureBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  return fallback;
}

function normalizeFaq(input: Partial<FaqInput>, fallbackId?: string): FaqItem {
  return {
    id: input.id?.trim() || fallbackId || createId("faq"),
    question: ensureText(input.question, "질문"),
    answer: ensureText(input.answer, "답변"),
    sortOrder: ensureNumber(input.sortOrder),
    isPublished: ensureBoolean(input.isPublished, true),
    showOnHome: ensureBoolean(input.showOnHome, false),
  };
}

function toSupabaseFaq(faq: FaqItem) {
  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    sort_order: faq.sortOrder,
    is_published: faq.isPublished,
    show_on_home: faq.showOnHome,
  };
}

function fromSupabaseFaq(row: Record<string, unknown>): FaqItem {
  return normalizeFaq({
    id: String(row.id),
    question: String(row.question),
    answer: String(row.answer),
    sortOrder: ensureNumber(row.sort_order),
    isPublished: ensureBoolean(row.is_published, true),
    showOnHome: ensureBoolean(row.show_on_home, false),
  });
}

export function normalizeGuideBlocks(value: unknown): GuideBlock[] {
  if (!Array.isArray(value)) {
    throw new Error("가이드 블록은 배열 형식이어야 합니다.");
  }

  return value.map((block, blockIndex) => {
    if (!isRecord(block)) {
      throw new Error(`${blockIndex + 1}번째 가이드 블록 형식이 올바르지 않습니다.`);
    }

    const type = ensureText(block.type, "블록 타입");
    const title = ensureText(block.title, "블록 제목");

    if (type === "overview") {
      const cards = Array.isArray(block.cards)
        ? block.cards.map((card, cardIndex) => {
            if (!isRecord(card)) throw new Error(`${blockIndex + 1}번째 블록의 ${cardIndex + 1}번째 카드 형식이 올바르지 않습니다.`);
            return {
              title: ensureText(card.title, "카드 제목"),
              body: ensureText(card.body, "카드 내용"),
            };
          })
        : undefined;

      return {
        type,
        title,
        body: ensureText(block.body, "개요 내용"),
        ...(cards ? { cards } : {}),
      };
    }

    if (type === "steps") {
      if (!Array.isArray(block.items) || block.items.length === 0) {
        throw new Error("단계 블록에는 1개 이상의 단계가 필요합니다.");
      }

      return {
        type,
        title,
        items: block.items.map((item, itemIndex) => {
          if (!isRecord(item)) throw new Error(`${blockIndex + 1}번째 블록의 ${itemIndex + 1}번째 단계 형식이 올바르지 않습니다.`);
          return {
            title: ensureText(item.title, "단계 제목"),
            body: ensureText(item.body, "단계 내용"),
            bullets: Array.isArray(item.bullets) ? item.bullets.map((bullet) => String(bullet).trim()).filter(Boolean) : undefined,
            note: typeof item.note === "string" && item.note.trim() ? item.note.trim() : undefined,
          };
        }),
      };
    }

    if (type === "callout") {
      const tone = ensureText(block.tone, "콜아웃 톤");
      if (!["tip", "warning", "info"].includes(tone)) {
        throw new Error("콜아웃 톤은 tip, warning, info 중 하나여야 합니다.");
      }

      return {
        type,
        tone: tone as "tip" | "warning" | "info",
        title,
        body: ensureText(block.body, "콜아웃 내용"),
      };
    }

    if (type === "faq") {
      if (!Array.isArray(block.items) || block.items.length === 0) {
        throw new Error("FAQ 블록에는 1개 이상의 질문이 필요합니다.");
      }

      return {
        type,
        title,
        items: block.items.map((item, itemIndex) => {
          if (!isRecord(item)) throw new Error(`${blockIndex + 1}번째 블록의 ${itemIndex + 1}번째 FAQ 형식이 올바르지 않습니다.`);
          return {
            question: ensureText(item.question, "FAQ 질문"),
            answer: ensureText(item.answer, "FAQ 답변"),
          };
        }),
      };
    }

    throw new Error(`지원하지 않는 가이드 블록 타입입니다: ${type}`);
  });
}

function normalizeGuide(input: Partial<GuideInput>, fallbackId?: string): GuideRecord {
  const title = ensureText(input.title, "가이드 제목");

  return {
    id: input.id?.trim() || fallbackId || createId("guide"),
    slug: slugify(input.slug || title),
    title,
    category: ensureText(input.category, "카테고리"),
    description: ensureText(input.description, "설명"),
    duration: ensureText(input.duration, "예상 소요"),
    iconName: typeof input.iconName === "string" && input.iconName.trim() ? input.iconName.trim() : "file",
    sortOrder: ensureNumber(input.sortOrder),
    isPublished: ensureBoolean(input.isPublished, true),
    videoUrl: typeof input.videoUrl === "string" && input.videoUrl.trim() ? input.videoUrl.trim() : undefined,
    blocks: normalizeGuideBlocks(input.blocks),
  };
}

function toSupabaseGuide(guide: GuideRecord) {
  return {
    id: guide.id,
    slug: guide.slug,
    title: guide.title,
    category: guide.category,
    description: guide.description,
    duration: guide.duration,
    icon_name: guide.iconName,
    sort_order: guide.sortOrder,
    is_published: guide.isPublished,
    video_url: guide.videoUrl ?? null,
    blocks: guide.blocks,
  };
}

function fromSupabaseGuide(row: Record<string, unknown>): GuideRecord {
  return normalizeGuide({
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    category: String(row.category),
    description: String(row.description),
    duration: String(row.duration),
    iconName: String(row.icon_name ?? "file"),
    sortOrder: ensureNumber(row.sort_order),
    isPublished: ensureBoolean(row.is_published, true),
    videoUrl: typeof row.video_url === "string" ? row.video_url : undefined,
    blocks: normalizeGuideBlocks(row.blocks),
  });
}

async function supabaseRequest<T>(pathName: string, init?: RequestInit): Promise<T> {
  const baseUrl = supabaseUrl();
  const serviceRoleKey = supabaseServiceRoleKey();
  if (!baseUrl || !serviceRoleKey) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
  }

  const response = await fetch(`${baseUrl}/rest/v1/${pathName}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=representation",
      ...(init?.headers ?? {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = isRecord(payload) && typeof payload.message === "string" ? payload.message : "Supabase 요청에 실패했습니다.";
    throw new Error(message);
  }

  return payload as T;
}

async function readRawContent(): Promise<ContentData> {
  const filePath = contentFilePath();
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as Partial<ContentData>;

  return {
    faqs: Array.isArray(parsed.faqs) ? parsed.faqs.map((faq) => normalizeFaq(faq)) : [],
    guides: Array.isArray(parsed.guides) ? parsed.guides.map((guide) => normalizeGuide(guide)) : [],
  };
}

async function writeRawContent(data: ContentData) {
  const filePath = contentFilePath();
  const tempPath = `${filePath}.tmp`;
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(tempPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rename(tempPath, filePath);
}

async function mutateContent(mutator: (data: ContentData) => ContentData | Promise<ContentData>) {
  const current = await readRawContent();
  const next = await mutator(current);
  await writeRawContent(next);
  return next;
}

export async function getContent() {
  if (hasSupabaseConfig()) {
    const [faqRows, guideRows] = await Promise.all([
      supabaseRequest<Record<string, unknown>[]>("faqs?select=*&order=sort_order.asc"),
      supabaseRequest<Record<string, unknown>[]>("guides?select=*&order=sort_order.asc"),
    ]);

    return {
      faqs: faqRows.map(fromSupabaseFaq),
      guides: guideRows.map(fromSupabaseGuide),
    };
  }

  const content = await readRawContent();
  return {
    faqs: sortByOrder(content.faqs),
    guides: sortByOrder(content.guides),
  };
}

export async function getFaqs(options?: { publishedOnly?: boolean; homeOnly?: boolean }) {
  const { faqs } = await getContent();
  return faqs.filter((faq) => {
    if (options?.publishedOnly && !faq.isPublished) return false;
    if (options?.homeOnly && !faq.showOnHome) return false;
    return true;
  });
}

export async function createFaq(input: Partial<FaqInput>) {
  const faq = normalizeFaq(input);
  if (hasSupabaseConfig()) {
    const [created] = await supabaseRequest<Record<string, unknown>[]>("faqs", {
      method: "POST",
      body: JSON.stringify(toSupabaseFaq(faq)),
    });
    return fromSupabaseFaq(created);
  }

  await mutateContent((content) => ({ ...content, faqs: sortByOrder([...content.faqs, faq]) }));
  return faq;
}

export async function updateFaq(id: string, input: Partial<FaqInput>) {
  if (hasSupabaseConfig()) {
    const current = await supabaseRequest<Record<string, unknown>[]>(
      `faqs?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    );
    if (!current[0]) throw new Error("수정할 FAQ를 찾을 수 없습니다.");

    const updatedFaq = normalizeFaq({ ...fromSupabaseFaq(current[0]), ...input, id }, id);
    const [updated] = await supabaseRequest<Record<string, unknown>[]>(`faqs?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(toSupabaseFaq(updatedFaq)),
    });
    return fromSupabaseFaq(updated);
  }

  let updated: FaqItem | undefined;
  await mutateContent((content) => ({
    ...content,
    faqs: sortByOrder(
      content.faqs.map((faq) => {
        if (faq.id !== id) return faq;
        updated = normalizeFaq({ ...faq, ...input, id }, id);
        return updated;
      }),
    ),
  }));

  if (!updated) throw new Error("수정할 FAQ를 찾을 수 없습니다.");
  return updated;
}

export async function deleteFaq(id: string) {
  if (hasSupabaseConfig()) {
    const deleted = await supabaseRequest<Record<string, unknown>[]>(`faqs?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (deleted.length === 0) throw new Error("삭제할 FAQ를 찾을 수 없습니다.");
    return;
  }

  let removed = false;
  await mutateContent((content) => {
    const nextFaqs = content.faqs.filter((faq) => faq.id !== id);
    removed = nextFaqs.length !== content.faqs.length;
    return { ...content, faqs: nextFaqs };
  });

  if (!removed) throw new Error("삭제할 FAQ를 찾을 수 없습니다.");
}

export async function getGuides(options?: { publishedOnly?: boolean }) {
  const { guides } = await getContent();
  return guides.filter((guide) => (options?.publishedOnly ? guide.isPublished : true));
}

export async function getGuideBySlug(slug: string, options?: { publishedOnly?: boolean }) {
  const guides = await getGuides(options);
  return guides.find((guide) => guide.slug === slug);
}

export async function createGuide(input: Partial<GuideInput>) {
  const guide = normalizeGuide(input);
  if (hasSupabaseConfig()) {
    const [created] = await supabaseRequest<Record<string, unknown>[]>("guides", {
      method: "POST",
      body: JSON.stringify(toSupabaseGuide(guide)),
    });
    return fromSupabaseGuide(created);
  }

  await mutateContent((content) => {
    if (content.guides.some((item) => item.slug === guide.slug)) {
      throw new Error("이미 사용 중인 가이드 주소입니다.");
    }
    return { ...content, guides: sortByOrder([...content.guides, guide]) };
  });
  return guide;
}

export async function updateGuide(id: string, input: Partial<GuideInput>) {
  if (hasSupabaseConfig()) {
    const current = await supabaseRequest<Record<string, unknown>[]>(
      `guides?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    );
    if (!current[0]) throw new Error("수정할 가이드를 찾을 수 없습니다.");

    const updatedGuide = normalizeGuide({ ...fromSupabaseGuide(current[0]), ...input, id }, id);
    const [updated] = await supabaseRequest<Record<string, unknown>[]>(`guides?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(toSupabaseGuide(updatedGuide)),
    });
    return fromSupabaseGuide(updated);
  }

  let updated: GuideRecord | undefined;
  await mutateContent((content) => {
    const existing = content.guides.find((guide) => guide.id === id);
    if (!existing) return content;

    updated = normalizeGuide({ ...existing, ...input, id }, id);
    if (content.guides.some((guide) => guide.id !== id && guide.slug === updated?.slug)) {
      throw new Error("이미 사용 중인 가이드 주소입니다.");
    }

    return {
      ...content,
      guides: sortByOrder(content.guides.map((guide) => (guide.id === id ? updated! : guide))),
    };
  });

  if (!updated) throw new Error("수정할 가이드를 찾을 수 없습니다.");
  return updated;
}

export async function deleteGuide(id: string) {
  if (hasSupabaseConfig()) {
    const deleted = await supabaseRequest<Record<string, unknown>[]>(`guides?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (deleted.length === 0) throw new Error("삭제할 가이드를 찾을 수 없습니다.");
    return;
  }

  let removed = false;
  await mutateContent((content) => {
    const nextGuides = content.guides.filter((guide) => guide.id !== id);
    removed = nextGuides.length !== content.guides.length;
    return { ...content, guides: nextGuides };
  });

  if (!removed) throw new Error("삭제할 가이드를 찾을 수 없습니다.");
}
