import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://unisorder.com"),
  title: {
    default: "UnisOrder - 글로벌 셀링 통합 관리 플랫폼",
    template: "%s | UnisOrder",
  },
  description:
    "Shopee·Lazada 주문, 송장, SKU, 재고, 마진 관리를 하나로 연결하는 글로벌 셀러 운영 플랫폼입니다.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "UnisOrder",
    description: "Shopee·Lazada 운영을 더 단단하게 연결하는 통합 관리 플랫폼",
    siteName: "UnisOrder",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
