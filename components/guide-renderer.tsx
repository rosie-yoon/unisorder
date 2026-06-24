import { AlertTriangle, Check, Info, Lightbulb } from "lucide-react";
import type { Guide, GuideBlock } from "@/lib/guides";

const calloutStyle = {
  tip: {
    icon: Lightbulb,
    className: "border-primary/25 bg-primary-soft text-primary-dark",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-warning/35 bg-warning-soft text-amber-800",
  },
  info: {
    icon: Info,
    className: "border-accent/25 bg-accent-soft text-accent",
  },
} satisfies Record<string, { icon: typeof Info; className: string }>;

export function GuideHero({ guide }: { guide: Guide }) {
  const Icon = guide.icon;

  return (
    <section className="border-b border-border bg-white">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-sm font-bold text-primary-dark">
              <Icon className="h-4 w-4" />
              {guide.category}
            </div>
            <h1 className="max-w-3xl text-balance text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              {guide.title} 이용 가이드
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{guide.description}</p>
          </div>
          <div className="surface rounded-lg p-5">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">카테고리</dt>
                <dd className="mt-1 font-black text-slate-950">{guide.category}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">예상 소요</dt>
                <dd className="mt-1 font-black text-slate-950">{guide.duration}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GuideRenderer({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-10">
      {blocks.map((block, index) => (
        <GuideBlockView key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function GuideBlockView({ block }: { block: GuideBlock }) {
  if (block.type === "overview") {
    return (
      <section className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary-soft to-white p-6 md:p-8">
        <h2 className="text-2xl font-black text-primary-dark">{block.title}</h2>
        <p className="mt-4 text-base leading-8 text-slate-700">{block.body}</p>
        {block.cards && (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {block.cards.map((card) => (
              <div key={card.title} className="rounded-lg border border-border bg-white p-4 shadow-sm">
                <h3 className="font-black text-slate-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (block.type === "steps") {
    return (
      <section>
        <h2 className="mb-6 text-center text-3xl font-black tracking-tight text-slate-950">{block.title}</h2>
        <div className="space-y-5">
          {block.items.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-border bg-white p-5 shadow-sm md:p-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.body}</p>
                  {item.bullets && (
                    <div className="mt-4 rounded-lg bg-slate-50 p-4">
                      <ul className="space-y-2 text-sm text-slate-700">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.note && (
                    <p className="mt-4 rounded-md border border-warning/30 bg-warning-soft px-4 py-3 text-sm font-semibold text-amber-800">
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === "callout") {
    const style = calloutStyle[block.tone];
    const Icon = style.icon;
    return (
      <section className={`rounded-lg border p-5 ${style.className}`}>
        <div className="flex gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h2 className="font-black">{block.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{block.body}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-5 text-2xl font-black text-slate-950">{block.title}</h2>
      <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
        {block.items.map((item) => (
          <details key={item.question} className="group p-5">
            <summary className="cursor-pointer list-none font-black text-slate-950">
              {item.question}
            </summary>
            <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
