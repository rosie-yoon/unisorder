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
