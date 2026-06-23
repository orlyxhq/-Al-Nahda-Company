import { createFileRoute } from "@tanstack/react-router";
import { TIMELINE, VALUES } from "@/lib/data";
import soilHands from "@/assets/soil-hands.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن زِراعة — قصّتنا ورؤيتنا" },
      { name: "description", content: "زِراعة شركة سعودية متخصّصة في الحلول الزراعية المتكاملة منذ عام ١٩٩٨." },
      { property: "og:title", content: "عن زِراعة — قصّتنا ورؤيتنا" },
      { property: "og:image", content: soilHands },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow">عن الشركة</p>
            <h1 className="display-1 mt-6">
              ٢٧ عاماً في خدمة الأرض،
              <br />ومن يعمل عليها.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              بدأت زِراعة عام ١٩٩٨ كموزّع محلّي صغير، وتحوّلت اليوم إلى منصّة
              زراعية متكاملة تخدم آلاف المزارعين والشركات في المنطقة. ما يجمعنا
              منذ اليوم الأوّل هو إيمان عميق بأنّ الزراعة الجيدة قرار علميّ
              قبل أن تكون منتجاً.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={soilHands} alt="" width={1400} height={1000} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="container-x py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { t: "مهمّتنا", d: "تمكين كلّ مزارع — مهما كان حجمه — من اتخاذ قرارات علمية واضحة، عبر منتجات معتمدة ومعرفة مفتوحة باللغة العربية." },
            { t: "رؤيتنا", d: "أن نكون المرجع العربي الأوّل للحلول الزراعية والمعرفة المتخصّصة بحلول ٢٠٣٠." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-8">
              <p className="eyebrow">{x.t}</p>
              <p className="mt-5 text-xl leading-9 text-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-12">
        <p className="eyebrow">قيمنا</p>
        <h2 className="display-2 mt-5 max-w-2xl">ما يحكم كل قرار نتّخذه.</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-card p-7">
              <h3 className="text-lg font-bold">{v.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-x py-20">
        <p className="eyebrow">المسيرة</p>
        <h2 className="display-2 mt-5">محطّات صنعت زِراعة كما هي اليوم.</h2>
        <ol className="relative mt-14 space-y-10 border-r border-border pr-8">
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -right-[37px] grid h-6 w-6 place-items-center rounded-full border-4 border-background bg-primary" />
              <p className="font-display text-3xl font-extrabold tnum text-gold">{t.year}</p>
              <h3 className="mt-2 text-xl font-bold">{t.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="container-x py-12">
        <p className="eyebrow">الفريق</p>
        <h2 className="display-2 mt-5">قيادة بخلفية ميدانية، لا مكتبية.</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "د. خالد منصور", r: "الرئيس التنفيذي" },
            { n: "م. لينا الزهراني", r: "مديرة وقاية النبات" },
            { n: "د. سامر العتيبي", r: "رئيس قسم التغذية" },
            { n: "م. عبدالله السبيعي", r: "مدير العمليات" },
          ].map((p) => (
            <div key={p.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="aspect-square rounded-xl bg-secondary ag-grain" />
              <p className="mt-5 font-bold">{p.n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="container-x py-20">
        <p className="eyebrow">الشهادات والاعتمادات</p>
        <h2 className="display-2 mt-5 max-w-2xl">معايير عالميّة في كل خطوة.</h2>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {["ISO 9001", "ISO 14001", "SASO", "Global G.A.P", "OMRI", "HALAL"].map((c) => (
            <div key={c} className="grid h-28 place-items-center bg-card text-sm font-bold text-foreground/70">
              {c}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
