import {
  Boxes,
  Calculator,
  FileText,
  Link2,
  PackageCheck,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import {
  getGuideBySlug as getStoredGuideBySlug,
  getGuides as getStoredGuides,
  type GuideBlock,
  type GuideRecord,
} from "@/lib/content-store";

export type { GuideBlock };

export type Guide = GuideRecord & {
  icon: LucideIcon;
};

export const guideCategories = [
  "시작하기",
  "플랫폼 연동",
  "Shopee 연동",
  "Lazada 연동",
  "주문 관리",
  "송장 출력",
  "SKU/재고",
  "정산/마진",
  "구독/결제",
];

export const defaultGuidePaths = [
  "Basic 시작하기",
  "Pro 시작하기",
  "Lazada 추가 시작하기",
  "주문 처리 루틴 만들기",
  "재고/발주 자동화 세팅하기",
];

const iconMap: Record<string, LucideIcon> = {
  boxes: Boxes,
  calculator: Calculator,
  file: FileText,
  link: Link2,
  package: PackageCheck,
  receipt: ReceiptText,
};

function attachIcon(guide: GuideRecord): Guide {
  return {
    ...guide,
    icon: iconMap[guide.iconName] ?? FileText,
  };
}

export async function getGuides(options?: { publishedOnly?: boolean }) {
  const guides = await getStoredGuides(options);
  return guides.map(attachIcon);
}

export async function getGuideBySlug(slug: string, options?: { publishedOnly?: boolean }) {
  const guide = await getStoredGuideBySlug(slug, options);
  return guide ? attachIcon(guide) : undefined;
}

export function getGuidePathNames(guide: Guide) {
  if (guide.recommendedPaths.length > 0) return guide.recommendedPaths;

  if (guide.category.includes("Lazada") || guide.title.toLowerCase().includes("lazada")) {
    return ["Lazada 추가 시작하기"];
  }

  if (guide.category.includes("재고") || guide.category.includes("정산") || guide.title.includes("재고") || guide.title.includes("마진")) {
    return ["Pro 시작하기"];
  }

  if (guide.category.includes("주문") || guide.category.includes("송장")) {
    return ["주문 처리 루틴 만들기"];
  }

  return ["Basic 시작하기"];
}

export function getRecommendedGuidePaths(guides: Guide[]) {
  const pathNames = [...defaultGuidePaths];

  guides.forEach((guide) => {
    getGuidePathNames(guide).forEach((pathName) => {
      if (!pathNames.includes(pathName)) pathNames.push(pathName);
    });
  });

  return pathNames
    .map((name) => ({
      name,
      guides: guides
        .filter((guide) => getGuidePathNames(guide).includes(name))
        .sort((a, b) => a.pathOrder - b.pathOrder || a.sortOrder - b.sortOrder),
    }))
    .filter((path) => path.guides.length > 0);
}

export function getGuideCategoryGroups(guides: Guide[]) {
  const categories = [...guideCategories];

  guides.forEach((guide) => {
    if (!categories.includes(guide.category)) categories.push(guide.category);
  });

  return categories
    .map((category) => ({
      category,
      guides: guides.filter((guide) => guide.category === category).sort((a, b) => a.sortOrder - b.sortOrder),
    }))
    .filter((group) => group.guides.length > 0);
}
