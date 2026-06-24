import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { termsHtml } from "@/lib/legal-html";

export const metadata: Metadata = {
  title: "이용약관",
  description: "유니스오더 이용약관입니다.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <LegalPage title="이용약관" effectiveDate="2026년 3월 13일" html={termsHtml} />;
}
