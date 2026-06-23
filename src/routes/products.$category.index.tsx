import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from "@/lib/data";

export const Route = createFileRoute("/products/$category/")({
  head: ({ params }) => {
    const cat = PRODUCT_CATEGORIES.find((c) => c.slug === params.category);
    return {
      meta: [
        { title: `${cat?.title ?? "المنتجات"} — زِراعة` },
        { name: "description", content: cat?.description ?? "" },
        { property: "og:title", content: `${cat?.title ?? "المنتجات"} — زِراعة` },
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
  const { cat } = Route.useLoaderData();
  const category = cat.slug as ProductCategory;
  const items = PRODUCTS.filter((p) => p.category === category);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14 lg:py-20">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/products" className="hover:text-foreground">المنتجات</Link>
            <span>/</span>
            <span className="text-foreground">{cat.title}</span>
          </nav>
          <p className="eyebrow mt-6">{cat.short}</p>
          <h1 className="display-1 mt-4">{cat.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{cat.description}</p>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              to="/products/$category/$id"
              params={{ category: p.category, id: p.id }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">{cat.title}</span>
                {p.badge && <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold text-gold">{p.badge}</span>}
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-4 flex-1 text-sm leading-7 text-foreground/80">{p.description}</p>
              <p className="mt-4 text-xs font-mono text-muted-foreground" style={{direction:"ltr", textAlign:"right"}}>{p.composition}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
