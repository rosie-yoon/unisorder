type LegalPageProps = {
  title: string;
  effectiveDate: string;
  html: string;
};

export function LegalPage({ title, effectiveDate, html }: LegalPageProps) {
  return (
    <main>
      <section className="border-b border-primary-dark bg-primary-dark text-white">
        <div className="shell py-8 md:py-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/65">Legal</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">{title}</h1>
          <p className="mt-3 text-sm font-bold text-white/70">시행일: {effectiveDate} | HOURGRIT</p>
        </div>
      </section>

      <section className="shell py-10">
        <div className="legal-html" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </main>
  );
}
