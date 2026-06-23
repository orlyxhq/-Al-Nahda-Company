import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from "@/lib/data";

export const Route = createFileRoute("/products/$category/$id")({
  head: ({ params }) => {
    const p = PRODUCTS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${p?.name ?? "منتج"} — زِراعة` },
        { name: "description", content: p?.description ?? "" },
      ],
    };
  },
  loader: ({ params }): { product: Product } => {
    const product = PRODUCTS.find((x) => x.id === params.id && x.category === params.category);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const cat = PRODUCT_CATEGORIES.find((c) => c.slug === product.category)!;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-12">
          <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/products" className="hover:text-foreground">المنتجات</Link>
            <span>/</span>
            <Link to="/products/$category" params={{ category: cat.slug }} className="hover:text-foreground">{cat.title}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary ag-grain">
            <div className="flex h-full items-end justify-between p-8">
              <span className="rounded-md bg-background/90 px-3 py-1 text-xs font-semibold">{cat.title}</span>
              {product.badge && <span className="rounded-full bg-gold/95 px-3 py-1 text-xs font-bold text-gold-foreground">{product.badge}</span>}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-4 gap-3">
            {[0,1,2,3].map((i) => (
              <div key={i} className="aspect-square rounded-md border border-border bg-card ag-grain" />
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{product.tagline}</p>
          <h1 className="display-2 mt-4">{product.name}</h1>
          <p className="mt-5 text-base leading-8 text-foreground/85">{product.description}</p>

          <dl className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
            <div className="grid grid-cols-3 gap-4 p-5">
              <dt className="text-sm text-muted-foreground">التركيبة</dt>
              <dd className="col-span-2 text-sm font-semibold" style={{direction:"ltr", textAlign:"right"}}>{product.composition}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 p-5">
              <dt className="text-sm text-muted-foreground">العبوة</dt>
              <dd className="col-span-2 text-sm font-semibold">{product.pack}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 p-5">
              <dt className="text-sm text-muted-foreground">المحاصيل</dt>
              <dd className="col-span-2 flex flex-wrap gap-1.5">
                {product.cropTags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs">{t}</span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary-deep">
              اطلب عرض سعر
            </Link>
            <Link to="/contact" className="rounded-md border border-border-strong px-6 py-3.5 text-sm font-bold hover:bg-secondary">
              استشارة فنية
            </Link>
          </div>

          <div className="mt-10 grid gap-5 rounded-xl border border-border bg-secondary/40 p-6">
            <h3 className="font-bold">تعليمات الاستخدام</h3>
            <p className="text-sm leading-7 text-muted-foreground">
              يُفضّل تطبيق المنتج وفق برنامج التسميد/الوقاية المعتمد من المهندس الزراعي المختصّ.
              تجنّب الخلط مع منتجات حمضية شديدة الفعالية، واتّبع نشرة المنتج للجرعات الدقيقة.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-14">
          <div className="ribbon-divider mb-12" />
          <h2 className="display-2">منتجات ذات صلة</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                to="/products/$category/$id"
                params={{ category: p.category, id: p.id }}
                className="group rounded-xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-card"
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">{cat.title}</p>
                <h3 className="mt-3 text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
