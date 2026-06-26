"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function KakaoFloatingButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <Link
      href="http://pf.kakao.com/_QSNqX"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 채널 문의하기"
      className="focus-ring fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#fee500] shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.22)] md:bottom-7 md:right-7 md:h-16 md:w-16"
    >
      <Image
        src="/brand/kakao-talk.png"
        alt=""
        width={64}
        height={64}
        className="h-full w-full rounded-full object-cover"
        aria-hidden="true"
      />
    </Link>
  );
}
