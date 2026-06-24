import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DISEASES, DISEASE_CATEGORIES, CROP_TAGS, type DiseaseCategory } from "@/lib/data";
import diseaseLeaf from "@/assets/disease-leaf.webp";

export const Route = createFileRoute("/diseases/")({
  head: () => ({
    meta: [
      { title: "الأمراض الزراعية والحلول — النهضة الزراعية والتجارية" },
      { name: "description", content: "قاعدة معرفية عربية متكاملة لتشخيص أمراض المحاصيل وآفاتها ووضع برامج العلاج والوقاية." },
      { property: "og:title", content: "مركز الأمراض والحلول الزراعية — النهضة الزراعية والتجارية" },
      { property: "og:image", content: diseaseLeaf },
    ],
  }),
  component: DiseasesIndex,
});

function DiseasesIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<DiseaseCategory | "all">("all");
  const [crop, setCrop] = useState<string | "all">("all");

  const filtered = useMemo(
    () =>
      DISEASES.filter(
        (d) =>
          (cat === "all" || d.category === cat) &&
          (crop === "all" || d.crops.some((c) => c.includes(crop))) &&
          (q === "" || d.name.includes(q) || d.scientific.toLowerCase().includes(q.toLowerCase()) || d.summary.includes(q)),
      ),
    [q, cat, crop],
  );

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-border bg-ink text-primary-foreground">
        <div className="absolute inset-0 opacity-25">
          <img src={diseaseLeaf} alt="" className="h-full w-full object-cover" decoding="async" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/85 to-ink/60" />
        <div className="container-x relative py-12 sm:py-16 lg:py-24">
          <p className="eyebrow text-gold">مركز المعرفة الزراعية</p>
          <h1 className="display-1 mt-5 max-w-3xl text-primary-foreground balance">
            شخّص المرض. افهم السبب. اتّخذ القرار.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/85 sm:text-lg sm:leading-8 balance">
            قاعدة بيانات شاملة لأمراض المحاصيل وآفاتها واضطرابات التغذية،
            تجمع بين المراجع العلمية والخبرة الميدانية في واجهة عربية احترافية.
          </p>

          <div className="mt-8 flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-2 backdrop-blur sm:mt-10">
            <svg className="ms-1 h-5 w-5 shrink-0 text-primary-foreground/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن مرض، عارض، أو محصول..."
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/55 focus:outline-none sm:text-base"
            />
            <span className="hidden rounded-md bg-white/10 px-2 py-1 text-xs text-primary-foreground/70 md:inline-block">⌘K</span>
          </div>

          {/* mobile horizontal crop chips */}
          <div className="-mx-5 mt-6 overflow-x-auto px-5 no-scrollbar lg:hidden">
            <div className="flex w-max gap-2 pb-1">
              <button
                onClick={() => setCrop("all")}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${crop === "all" ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-primary-foreground/85"}`}
              >
                كل المحاصيل
              </button>
              {CROP_TAGS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCrop(crop === c ? "all" : c)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${crop === c ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-primary-foreground/85"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 text-xs sm:mt-10 sm:grid-cols-5 sm:gap-3">
            {DISEASE_CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCat(cat === c.slug ? "all" : c.slug)}
                className={`rounded-lg border p-3 text-right transition sm:p-4 ${cat === c.slug ? "border-gold bg-gold/15 text-gold" : "border-white/15 text-primary-foreground/85 hover:border-white/30"}`}
              >
                <p className="font-bold leading-tight">{c.title}</p>
                <p className="mt-1 tnum text-primary-foreground/65">{c.count} سجل</p>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ===== EXPLORE ===== */}
      <section className="container-x py-10 sm:py-14 lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">حسب النوع</h3>
              <ul className="mt-4 space-y-1">
                <li>
                  <button onClick={() => setCat("all")} className={`block w-full rounded-md px-3 py-2 text-right text-sm ${cat === "all" ? "bg-secondary font-semibold text-foreground" : "text-foreground/75 hover:bg-secondary/60"}`}>
                    جميع الأنواع <span className="tnum text-muted-foreground">({DISEASES.length})</span>
                  </button>
                </li>
                {DISEASE_CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <button onClick={() => setCat(c.slug)} className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-right text-sm ${cat === c.slug ? "bg-secondary font-semibold text-foreground" : "text-foreground/75 hover:bg-secondary/60"}`}>
                      <span>{c.title}</span>
                      <span className="tnum text-muted-foreground">{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">حسب المحصول</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <button onClick={() => setCrop("all")} className={`rounded-full border px-3 py-1 text-xs transition ${crop === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/75 hover:bg-secondary"}`}>الكل</button>
                {CROP_TAGS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCrop(crop === c ? "all" : c)}
                    className={`rounded-full border px-3 py-1 text-xs transition ${crop === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/75 hover:bg-secondary"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* results */}
        <div>
          <div className="flex items-end justify-between border-b border-border pb-4">
            <h2 className="text-xl font-bold">السجلات</h2>
            <p className="text-sm tnum text-muted-foreground">{filtered.length} نتيجة</p>
          </div>

          <div className="mt-8 space-y-4">
            {filtered.map((d) => (
              <Link
                key={d.id}
                to="/diseases/$id"
                params={{ id: d.id }}
                className="group grid gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-card sm:p-6 sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      d.severity === "شديد" ? "bg-destructive/10 text-destructive" :
                      d.severity === "متوسّط" ? "bg-gold/15 text-gold" :
                      "bg-secondary text-foreground/70"
                    }`}>
                      ● {d.severity}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-foreground/70">
                      {DISEASE_CATEGORIES.find((c) => c.slug === d.category)?.title}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground" style={{direction:"ltr"}}>{d.scientific}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold transition group-hover:text-primary sm:text-xl balance">{d.name}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground balance">{d.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.crops.map((c) => (
                      <span key={c} className="rounded-md bg-secondary/70 px-2 py-0.5 text-[11px] text-foreground/70">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-end text-2xl text-primary opacity-0 transition group-hover:opacity-100 sm:items-center">
                  ←
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
                لا توجد نتائج مطابقة لمعايير البحث.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
