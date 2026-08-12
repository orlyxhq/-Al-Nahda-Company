import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCT_CATEGORIES, PRODUCTS, type ProductCategory } from "@/lib/data";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "المنتجات — النهضة الزراعية والتجارية" },
      { name: "description", content: "تصفّح تشكيلة النهضة الزراعية والتجارية الكاملة من الأسمدة والمبيدات والبذور المعتمدة." },
      { property: "og:title", content: "المنتجات — النهضة الزراعية والتجارية" },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (cat === "all" || p.category === cat) &&
          (q === "" ||
            p.name.includes(q) ||
            p.tagline.includes(q) ||
            p.cropTags.some((c) => c.includes(q))),
      ),
    [q, cat],
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-secondary/30">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" />
        <div className="container-x relative py-12 lg:py-20">
          <p className="eyebrow">كتالوج المنتجات</p>
          <h1 className="display-1 mt-5 max-w-3xl text-[1.9rem] sm:text-[2.6rem] lg:text-[4.75rem]">
            منتجات معتمدة. تركيبات حقيقية. نتائج قابلة للقياس.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            ابحث في تشكيلة النهضة الزراعية والتجارية الكاملة من الأسمدة والمبيدات والبذور، مع
            تركيبات شفافة ومراجع علمية لكل منتج.
          </p>
          <div className="divider-leaf mt-8 max-w-md" />
        </div>
      </section>


      <section className="container-x py-12">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث باسم المنتج أو المحصول..."
              className="w-full rounded-md border border-border-strong bg-card px-4 py-3.5 pr-11 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <svg className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></svg>
          </div>
          <div className="-mx-5 overflow-x-auto px-5 no-scrollbar md:mx-0 md:overflow-visible md:px-0">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
            <button
              onClick={() => setCat("all")}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-background text-foreground hover:bg-secondary"}`}
            >
              الكل
            </button>
            {PRODUCT_CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-background text-foreground hover:bg-secondary"}`}
              >
                {c.title}
              </button>
            ))}
          </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PRODUCT_CATEGORIES.map((c, i) => (
            <Link
              key={c.slug}
              to="/products/$category"
              params={{ category: c.slug }}
              className="group reveal-on-scroll hover-lift surface-elevated relative overflow-hidden p-7"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-primary/70 opacity-0 transition group-hover:opacity-100" />
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{c.short}</p>
              <h3 className="mt-3 text-2xl font-bold transition group-hover:text-primary">{c.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-foreground">
                <span className="tnum">{c.count}</span> منتج
                <span className="rotate-180 transition-transform group-hover:-translate-x-1">←</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex items-end justify-between border-b border-border pb-4">
          <h2 className="display-3">نتائج البحث</h2>
          <span className="text-sm text-muted-foreground tnum">{filtered.length} منتج</span>
        </div>


        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Link
              key={p.id}
              to="/products/$category/$id"
              params={{ category: p.category, id: p.id }}
              className="group reveal-on-scroll hover-lift relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-primary/60"
              style={{ transitionDelay: `${(i % 6) * 60}ms` }}
            >
              <span
                className="absolute inset-y-0 start-0 w-1 opacity-70"
                style={{ background: p.brandColor ?? "var(--color-primary)" }}
              />
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                  {PRODUCT_CATEGORIES.find((c) => c.slug === p.category)?.title}
                </span>
                {(p.listBadge ?? p.badge) && (
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold text-gold">{p.listBadge ?? p.badge}</span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug transition group-hover:text-primary">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-3 flex-1 text-sm leading-7 text-foreground/80">{p.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border pt-4">
                {p.cropTags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
                <span className="ms-auto text-sm text-primary opacity-0 transition group-hover:opacity-100">←</span>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </>
  );
}
