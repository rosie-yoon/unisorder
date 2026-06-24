import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LogIn, Menu } from "lucide-react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/#features", label: "기능" },
  { href: "/#stories", label: "성장사례" },
  { href: "/#pricing", label: "이용요금" },
  { href: "/#faq", label: "자주 묻는 질문" },
  { href: "/guide", label: "이용가이드" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/86 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-5">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg">
          <Image
            src="/brand/unis-logo.png"
            alt="UnisOrder"
            width={88}
            height={62}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="sr-only">UnisOrder 홈</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="https://app.unisorder.com/login"
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-primary/40 hover:text-primary"
          >
            <LogIn className="h-4 w-4" />
            로그인
          </Link>
          <Link
            href="https://app.unisorder.com/login"
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark"
          >
            무료로 시작하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="focus-ring inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-border bg-white text-slate-700">
            <span className="sr-only">메뉴 열기</span>
            <Menu className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 top-12 w-64 rounded-lg border border-border bg-white p-2 shadow-xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://app.unisorder.com/login"
              className="mt-2 block rounded-md border border-border bg-white px-3 py-3 text-center text-sm font-black text-slate-700 hover:border-primary/40 hover:text-primary"
            >
              로그인
            </Link>
            <Link
              href="https://app.unisorder.com/login"
              className="mt-2 block rounded-md bg-primary px-3 py-3 text-center text-sm font-black text-white hover:bg-primary-dark"
            >
              무료로 시작하기
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
