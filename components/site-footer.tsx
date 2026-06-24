import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/features", label: "기능" },
  { href: "/stories", label: "성장사례" },
  { href: "/pricing", label: "이용요금" },
  { href: "/faq", label: "자주 묻는 질문" },
  { href: "/guide", label: "이용가이드" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white pb-5 pt-4 text-[11px] text-slate-500 md:text-xs">
      <div className="shell space-y-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex w-fit items-center gap-2">
            <Image
              src="/brand/unis-logo.png"
              alt="UnisOrder"
              width={74}
              height={52}
              className="h-6 w-auto object-contain md:h-7"
            />
            <span className="sr-only">UnisOrder</span>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 font-semibold text-slate-700">
            <span className="hidden gap-4 md:flex">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-primary">
                  {link.label}
                </Link>
              ))}
              <span className="text-slate-300">|</span>
            </span>
            <span className="flex gap-3 md:gap-4">
              <Link href="/privacy" className="transition hover:text-primary">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="transition hover:text-primary">
                이용약관
              </Link>
            </span>
          </nav>
        </div>

        <div className="border-t border-border/70 pt-3 leading-5 text-slate-500 md:flex md:items-end md:justify-between md:gap-6">
          <div className="max-w-4xl space-y-1">
            <p>회사명 HOURGRIT (아워그릿) · 대표이사 박상현 · 주소 충청남도 천안시 서북구 불당26로 80</p>
            <p>
              이메일{" "}
              <a className="font-semibold text-slate-700 hover:text-primary" href="mailto:contact@hourgrit.com">
                contact@hourgrit.com
              </a>{" "}
              · 사업자등록번호 642-56-00835 · 통신판매사업신고번호 제 2026-충남천안-0552호
            </p>
          </div>
          <p className="mt-2 shrink-0 md:mt-0">&copy; 2026 UnisOrder</p>
        </div>
      </div>
    </footer>
  );
}
