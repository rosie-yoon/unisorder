"use client";

import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";

type ManualImageViewerProps = {
  src: string;
  alt: string;
  caption: string;
};

export function ManualImageViewer({ src, alt, caption }: ManualImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group block w-full overflow-hidden rounded-lg border border-border bg-white text-left focus-ring"
        aria-label={`${alt} 크게 보기`}
      >
        <span className="relative block">
          <img
            src={src}
            alt={alt}
            className="h-auto w-full"
            loading="lazy"
          />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-950/82 px-3 py-1.5 text-xs font-black text-white opacity-95 transition group-hover:bg-primary-dark">
            <Maximize2 className="h-3.5 w-3.5" />
            크게 보기
          </span>
        </span>
      </button>
      <figcaption className="mt-3 text-sm font-semibold leading-6 text-slate-500">{caption}</figcaption>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-slate-950/86 p-3 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="이미지 크게 보기"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between gap-3 text-white">
              <p className="min-w-0 truncate text-sm font-bold">{caption}</p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12 text-white hover:bg-white/20 focus-ring"
                aria-label="이미지 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div
              className="min-h-0 flex-1 overflow-auto rounded-lg bg-white p-2"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="mx-auto h-auto w-full max-w-[1280px]"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
