import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PRODUCT_CATEGORIES, PRODUCTS, type ProductCategory } from "@/lib/data";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "المنتجات — زِراعة" },
      { name: "description", content: "تصفّح تشكيلة زِراعة الكاملة من الأسمدة والمبيدات والبذور المعتمدة." },
      { property: "og:title", content: "المنتجات — زِراعة" },
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
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14 lg:py-20">
          <p className="eyebrow">كتالوج المنتجات</p>
          <h1 className="display-1 mt-5 max-w-3xl">
            منتجات معتمدة. تركيبات حقيقية. نتائج قابلة للقياس.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            ابحث في تشكيلة زِراعة الكاملة من الأسمدة والمبيدات والبذور، مع
            تركيبات شفافة ومراجع علمية لكل منتج.
          </p>
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
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCat("all")}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-background text-foreground hover:bg-secondary"}`}
            >
              الكل
            </button>
            {PRODUCT_CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-background text-foreground hover:bg-secondary"}`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {PRODUCT_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/products/$category"
              params={{ category: c.slug }}
              className="group bg-background p-7 transition hover:bg-secondary/60"
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{c.short}</p>
              <h3 className="mt-3 text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-foreground">{c.count} منتج <span className="rotate-180">←</span></span>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex items-end justify-between">
          <h2 className="text-xl font-bold">نتائج البحث</h2>
          <span className="text-sm text-muted-foreground tnum">{filtered.length} منتج</span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to="/products/$category/$id"
              params={{ category: p.category, id: p.id }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                  {PRODUCT_CATEGORIES.find((c) => c.slug === p.category)?.title}
                </span>
                {p.badge && <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold text-gold">{p.badge}</span>}
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-4 flex-1 text-sm leading-7 text-foreground/80">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                {p.cropTags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-foreground/70">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
