import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — النهضة الزراعية والتجارية" },
      { name: "description", content: "تواصل مع فريق النهضة الزراعية والتجارية عبر الهاتف أو واتساب أو زيارة فروعنا للحصول على استشارة زراعية." },
      { property: "og:title", content: "تواصل معنا — النهضة الزراعية والتجارية" },
      { property: "og:description", content: "مهندسونا الزراعيون متاحون للرد على استفساراتك وتقديم استشارة مبدئية دون التزام." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-secondary/40">
        <div className="absolute inset-0 bg-dots opacity-40" aria-hidden />
        <div className="container-x relative py-10 lg:py-14">
          <p className="eyebrow">تواصل معنا</p>
          <h1 className="display-1 mt-3 max-w-3xl balance">نحن أقرب إليك ممّا تتصوّر.</h1>
          <p className="pretty mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            مهندسونا الزراعيون متاحون للرد على استفساراتك وتقديم استشارة مبدئية
            دون أي التزام. اختر القناة الأنسب لك.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-6 py-10 lg:grid-cols-[1.4fr_1fr] lg:gap-8 lg:py-14">
        {/* Form */}
        <div className="reveal-on-scroll relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-7">
          <span className="absolute inset-y-0 right-0 w-1 bg-primary" aria-hidden />
          <h2 className="text-xl font-bold sm:text-2xl">أرسل لنا رسالة</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">سنرد عليك خلال يوم عمل واحد.</p>

          <form className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="الاسم الكامل" placeholder="مثال: أحمد بن محمد" />
              <Field label="رقم الجوال" placeholder="7xxxxxxxx" />
            </div>
            <Field label="البريد الإلكتروني" placeholder="name@email.com" type="email" />
            <Field label="المحصول / المنطقة" placeholder="مثال: طماطم — صنعاء" />
            <div>
              <label className="mb-1.5 block text-sm font-semibold">طبيعة الاستفسار</label>
              <select className="w-full rounded-md border border-border-strong bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none">
                <option>استشارة فنية</option>
                <option>عرض سعر منتجات</option>
                <option>شراكة تجارية</option>
                <option>دعم فني سابق</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">رسالتك</label>
              <textarea rows={5} className="w-full rounded-md border border-border-strong bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" placeholder="اشرح لنا حالتك بإيجاز..." />
            </div>
            <button type="button" className="rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-deep">
              إرسال الرسالة
            </button>
          </form>
        </div>

        {/* Info cards */}
        <div className="space-y-3">
          <InfoCard icon="☎" title="اتصال هاتفي" lines={["خدمة العملاء: ٧٧٧ ٠٠٠ ٠٠٠", "السبت — الخميس · ٨ص — ٨م"]} />
          <InfoCard icon="✺" title="واتساب الأعمال" lines={["+٩٦٧ ٧٧٧ ٠٠٠ ٠٠٠", "رد فوري خلال ساعات العمل"]} cta="ابدأ المحادثة" />
          <InfoCard icon="✉" title="البريد الإلكتروني" lines={["info@alnahda-agri.com", "support@alnahda-agri.com"]} />
          <InfoCard icon="◉" title="المقر الرئيسي" lines={["الشارع الرئيسي · صنعاء", "الجمهورية اليمنية"]} />
        </div>
      </section>

      {/* Map */}
      <section className="container-x pb-14 lg:pb-20">
        <div className="reveal-on-scroll overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-[16/9] bg-secondary ag-grain sm:aspect-[16/7]">
            <div className="absolute inset-0 grid place-items-center p-4">
              <div className="rounded-xl border border-border bg-background/95 px-5 py-4 text-center shadow-card backdrop-blur">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">الموقع</p>
                <p className="mt-1.5 text-sm font-bold sm:text-base">الشارع الرئيسي · صنعاء</p>
                <p className="mt-1 text-xs text-muted-foreground">خريطة تفاعلية ستُفعّل قريباً</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input
        {...props}
        className="w-full rounded-md border border-border-strong bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function InfoCard({ icon, title, lines, cta }: { icon: string; title: string; lines: string[]; cta?: string }) {
  return (
    <div className="hover-lift flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 sm:p-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold sm:text-base">{title}</p>
        {lines.map((l, i) => (
          <p key={i} className={`mt-0.5 text-[13px] sm:text-sm ${i === 0 ? "text-foreground/85" : "text-muted-foreground"}`}>{l}</p>
        ))}
        {cta && <button className="mt-2 text-sm font-bold text-primary">{cta} ←</button>}
      </div>
    </div>
  );
}
