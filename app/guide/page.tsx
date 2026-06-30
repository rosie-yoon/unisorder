import { redirect } from "next/navigation";
import { externalGuideUrl } from "@/lib/site-links";

export const dynamic = "force-dynamic";

export default function GuideIndexPage() {
  redirect(externalGuideUrl);
}
