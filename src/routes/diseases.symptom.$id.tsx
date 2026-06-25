import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SYMPTOMS, DISEASES, PRODUCTS, PRODUCT_SOLVES_PROBLEMS, type Symptom } from "@/lib/data";

export const Route = createFileRoute("/diseases/symptom/$id")({
  head: ({ params }) => {
    const s = SYMPTOMS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${s?.name ?? "عَرَض"} — التشخيص والأسباب | النهضة الزراعية والتجارية` },
        { name: "description", content: s?.description ?? "" },
      ],
    };
  },
  loader: ({ params }): { symptom: Symptom } => {
    const symptom = SYMPTOMS.find((x) => x.id === params.id);
    if (!symptom) throw notFound();
    return { symptom };
  },
  component: SymptomDetail,
});

const LIKELIHOOD_TONE: Record<string, string> = {
  مرتفع: "bg-destructive/10 text-destructive border-destructive/30",
  متوسط: "bg-gold/15 text-gold border-gold/30",
  منخفض: "bg-secondary text-foreground/70 border-border",
};

function SymptomDetail() {
  const { symptom } = Route.useLoaderData() as { symptom: Symptom };

  const enriched = symptom.possibleCauses
    .map((c) => {
      const d = DISEASES.find((x) => x.id === c.refId);
      return d ? { ...c, disease: d } : null;
    })
    .filter(Boolean) as Array<{ type: string; refId: string; likelihood: "مرتفع" | "متوسط" | "منخفض"; note?: string; disease: (typeof DISEASES)[number] }>;

  // Suggested products: union of products that solve any of these problems
  const productIds = new Set<string>();
  for (const c of symptom.possibleCauses) {
    for (const [pid, problems] of Object.entries(PRODUCT_SOLVES_PROBLEMS)) {
      if (problems.includes(c.refId) || problems.includes(symptom.id)) productIds.add(pid);
    }
  }
  const products = [...productIds].map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-8 sm:py-12">
          <Link to="/diseases/diagnostic" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
            <span>→</span> العودة إلى مركز التشخيص
          </Link>
          <nav className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/diseases" className="hover:text-foreground">مركز الأمراض</Link>
            <span>/</span>
            <Link to="/diseases/diagnostic" className="hover:text-foreground">مركز التشخيص</Link>
            <span>/</span>
            <span className="text-foreground">{symptom.name}</span>
          </nav>

          <p className="eyebrow mt-6">عَرَض</p>
          <h1 className="display-1 mt-3 balance">{symptom.name}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/85 sm:text-lg balance">{symptom.description}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <span className="self-center text-xs text-muted-foreground">يظهر على:</span>
            {symptom.crops.map((c) => (
              <span key={c} className="rounded-full bg-background px-3 py-1 text-xs font-semibold">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-10 sm:py-14">
        {symptom.notes && symptom.notes.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">دليل سريع للتمييز</h2>
            <ul className="mt-4 space-y-2">
              {symptom.notes.map((n, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-7 text-foreground/85">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <h2 className="mt-10 text-xl font-bold">الأسباب المحتملة مرتّبة بالاحتمالية</h2>
        <div className="mt-6 space-y-4">
          {enriched.map((c) => (
            <Link
              key={c.refId}
              to="/diseases/$id"
              params={{ id: c.refId }}
              className="group block rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-card sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${LIKELIHOOD_TONE[c.likelihood]}`}>
                  احتمال {c.likelihood}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-foreground/70">
                  {c.type === "disease" ? "مرض" : c.type === "pest" ? "آفة حشرية" : "نقص عنصر غذائي"}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground" style={{ direction: "ltr" }}>
                  {c.disease.scientific}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold transition group-hover:text-primary balance">{c.disease.name}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground balance">{c.disease.summary}</p>
              {c.note && (
                <p className="mt-3 rounded-md border-r-4 border-primary/40 bg-secondary/60 px-3 py-2 text-xs text-foreground/75">
                  ملاحظة تشخيصية: {c.note}
                </p>
              )}
            </Link>
          ))}
        </div>

        {products.length > 0 && (
          <>
            <h2 className="mt-12 text-xl font-bold">منتجات قد تُساعد في الحلّ</h2>
            <p className="mt-1 text-sm text-muted-foreground">منتجات مرتبطة بأحد الأسباب المحتملة أعلاه.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                    <p className="mt-1 font-mono text-xs text-muted-foreground" style={{ direction: "ltr", textAlign: "right" }}>{p.composition}</p>
                  </Link>
                ) : null,
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}
