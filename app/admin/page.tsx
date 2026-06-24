import type { Metadata } from "next";
import { AdminContentManager } from "@/components/admin-content-manager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "콘텐츠 관리자",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <main className="bg-slate-50 py-10">
      <div className="shell">
        <div className="mb-8 max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight text-slate-950">콘텐츠 관리자</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            자주 묻는 질문과 이용가이드, 관리자 계정을 등록, 수정, 삭제합니다. 운영 배포 환경에서는
            로그인 세션 환경변수를 설정하세요.
          </p>
        </div>
        <AdminContentManager />
      </div>
    </main>
  );
}
