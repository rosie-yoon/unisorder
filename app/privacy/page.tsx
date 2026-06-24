import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacyHtml } from "@/lib/legal-html";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "유니스오더 개인정보처리방침입니다.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <LegalPage title="개인정보처리방침" effectiveDate="2026년 3월 13일" html={privacyHtml} />;
}
