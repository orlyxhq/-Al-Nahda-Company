import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TIMELINE, VALUES } from "@/lib/data";
import soilHands from "@/assets/soil-hands.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن النهضة الزراعية والتجارية — قصّتنا ورؤيتنا" },
      { name: "description", content: "النهضة الزراعية والتجارية شركة متخصّصة في الحلول الزراعية المتكاملة منذ عام ١٩٧٠." },
      { property: "og:title", content: "عن النهضة الزراعية والتجارية — قصّتنا ورؤيتنا" },
      { property: "og:description", content: "أكثر من ٥٠ عاماً في خدمة الأرض: قيمنا، مسيرتنا، فريقنا، واعتماداتنا." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: soilHands },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-hero-glow">
        <div className="absolute inset-0 bg-dots opacity-40" aria-hidden />
        <div className="container-x relative grid gap-8 py-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:py-16">
          <div className="reveal-on-scroll">
            <p className="eyebrow">عن الشركة</p>
            <h1 className="display-1 mt-4 balance">
              أكثر من ٥٠ عاماً في خدمة الأرض،
              <br className="hidden sm:block" /> ومن يعمل عليها.
            </h1>
            <p className="pretty mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              بدأت النهضة الزراعية والتجارية عام ١٩٧٠ كموزّع محلّي صغير، وتحوّلت اليوم إلى
              منصّة زراعية متكاملة تخدم آلاف المزارعين والشركات. ما يجمعنا منذ اليوم الأوّل
              إيمانٌ عميق بأنّ الزراعة الجيدة قرار علميّ قبل أن تكون منتجاً.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link to="/products" className="rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep">
                تصفّح منتجاتنا
              </Link>
              <Link to="/contact" className="rounded-md border border-border-strong px-5 py-3 text-sm font-bold hover:border-primary hover:text-primary">
                تحدّث مع مختص
              </Link>
            </div>
          </div>
          <div className="reveal-on-scroll overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={soilHands} alt="يدان تحملان تربة زراعية خصبة" width={720} height={584} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container-x grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
          {[
            { k: "+٥٠", v: "عاماً من الخبرة" },
            { k: "١٩٧٠", v: "سنة التأسيس" },
            { k: "+٤٠٠٠", v: "مزارع وشريك" },
            { k: "+١٢٠", v: "منتج معتمد" },
          ].map((s) => (
            <div key={s.v} className="px-4 py-6 text-center">
              <p className="font-display tnum text-2xl font-extrabold text-primary sm:text-3xl">{s.k}</p>
              <p className="mt-1 text-[12px] text-muted-foreground sm:text-sm">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="container-x py-10 lg:py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { t: "مهمّتنا", d: "تمكين كلّ مزارع — مهما كان حجمه — من اتخاذ قرارات علمية واضحة، عبر منتجات معتمدة ومعرفة مفتوحة باللغة العربية." },
            { t: "رؤيتنا", d: "أن نكون المرجع العربي الأوّل للحلول الزراعية والمعرفة المتخصّصة." },
          ].map((x, i) => (
            <div
              key={x.t}
              className={`reveal-on-scroll hover-lift relative overflow-hidden rounded-2xl border border-border p-6 sm:p-7 ${
                i === 0 ? "bg-card" : "bg-secondary/40"
              }`}
            >
              <span className={`absolute inset-y-0 right-0 w-1 ${i === 0 ? "bg-primary" : "bg-gold"}`} aria-hidden />
              <p className="eyebrow">{x.t}</p>
              <p className="pretty mt-3 text-lg leading-8 text-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-8 lg:py-12">
        <p className="eyebrow">قيمنا</p>
        <h2 className="display-2 mt-3 max-w-2xl">ما يحكم كل قرار نتّخذه.</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div key={v.title} className="reveal-on-scroll group bg-card p-5 transition-colors hover:bg-secondary/50 sm:p-6">
              <span className="font-display tnum text-xs font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-bold transition-colors group-hover:text-primary sm:text-lg">{v.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-x py-10 lg:py-14">
        <p className="eyebrow">المسيرة</p>
        <h2 className="display-2 mt-3 balance">محطّات صنعت النهضة الزراعية والتجارية كما هي اليوم.</h2>
        <ol className="relative mt-8 space-y-6 border-r border-border pr-6 sm:pr-8">
          {TIMELINE.map((t) => (
            <li key={t.year} className="reveal-on-scroll relative rounded-xl bg-card/60 p-4 transition-colors hover:bg-secondary/40 sm:p-5">
              <span className="absolute -right-[30px] top-5 grid h-5 w-5 place-items-center rounded-full border-4 border-background bg-primary sm:-right-[38px] sm:h-6 sm:w-6" />
              <p className="font-display tnum text-2xl font-extrabold text-gold sm:text-3xl">{t.year}</p>
              <h3 className="mt-1 text-lg font-bold sm:text-xl">{t.title}</h3>
              <p className="pretty mt-1.5 max-w-2xl text-sm leading-7 text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="container-x py-8 lg:py-12">
        <p className="eyebrow">الفريق</p>
        <h2 className="display-2 mt-3">قيادة بخلفية ميدانية، لا مكتبية.</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { n: "د. خالد منصور", r: "الرئيس التنفيذي" },
            { n: "م. لينا الزهراني", r: "مديرة وقاية النبات" },
            { n: "د. سامر العتيبي", r: "رئيس قسم التغذية" },
            { n: "م. عبدالله السبيعي", r: "مدير العمليات" },
          ].map((p) => (
            <div key={p.n} className="reveal-on-scroll hover-lift rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="grid aspect-square place-items-center rounded-xl bg-secondary ag-grain">
                <span className="font-display text-2xl font-extrabold text-primary/50">
                  {p.n.replace(/^(د\.|م\.)\s*/, "").charAt(0)}
                </span>
              </div>
              <p className="mt-3 text-sm font-bold sm:text-base">{p.n}</p>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{p.r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="container-x pb-14 pt-8 lg:pb-20">
        <p className="eyebrow">الشهادات والاعتمادات</p>
        <h2 className="display-2 mt-3 max-w-2xl">معايير عالميّة في كل خطوة.</h2>
        <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-6">
          {["ISO 9001", "ISO 14001", "SASO", "Global G.A.P", "OMRI", "HALAL"].map((c) => (
            <div key={c} className="grid h-20 place-items-center bg-card px-2 text-center text-xs font-bold text-foreground/70 transition-colors hover:text-primary sm:h-24 sm:text-sm">
              {c}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
