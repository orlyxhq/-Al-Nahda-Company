import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DISEASES, DISEASE_CATEGORIES, PRODUCTS, SYMPTOMS, PRODUCT_SOLVES_PROBLEMS, type Disease } from "@/lib/data";

export const Route = createFileRoute("/diseases/$id")({
  head: ({ params }) => {
    const d = DISEASES.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${d?.name ?? "مرض"} — مركز المعرفة | النهضة الزراعية والتجارية` },
        { name: "description", content: d?.summary ?? "" },
        { property: "og:title", content: `${d?.name ?? ""} — التشخيص والعلاج` },
      ],
    };
  },
  loader: ({ params }): { disease: Disease } => {
    const disease = DISEASES.find((x) => x.id === params.id);
    if (!disease) throw notFound();
    return { disease };
  },
  component: DiseaseDetail,
});

const SECTIONS = [
  { id: "overview", label: "نظرة عامّة" },
  { id: "symptoms", label: "الأعراض" },
  { id: "causes", label: "الأسباب" },
  { id: "risk", label: "عوامل الخطر" },
  { id: "prevention", label: "الوقاية" },
  { id: "treatment", label: "العلاج" },
  { id: "products", label: "منتجات موصى بها" },
  { id: "faq", label: "أسئلة شائعة" },
];

function DiseaseDetail() {
  const data = Route.useLoaderData() as { disease: Disease };
  const disease = data.disease;
  const category = DISEASE_CATEGORIES.find((c) => c.slug === disease.category);

  // Combine manually-curated related products with products that auto-match the disease ID
  const autoMatched = PRODUCTS.filter((p) => (PRODUCT_SOLVES_PROBLEMS[p.id] ?? []).includes(disease.id)).map((p) => p.id);
  const productIds = Array.from(new Set([...disease.relatedProducts, ...autoMatched]));
  const products = productIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  const related = disease.relatedDiseases.map((id) => DISEASES.find((d) => d.id === id)).filter(Boolean);
  const relatedSymptoms = (disease.relatedSymptoms ?? []).map((id) => SYMPTOMS.find((s) => s.id === id)).filter(Boolean);

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-8 sm:py-12">
          <Link to="/diseases" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary">
            <span className="inline-block">→</span> العودة إلى مركز الأمراض
          </Link>
          <nav className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/diseases" className="hover:text-foreground">مركز الأمراض</Link>
            <span>/</span>
            <span>{category?.title}</span>
            <span>/</span>
            <span className="text-foreground">{disease.name}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-6 sm:mt-8 sm:gap-8">
            <div className="min-w-0 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                  disease.severity === "شديد" ? "bg-destructive/10 text-destructive" :
                  disease.severity === "متوسّط" ? "bg-gold/15 text-gold" :
                  "bg-secondary text-foreground/70"
                }`}>● درجة الخطورة: {disease.severity}</span>
                <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold">{category?.title}</span>
              </div>
              <h1 className="display-1 mt-5 balance">{disease.name}</h1>
              <p className="mt-3 break-words font-mono text-xs text-muted-foreground sm:text-sm" style={{direction:"ltr", textAlign:"right"}}>
                {disease.scientific}
              </p>
              <p className="mt-5 text-base leading-7 text-foreground/85 sm:text-lg sm:leading-8 balance">{disease.summary}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                <span className="text-xs text-muted-foreground self-center">المحاصيل المتأثّرة:</span>
                {disease.crops.map((c) => (
                  <span key={c} className="rounded-full bg-background px-3 py-1 text-xs font-semibold">{c}</span>
                ))}
              </div>
            </div>

            <Link to="/contact" className="rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep">
              استشر مهندساً زراعياً
            </Link>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="container-x grid gap-12 py-14 lg:grid-cols-[220px_1fr]">
        {/* TOC */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 border-r border-border pr-5">
            <p className="mb-3 text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">المحتويات</p>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block rounded-md px-3 py-2 text-sm text-foreground/75 hover:bg-secondary hover:text-foreground">
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="prose-base max-w-none space-y-14">
          <Section id="overview" title="نظرة عامّة">
            <p className="text-base leading-8 text-foreground/85">{disease.overview}</p>
          </Section>

          <Section id="symptoms" title="الأعراض">
            <ChecklistGrid items={disease.symptoms} tone="warning" />
          </Section>

          <Section id="causes" title="الأسباب">
            <ChecklistGrid items={disease.causes} tone="neutral" />
          </Section>

          <Section id="risk" title="عوامل الخطر">
            <div className="grid gap-3 sm:grid-cols-2">
              {disease.riskFactors.map((r, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-destructive/10 text-xs font-bold text-destructive tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-7 text-foreground/85">{r}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="prevention" title="الوقاية">
            <ChecklistGrid items={disease.prevention} tone="success" />
          </Section>

          <Section id="treatment" title="خطّة العلاج">
            <ol className="space-y-3">
              {disease.treatment.map((t, i) => (
                <li key={i} className="relative rounded-xl border border-border bg-card p-6">
                  <span className="absolute -top-3 right-6 rounded-md bg-primary px-3 py-1 text-xs font-bold text-primary-foreground tnum">
                    خطوة {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{t.detail}</p>
                </li>
              ))}
            </ol>
          </Section>

          {products.length > 0 && (
            <Section id="products" title="منتجات موصى بها">
              <div className="grid gap-4 md:grid-cols-2">
                {products.map((p) =>
                  p ? (
                    <Link
                      key={p.id}
                      to="/products/$category/$id"
                      params={{ category: p.category, id: p.id }}
                      className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary"
                    >
                      <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">{p.tagline}</p>
                      <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
                      <p className="mt-1 font-mono text-xs text-muted-foreground" style={{direction:"ltr", textAlign:"right"}}>{p.composition}</p>
                      <p className="mt-3 text-sm leading-7 text-foreground/80">{p.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                        تفاصيل المنتج <span className="rotate-180">←</span>
                      </span>
                    </Link>
                  ) : null,
                )}
              </div>
            </Section>
          )}

          <Section id="faq" title="أسئلة شائعة">
            <div className="divide-y divide-border rounded-xl border border-border bg-card">
              {disease.faq.map((f, i) => (
                <details key={i} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold">
                    {f.q}
                    <span className="grid h-7 w-7 place-items-center rounded-md border border-border-strong text-sm transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </Section>

          {related.length > 0 && (
            <Section id="related" title="أمراض ذات صلة">
              <div className="grid gap-4 md:grid-cols-2">
                {related.map((d) =>
                  d ? (
                    <Link
                      key={d.id}
                      to="/diseases/$id"
                      params={{ id: d.id }}
                      className="rounded-xl border border-border bg-card p-5 transition hover:border-primary"
                    >
                      <p className="font-mono text-[11px] text-muted-foreground" style={{direction:"ltr", textAlign:"right"}}>{d.scientific}</p>
                      <h3 className="mt-1 text-lg font-bold">{d.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{d.summary}</p>
                    </Link>
                  ) : null,
                )}
              </div>
            </Section>
          )}
        </article>
      </div>
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ChecklistGrid({ items, tone }: { items: string[]; tone: "warning" | "success" | "neutral" }) {
  const color =
    tone === "warning" ? "text-gold border-gold/40 bg-gold/10" :
    tone === "success" ? "text-primary border-primary/30 bg-primary/10" :
    "text-foreground/70 border-border bg-secondary";
  const icon = tone === "success" ? "✓" : tone === "warning" ? "!" : "•";
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((s, i) => (
        <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border text-xs font-bold ${color}`}>{icon}</span>
          <p className="text-sm leading-7 text-foreground/85">{s}</p>
        </li>
      ))}
    </ul>
  );
}
