import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  DISEASES,
  SYMPTOMS,
  PRODUCT_ACTIVE_INGREDIENTS,
  PRODUCT_SOLVES_PROBLEMS,
  type Product,
} from "@/lib/data";
import { LazyImage } from "@/components/site/LazyImage";

export const Route = createFileRoute("/products/$category/$id")({
  head: ({ params }) => {
    const p = PRODUCTS.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${p?.name ?? "منتج"} — النهضة الزراعية والتجارية` },
        { name: "description", content: p?.description ?? "" },
        ...(p?.image ? [{ property: "og:image", content: p.image } as const] : []),
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
  const { product } = Route.useLoaderData() as { product: Product };
  const cat = PRODUCT_CATEGORIES.find((c) => c.slug === product.category)!;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const ingredients = PRODUCT_ACTIVE_INGREDIENTS[product.id] ?? [];
  const solvedIds = PRODUCT_SOLVES_PROBLEMS[product.id] ?? [];
  const solvedDiseases = solvedIds.map((id) => DISEASES.find((d) => d.id === id)).filter(Boolean) as typeof DISEASES;
  const solvedSymptoms = solvedIds.map((id) => SYMPTOMS.find((s) => s.id === id)).filter(Boolean) as typeof SYMPTOMS;

  const brand = product.brandColor ?? "hsl(var(--primary))";
  const brandDeep = product.brandColorDeep ?? brand;
  const isRich = Boolean(product.image && product.benefits?.length);

  const complementProducts = (product.complements ?? [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Texture background — limited-height band at top with dark overlay for legibility */}
        {product.texture && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] sm:h-[460px] overflow-hidden">
            <img
              src={product.texture}
              alt=""
              aria-hidden
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Darkening layer to reduce distraction */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Brand tint + fade into page background at the bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${brandDeep}55 0%, transparent 45%, hsl(var(--background)/0.85) 88%, hsl(var(--background)) 100%)`,
              }}
            />
          </div>
        )}

        {!product.texture && isRich && (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${brand}14 0%, ${brandDeep}22 60%, transparent 100%)` }}
          />
        )}

        <div className="relative">
        <div className="container-x py-8 sm:py-12">
          <Link
            to="/products/$category"
            params={{ category: cat.slug }}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur hover:bg-secondary"
          >
            <span>→</span> العودة إلى {cat.title}
          </Link>
          <nav className={`mt-4 flex flex-wrap items-center gap-2 text-xs ${product.texture ? "text-white/85 [text-shadow:0_1px_2px_rgb(0_0_0_/_0.4)]" : "text-foreground/75"}`}>
            <Link to="/products" className="hover:opacity-90">المنتجات</Link>
            <span>/</span>
            <Link to="/products/$category" params={{ category: cat.slug }} className="hover:opacity-90">{cat.title}</Link>
            <span>/</span>
            <span className={product.texture ? "text-white" : "text-foreground"}>{product.name}</span>
          </nav>


        </div>

        <div className="container-x grid gap-10 pb-12 sm:pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pb-20">
          {/* Image — large, fills container */}
          <div className="order-2 lg:order-1">
            {product.image ? (
              <div
                className="relative aspect-square overflow-hidden rounded-3xl border border-border/60 bg-background/60 shadow-card backdrop-blur-sm"
                style={{ background: `radial-gradient(circle at 30% 20%, ${brand}40 0%, hsl(var(--background)/0.85) 70%)` }}
              >
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  wrapperClassName="absolute inset-0 bg-transparent"
                  className="!object-contain p-1 sm:p-2"
                  fetchPriority="high"
                  loading="eager"
                />
                {product.badge && (
                  <span
                    className="absolute top-5 start-5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm"
                    style={{ background: brand, color: "#fff" }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>
            ) : (
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary ag-grain">
                <div className="flex h-full items-end justify-between p-8">
                  <span className="rounded-md bg-background/90 px-3 py-1 text-xs font-semibold">{cat.title}</span>
                  {product.badge && <span className="rounded-full bg-gold/95 px-3 py-1 text-xs font-bold text-gold-foreground">{product.badge}</span>}
                </div>
              </div>
            )}
          </div>


          {/* Info */}
          <div className="order-1 lg:order-2 rounded-3xl bg-background/85 p-5 sm:p-7 backdrop-blur-md border border-border/60 shadow-card">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ color: brand }}
            >
              {cat.title} · {product.tagline}
            </p>
            <h1 className="display-2 mt-3 text-balance">{product.name}</h1>
            <p className="mt-5 text-base leading-8 text-foreground/85 sm:text-[1.05rem]">
              {product.longDescription ?? product.description}
            </p>

            {product.quickInfo && (
              <dl className="mt-7 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card/70 p-3 backdrop-blur sm:grid-cols-3">
                {product.quickInfo.map((q) => (
                  <div key={q.label} className="rounded-xl bg-secondary/50 p-3">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{q.label}</dt>
                    <dd className="mt-1 text-sm font-bold leading-tight" style={{ direction: "ltr", textAlign: "right" }}>{q.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {!product.quickInfo && (
              <dl className="mt-7 divide-y divide-border rounded-xl border border-border bg-card">
                <Row label="التركيبة"><span style={{ direction: "ltr" }}>{product.composition}</span></Row>
                <Row label="العبوة">{product.pack}</Row>
                <Row label="المحاصيل">
                  <div className="flex flex-wrap gap-1.5">
                    {product.cropTags.map((t) => (
                      <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs">{t}</span>
                    ))}
                  </div>
                </Row>
              </dl>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-md px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:opacity-95"
                style={{ background: brand }}
              >
                اطلب عرض سعر
              </Link>
              <Link to="/contact" className="rounded-md border border-border-strong px-6 py-3.5 text-sm font-bold hover:bg-secondary">
                استشارة فنية
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>


      {/* ============ BENEFITS ============ */}
      {product.benefits && product.benefits.length > 0 && (
        <section className="container-x py-12 sm:py-16">
          <p className="eyebrow" style={{ color: brand }}>الفوائد الرئيسية</p>
          <h2 className="display-2 mt-3 text-balance">لماذا يصنع فرقاً في حقلك؟</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.benefits.map((b, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-border bg-card p-5">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: brand }}
                >✓</span>
                <p className="text-sm leading-7 text-foreground/85">{b}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ CROPS ============ */}
      {product.cropList && product.cropList.length > 0 && (
        <section className="border-y border-border bg-secondary/40">
          <div className="container-x py-12 sm:py-16">
            <p className="eyebrow" style={{ color: brand }}>المحاصيل المناسبة</p>
            <h2 className="display-2 mt-3 text-balance">يخدم باقة واسعة من المحاصيل</h2>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {product.cropList.map((c) => (
                <div
                  key={c.name}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="text-xs font-bold">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ PROBLEMS (full expanded cards linked to /diseases/$id) ============ */}
      {product.problemLinks && product.problemLinks.length > 0 && (
        <section className="container-x py-12 sm:py-16">
          <p className="eyebrow" style={{ color: brand }}>المشاكل التي يساعد على علاجها</p>
          <h2 className="display-2 mt-3 text-balance">حلول مباشرة لأبرز مشاكل المحصول</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.problemLinks.map((p, i) => {
              const disease = DISEASES.find((d) => d.id === p.id);
              return (
                <Link
                  key={p.id}
                  to="/diseases/$id"
                  params={{ id: p.id }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-bold tnum text-white"
                        style={{ background: brand }}
                      >{String(i + 1).padStart(2, "0")}</span>
                      {disease && (
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          disease.severity === "شديد" ? "bg-destructive/10 text-destructive" :
                          disease.severity === "متوسّط" ? "bg-gold/15 text-gold" :
                          "bg-secondary text-foreground/70"
                        }`}>● {disease.severity}</span>
                      )}
                    </div>
                    <h3 className="text-base font-bold leading-snug">{disease?.name ?? p.label}</h3>
                    {disease?.scientific && (
                      <p className="font-mono text-[10px] text-muted-foreground" style={{ direction: "ltr", textAlign: "right" }}>
                        {disease.scientific}
                      </p>
                    )}
                    <p className="flex-1 text-sm leading-7 text-foreground/80 line-clamp-4">
                      {disease?.summary ?? p.label}
                    </p>
                  </div>
                  {/* colored CTA bar */}
                  <div
                    className="flex items-center justify-between gap-2 px-5 py-3 text-xs font-bold text-white transition group-hover:brightness-110"
                    style={{ background: brand }}
                  >
                    <span>اضغط لقراءة الدليل الكامل</span>
                    <span className="text-base transition-transform group-hover:-translate-x-1">←</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}


      {/* ============ WHY WE CHOSE THIS ============ */}
      {product.whyChoose && product.whyChoose.length > 0 && (
        <section
          className="border-y border-border"
          style={{ background: `linear-gradient(135deg, ${brand}10, transparent 60%)` }}
        >
          <div className="container-x py-12 sm:py-16">
            <p className="eyebrow" style={{ color: brand }}>⭐ خلاصة المنتج</p>
            <h2 className="display-2 mt-3 text-balance">لماذا اخترنا هذا السماد؟</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {product.whyChoose.map((w) => (
                <div
                  key={w.title}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  style={{ borderTop: `3px solid ${brand}` }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{w.title}</p>
                  <p className="mt-2 text-base font-bold leading-snug">{w.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ TECHNICAL ============ */}
      {product.technical && product.technical.length > 0 && (
        <section className="container-x py-12 sm:py-16">
          <p className="eyebrow" style={{ color: brand }}>التركيب والمواصفات الفنية</p>
          <h2 className="display-2 mt-3 text-balance">تركيبة دقيقة وعناصر موزونة</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {product.technical.map((t, i) => (
                  <tr key={t.label} className={i % 2 === 0 ? "bg-card" : "bg-secondary/40"}>
                    <td className="p-4 text-muted-foreground">{t.label}</td>
                    <td className="p-4 text-end font-mono font-bold" style={{ direction: "ltr" }}>{t.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ============ USAGE ============ */}
      {product.usage && product.usage.length > 0 && (
        <section className="border-y border-border bg-secondary/40">
          <div className="container-x py-12 sm:py-16">
            <p className="eyebrow" style={{ color: brand }}>طريقة الاستخدام</p>
            <h2 className="display-2 mt-3 text-balance">برنامج تطبيق مرن لكل محصول</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.usage.map((u, i) => (
                <div key={u.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: brand }}
                    >{i + 1}</span>
                    <h3 className="font-bold">{u.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-foreground/80">{u.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ STAGES ============ */}
      {product.stages && product.stages.length > 0 && (
        <section className="container-x py-12 sm:py-16">
          <p className="eyebrow" style={{ color: brand }}>مراحل الاستخدام</p>
          <h2 className="display-2 mt-3 text-balance">متى يعطي أفضل أداء؟</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {product.stages.map((s) => (
              <div key={s.name} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm font-bold">{s.name}</p>
                <p className="mt-2 text-base" style={{ color: brand }}>
                  {"★".repeat(s.rating)}<span className="text-muted-foreground/40">{"★".repeat(5 - s.rating)}</span>
                </p>
                {s.note && <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ COMPLEMENTS ============ */}
      {complementProducts.length > 0 && (
        <section className="border-y border-border bg-secondary/40">
          <div className="container-x py-12 sm:py-16">
            <p className="eyebrow" style={{ color: brand }}>المنتجات المكمّلة</p>
            <h2 className="display-2 mt-3 text-balance">برنامج تسميد متكامل</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {complementProducts.map((p) => {
                const pBrand = p.brandColor ?? "hsl(var(--primary))";
                return (
                  <Link
                    key={p.id}
                    to="/products/$category/$id"
                    params={{ category: p.category, id: p.id }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
                  >
                    {p.image && (
                      <div
                        className="relative aspect-square overflow-hidden"
                        style={{ background: `radial-gradient(circle at 30% 20%, ${pBrand}33 0%, transparent 65%), ${pBrand}12` }}
                      >
                        <LazyImage
                          src={p.image}
                          alt={p.name}
                          wrapperClassName="absolute inset-0 bg-transparent"
                          className="!object-contain p-3 transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="relative flex flex-1 flex-col overflow-hidden">
                      {p.texture && (
                        <>
                          <img src={p.texture} alt="" aria-hidden loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
                          <div className="pointer-events-none absolute inset-0 bg-black/25" />
                        </>
                      )}
                      <div className="relative p-4">
                        <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-4 shadow-sm ring-1 ring-black/5">
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: pBrand }}>{cat.title}</p>
                          <h3 className="mt-1.5 text-base font-bold leading-snug text-ink">{p.name}</h3>
                          <p className="mt-1 text-sm text-ink/75">{p.tagline}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>
      )}


      {/* ============ FAQ ============ */}
      {product.faq && product.faq.length > 0 && (
        <section className="container-x py-12 sm:py-16">
          <p className="eyebrow" style={{ color: brand }}>الأسئلة الشائعة</p>
          <h2 className="display-2 mt-3 text-balance">إجابات مباشرة من فريقنا الفنّي</h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {product.faq.map((f) => (
              <details key={f.q} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-bold sm:text-base">
                  <span>{f.q}</span>
                  <span className="shrink-0 text-xl transition group-open:rotate-45" style={{ color: brand }}>+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-foreground/80">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ============ Active ingredients (auto-mapped) ============ */}
      {(ingredients.length > 0 || solvedDiseases.length > 0 || solvedSymptoms.length > 0) && (
        <section className="container-x py-12 sm:py-14">
          <div className="ribbon-divider mb-10" />
          <h2 className="display-2">مرجعيّة المواد الفعّالة والمشاكل المرتبطة</h2>

          {ingredients.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">المواد الفعّالة</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <span key={ing} className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary">{ing}</span>
                ))}
              </div>
            </div>
          )}

          {solvedDiseases.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold">أمراض وآفات ونواقص يستهدفها</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {solvedDiseases.map((d) => (
                  <Link key={d.id} to="/diseases/$id" params={{ id: d.id }} className="group rounded-xl border border-border bg-card p-4 transition hover:border-primary">
                    <p className="font-mono text-[11px] text-muted-foreground" style={{ direction: "ltr", textAlign: "right" }}>{d.scientific}</p>
                    <h4 className="mt-1 text-sm font-bold transition group-hover:text-primary">{d.name}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {solvedSymptoms.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold">أعراض زراعية يعالجها</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {solvedSymptoms.map((s) => (
                  <Link key={s.id} to="/diseases/symptom/$id" params={{ id: s.id }} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/85 transition hover:border-primary hover:text-primary">
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ============ RELATED ============ */}
      {related.length > 0 && (
        <section className="container-x py-14">
          <div className="ribbon-divider mb-12" />
          <h2 className="display-2">منتجات ذات صلة</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {related.map((p) => {
              const pBrand = p.brandColor ?? "hsl(var(--primary))";
              return (
                <Link
                  key={p.id}
                  to="/products/$category/$id"
                  params={{ category: p.category, id: p.id }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
                >
                  {p.image && (
                    <div
                      className="relative aspect-square overflow-hidden"
                      style={{ background: `radial-gradient(circle at 30% 20%, ${pBrand}33 0%, transparent 65%), ${pBrand}12` }}
                    >
                      <LazyImage
                        src={p.image}
                        alt={p.name}
                        wrapperClassName="absolute inset-0 bg-transparent"
                        className="!object-contain p-3 transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="relative flex flex-1 flex-col overflow-hidden">
                    {p.texture && (
                      <>
                        <img src={p.texture} alt="" aria-hidden loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 bg-black/25" />
                      </>
                    )}
                    <div className="relative p-4">
                      <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-4 shadow-sm ring-1 ring-black/5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: pBrand }}>{cat.title}</p>
                        <h3 className="mt-1.5 text-base font-bold leading-snug text-ink">{p.name}</h3>
                        <p className="mt-1 text-sm text-ink/75">{p.tagline}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </section>
      )}
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="col-span-2 text-sm font-semibold">{children}</dd>
    </div>
  );
}
