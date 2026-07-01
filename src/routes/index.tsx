import { createFileRoute, Link } from "@tanstack/react-router";
import heroFields from "@/assets/hero-fields.webp";
import soilHands from "@/assets/soil-hands.webp";
import diseaseLeaf from "@/assets/disease-leaf.webp";
import cropWheat from "@/assets/crop-wheat.webp";
import categorySeeds from "@/assets/category-seeds.webp.asset.json";

import { LazyImage } from "@/components/site/LazyImage";
import {
  PRODUCT_CATEGORIES,
  STATS,
  TESTIMONIALS,
  ARTICLES,
  DISEASES,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "النهضة الزراعية والتجارية — منصّة الحلول الزراعية المتكاملة" },
      { name: "description", content: "أسمدة، مبيدات، بذور، وقاعدة معرفية عربية متقدّمة لتشخيص أمراض المحاصيل وحلولها." },
      { property: "og:title", content: "النهضة الزراعية والتجارية — منصّة الحلول الزراعية المتكاملة" },
      { property: "og:image", content: heroFields },
    ],
      links: [
        { rel: "preload", as: "image", href: heroFields },
      ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ImpactBar />
      <CategoriesSection />
      <DiseasesShowcase />
      <WhyUs />
      <KnowledgePreview />
      <Testimonials />
      <ContactCta />
    </>
  );
}

/* ============ HERO ============ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-x pt-10 lg:pt-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="relative">
            <p className="eyebrow">منصّة الحلول الزراعية · منذ ١٩٩٨</p>
            <h1 className="display-1 mt-6 text-balance">
              نُنمّي الأرضَ بالعلم،
              <br />
              ونصون المحصولَ بالخبرة.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-9 text-muted-foreground">
              منصّة متكاملة تجمع الأسمدة والمبيدات والبذور المعتمدة، إلى جانب
              أكبر قاعدة معرفية عربية لتشخيص أمراض المحاصيل ووضع برامج العلاج
              والوقاية المدروسة.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/diseases"
                className="group inline-flex items-center gap-3 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary-deep"
              >
                ابدأ تشخيص محصولك
                <span className="inline-block rotate-180 transition-transform group-hover:-translate-x-1">←</span>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-3 rounded-md border border-border-strong bg-background px-6 py-4 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                استعرض المنتجات
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6 border-t border-border pt-6">
              <div className="flex -space-x-2 -space-x-reverse">
                {[0,1,2,3].map(i=>(
                  <span key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-bold text-foreground/70">
                    {["أ","م","س","ر"][i]}
                  </span>
                ))}
              </div>
              <div className="text-sm leading-6 text-muted-foreground">
                موثوق به من <span className="font-semibold text-foreground">+٤٢٠٠٠ مزارع</span>
                <br />في المملكة ودول الخليج.
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <img
                src={heroFields}
                alt="حقول زراعية ممتدّة عند الغروب"
                width={1920}
                height={1280}
                decoding="async"
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-6 text-primary-foreground">
                <p className="text-xs tracking-[0.22em] text-primary-foreground/80 uppercase">حقل القصيم · موسم ٢٠٢٥</p>
                <p className="mt-2 max-w-xs text-base font-medium">
                  زيادة إنتاجية القمح بنسبة ٢٣٪ بعد تطبيق برنامج تغذية ووقاية متكامل من النهضة الزراعية والتجارية.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 hidden w-64 rounded-xl border border-border bg-card p-5 shadow-card md:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/15 text-gold">✦</span>
                <div>
                  <p className="text-xs text-muted-foreground">مؤشر صحّة المحصول</p>
                  <p className="text-lg font-bold tnum text-foreground">٩٢ / ١٠٠</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-[92%] rounded-full bg-primary" />
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                التحليل آخر مرّة قبل ساعتين بناءً على بيانات الحقل.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ IMPACT BAR ============ */
function ImpactBar() {
  return (
    <section className="mt-12 lg:mt-16">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background p-7 lg:p-9">
              <p className="display-2 tnum text-primary">{s.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CATEGORIES ============ */
function CategoriesSection() {
  const imgs = [cropWheat, soilHands, categorySeeds.url];
  return (
    <section className="mt-14 lg:mt-20">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">المنتجات</p>
            <h2 className="display-2 mt-5">
              تشكيلة احترافية لكل مرحلة في عمر المحصول.
            </h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
            استعرض جميع المنتجات ←
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              to="/products/$category"
              params={{ category: cat.slug }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary"
            >
              <div className="relative overflow-hidden bg-secondary">
                <LazyImage
                  src={imgs[i]}
                  alt={cat.title}
                  width={1200}
                  height={900}
                  wrapperClassName="aspect-[4/3]"
                  className="transition duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 right-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur tnum">
                  {cat.count} منتج
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{cat.short}</p>
                <h3 className="mt-3 text-2xl font-bold">{cat.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{cat.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  تصفّح الفئة
                  <span className="rotate-180 transition-transform group-hover:-translate-x-1">←</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ DISEASES SHOWCASE — flagship ============ */
function DiseasesShowcase() {
  const featured = DISEASES.slice(0, 4);
  return (
    <section className="mt-16 lg:mt-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-ink text-primary-foreground sm:rounded-3xl">
          <div className="absolute inset-0 opacity-30">
            <img src={diseaseLeaf} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/85 to-ink/40" />

          <div className="relative grid min-w-0 gap-7 p-4 sm:p-8 md:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:p-16">
            <div className="min-w-0">
              <p className="eyebrow text-gold">قاعدة المعرفة</p>
              <h2 className="mt-4 max-w-full break-words font-display text-[1.35rem] font-extrabold leading-snug sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
                مركز الأمراض والحلول الزراعية.{" "}
                <span className="text-gold">المرجع العربي الأشمل.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-primary-foreground/85 sm:mt-6 sm:text-base sm:leading-8">
                ابحث عن المرض بالاسم، أو بالعارض، أو بالمحصول، واحصل على دليل
                علاجي مفصّل: الأعراض، الأسباب، عوامل الخطر، الوقاية، خطّة العلاج،
                والمنتجات الموصى بها.
              </p>

              <form className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-2 backdrop-blur sm:mt-8">
                <input
                  type="text"
                  placeholder="ابحث: لفحة الطماطم، بياض زغبي، نقص بوتاسيوم..."
                  className="min-w-0 bg-transparent px-2 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none sm:px-3"
                />
                <Link
                  to="/diseases"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gold px-4 py-3 text-sm font-bold text-gold-foreground transition hover:opacity-90 sm:px-5"
                >
                  بحث
                </Link>
              </form>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {["طماطم", "خيار", "قمح", "زيتون", "عنب", "موالح"].map((t) => (
                  <span key={t} className="rounded-full border border-white/20 px-3 py-1 text-primary-foreground/80">{t}</span>
                ))}
              </div>
            </div>

            <div className="min-w-0 space-y-3">
              {featured.map((d) => (
                <Link
                  key={d.id}
                  to="/diseases/$id"
                  params={{ id: d.id }}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-gold hover:bg-white/10 sm:p-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${
                        d.severity === "شديد" ? "bg-destructive" : d.severity === "متوسّط" ? "bg-gold" : "bg-primary-foreground/60"
                      }`} />
                      <span className="truncate text-[10px] tracking-widest text-primary-foreground/70 uppercase sm:text-[11px]">{d.scientific}</span>
                    </div>
                    <h3 className="mt-2 truncate text-base font-bold sm:text-lg">{d.name}</h3>
                    <p className="mt-1 text-xs text-primary-foreground/70">يصيب: {d.crops.join(" · ")}</p>
                  </div>
                  <span className="mt-1 text-gold opacity-0 transition group-hover:opacity-100">←</span>
                </Link>
              ))}
              <Link to="/diseases" className="block rounded-xl border border-gold/40 px-5 py-4 text-center text-sm font-bold text-gold transition hover:bg-gold hover:text-gold-foreground">
                استعراض جميع الأمراض ({DISEASES.length}+)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ WHY US ============ */
function WhyUs() {
  const items = [
    { num: "٠١", title: "مختبر تحاليل مرجعي", text: "نتائج دقيقة لتربتك ومياهك وأنسجة نباتاتك خلال ٤٨ ساعة." },
    { num: "٠٢", title: "استشاريون ميدانيون", text: "فريق من المهندسين والدكاترة الزراعيين يدعمك في حقلك مباشرة." },
    { num: "٠٣", title: "منتجات مرخّصة فقط", text: "كل منتج نوفّره يخضع لتسجيل رسمي ومطابقة المواصفات الخليجية." },
    { num: "٠٤", title: "برامج موسمية مدروسة", text: "خطط تغذية ووقاية متكاملة مصمّمة لمحصولك ومنطقتك المناخية." },
  ];
  return (
    <section className="mt-16 lg:mt-24 border-y border-border bg-gradient-to-br from-secondary/60 via-background to-primary/5 py-14 lg:py-20">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="eyebrow">لماذا النهضة الزراعية والتجارية</p>
          <h2 className="display-2 mt-5">
            شريك زراعي حقيقي، لا مجرّد بائع منتجات.
          </h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            بُنيت النهضة الزراعية والتجارية على فكرة بسيطة: المزارع يحتاج إلى نصيحة حياديّة وعِلم
            قابل للتطبيق، لا إلى كتالوج منتجات. كل قرار نقدّمه مدعوم بالبيانات
            والخبرة الميدانية.
          </p>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            تعرّف على قصّتنا ←
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.num} className="bg-card p-7">
              <p className="text-sm font-bold tracking-[0.18em] text-gold tnum">{it.num}</p>
              <h3 className="mt-4 text-lg font-bold">{it.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ KNOWLEDGE PREVIEW ============ */
function KnowledgePreview() {
  const featured = ARTICLES.slice(0, 3);
  return (
    <section className="mt-16 lg:mt-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">مركز المعرفة</p>
            <h2 className="display-2 mt-5">أحدث المقالات والأدلّة العملية.</h2>
          </div>
          <Link to="/knowledge" className="text-sm font-semibold text-primary">جميع المقالات ←</Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featured.map((a) => (
            <Link
              key={a.id}
              to="/knowledge/$id"
              params={{ id: a.id }}
              className="group flex flex-col"
            >
              <LazyImage
                src={a.image}
                alt={a.title}
                wrapperClassName="aspect-[5/4] rounded-xl border border-border"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="mt-3">
                <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-foreground">{a.category}</span>
              </div>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{a.date}</span>
                <span className="h-1 w-1 rounded-full bg-border-strong" />
                <span>{a.readingTime}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold leading-snug text-foreground transition group-hover:text-primary">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
function Testimonials() {
  return (
    <section className="mt-16 lg:mt-24 relative overflow-hidden py-14 lg:py-20 bg-gradient-to-b from-background via-gold/5 to-background">
      <div className="pointer-events-none absolute inset-0 ag-grain opacity-60" />
      <div className="container-x">
        <p className="eyebrow">شهادات</p>
        <h2 className="display-2 mt-5 max-w-2xl">يثق بنا من يفهم الحقل عن قرب.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft">
              <span className="font-display text-5xl leading-none text-gold">”</span>
              <blockquote className="mt-2 flex-1 text-base leading-8 text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="font-bold">{t.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT CTA ============ */
function ContactCta() {
  return (
    <section className="mt-16 lg:mt-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="absolute inset-0 ag-grain opacity-40" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-primary-foreground/70 uppercase">جاهزون للمساعدة</p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                لديك تحدٍّ في حقلك؟
                <br />تحدّث مع مهندس زراعي خلال دقائق.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-primary-foreground/85">
                اتصال مباشر، استشارة عبر واتساب، أو زيارة ميدانية. نختار معك
                أنسب طريقة للوصول إلى حلّ حقيقي.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/contact" className="rounded-xl bg-background px-6 py-5 text-center text-base font-bold text-foreground transition hover:bg-secondary">
                ابدأ المحادثة
              </Link>
              <a href="tel:+9660000000000" className="rounded-xl border border-primary-foreground/30 px-6 py-5 text-center text-base font-bold text-primary-foreground transition hover:bg-primary-foreground/10">
                ☎  ٩٢٠٠ ٠٠٠ ٠٠
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
