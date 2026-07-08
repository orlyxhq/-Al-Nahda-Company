import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/data";
import { LazyImage } from "@/components/site/LazyImage";


export const Route = createFileRoute("/products/$category/")({
  head: ({ params }) => {
    const cat = PRODUCT_CATEGORIES.find((c) => c.slug === params.category);
    return {
      meta: [
        { title: `${cat?.title ?? "المنتجات"} — النهضة الزراعية والتجارية` },
        { name: "description", content: cat?.description ?? "" },
        { property: "og:title", content: `${cat?.title ?? "المنتجات"} — النهضة الزراعية والتجارية` },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="display-2">الفئة غير موجودة</h1>
      <Link to="/products" className="mt-6 inline-block text-primary">العودة للمنتجات</Link>
    </div>
  ),
  loader: ({ params }) => {
    const cat = PRODUCT_CATEGORIES.find((c) => c.slug === params.category);
    if (!cat) throw notFound();
    return { cat };
  },
});

function CategoryPage() {
  const data = Route.useLoaderData() as { cat: (typeof PRODUCT_CATEGORIES)[number] };
  const cat = data.cat;
  const category = cat.slug as ProductCategory;
  const items = PRODUCTS.filter((p) => p.category === category);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14 lg:py-20">
          <Link to="/products" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary">
            <span>→</span> العودة إلى المنتجات
          </Link>
          <nav className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/products" className="hover:text-foreground">المنتجات</Link>
            <span>/</span>
            <span className="text-foreground">{cat.title}</span>
          </nav>
          <p className="eyebrow mt-6">{cat.short}</p>
          <h1 className="display-1 mt-4 text-[1.9rem] sm:text-[2.6rem] lg:text-[4.75rem]">{cat.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{cat.description}</p>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => {
            const brand = p.brandColor ?? "hsl(var(--primary))";
            return (
              <Link
                key={p.id}
                to="/products/$category/$id"
                params={{ category: p.category, id: p.id }}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
              >
                {p.image ? (
                  <div
                    className="relative aspect-square overflow-hidden"
                    style={{ background: `radial-gradient(circle at 30% 20%, ${brand}33 0%, transparent 65%), ${brand}12` }}
                  >
                    <LazyImage
                      src={p.image}
                      alt={p.name}
                      wrapperClassName="absolute inset-0 bg-transparent"
                      className="!object-contain p-2 transition duration-500 group-hover:scale-105"
                    />
                    {(p.listBadge ?? p.badge) && (
                      <span
                        className="absolute top-3 start-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow-sm"
                        style={{ background: brand }}
                      >{p.listBadge ?? p.badge}</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-6 pb-0">
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">{cat.title}</span>
                    {p.badge && <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold text-gold">{p.badge}</span>}
                  </div>
                )}
                {/* INFO BOX — textured blurred background per product */}
                <div className="relative flex flex-1 flex-col overflow-hidden">
                  {p.texture && (
                    <>
                      <img
                        src={p.texture}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        decoding="async"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      />
                      {/* Subtle darkening so the whole card feels cohesive */}
                      <div className="pointer-events-none absolute inset-0 bg-black/25" />
                    </>
                  )}
                  <div className="relative p-4">
                    {/* White frosted box hugging ONLY the text so the granule texture stays visible around it */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-4 shadow-sm ring-1 ring-black/5">
                      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: brand }}>{cat.title}</p>
                      <h3 className="mt-1.5 text-lg font-bold leading-snug text-ink">{p.name}</h3>
                      <p className="mt-1 text-sm text-ink/75">{p.tagline}</p>
                      <p className="mt-3 text-sm leading-7 text-ink/85">{p.description}</p>
                      <p className="mt-3 text-xs font-mono text-ink/70" style={{ direction: "ltr", textAlign: "right" }}>{p.composition}</p>
                    </div>
                  </div>
                </div>
              </Link>

            );
          })}


        </div>
      </section>
    </>
  );
}
