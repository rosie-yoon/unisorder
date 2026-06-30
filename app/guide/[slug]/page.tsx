import { redirect } from "next/navigation";
import { externalGuideUrl } from "@/lib/site-links";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  return {
    title: "이용가이드",
    alternates: {
      canonical: externalGuideUrl,
    },
  };
}

export default function GuideDetailPage() {
  redirect(externalGuideUrl);
}
