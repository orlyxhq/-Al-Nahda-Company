import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — زِراعة" },
      { name: "description", content: "تواصل مع فريق زِراعة عبر الهاتف أو واتساب أو زيارة فروعنا." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14 lg:py-20">
          <p className="eyebrow">تواصل معنا</p>
          <h1 className="display-1 mt-5 max-w-3xl">نحن أقرب إليك ممّا تتصوّر.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            مهندسونا الزراعيون متاحون للرد على استفساراتك وتقديم استشارة مبدئية
            دون أي التزام. اختر القناة الأنسب لك.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-2xl font-bold">أرسل لنا رسالة</h2>
          <p className="mt-2 text-sm text-muted-foreground">سنرد عليك خلال يوم عمل واحد.</p>

          <form className="mt-8 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="الاسم الكامل" placeholder="مثال: أحمد بن محمد" />
              <Field label="رقم الجوال" placeholder="05xxxxxxxx" />
            </div>
            <Field label="البريد الإلكتروني" placeholder="name@email.com" type="email" />
            <Field label="المحصول / المنطقة" placeholder="مثال: طماطم — القصيم" />
            <div>
              <label className="mb-2 block text-sm font-semibold">طبيعة الاستفسار</label>
              <select className="w-full rounded-md border border-border-strong bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none">
                <option>استشارة فنية</option>
                <option>عرض سعر منتجات</option>
                <option>شراكة تجارية</option>
                <option>دعم فني سابق</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">رسالتك</label>
              <textarea rows={5} className="w-full rounded-md border border-border-strong bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" placeholder="اشرح لنا حالتك بإيجاز..." />
            </div>
            <button type="button" className="rounded-md bg-primary px-6 py-4 text-sm font-bold text-primary-foreground hover:bg-primary-deep">
              إرسال الرسالة
            </button>
          </form>
        </div>

        {/* Info cards */}
        <div className="space-y-4">
          <InfoCard icon="☎" title="اتصال هاتفي" lines={["خدمة عملاء: ٩٢٠٠ ٠٠٠ ٠٠", "السبت — الخميس · ٨ص — ٨م"]} />
          <InfoCard icon="✺" title="واتساب الأعمال" lines={["+٩٦٦ ٥٠ ٠٠٠ ٠٠٠٠", "رد فوري خلال ساعات العمل"]} cta="ابدأ المحادثة" />
          <InfoCard icon="✉" title="البريد الإلكتروني" lines={["info@ziraa.sa", "support@ziraa.sa"]} />
          <InfoCard icon="◉" title="المقر الرئيسي" lines={["طريق الملك فهد، الرياض", "المملكة العربية السعودية"]} />
        </div>
      </section>

      {/* Map */}
      <section className="container-x pb-20">
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-[16/7] bg-secondary ag-grain">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-xl border border-border bg-background/95 px-6 py-4 text-center shadow-card backdrop-blur">
                <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">الموقع</p>
                <p className="mt-2 font-bold">طريق الملك فهد · الرياض</p>
                <p className="mt-1 text-xs text-muted-foreground">خريطة تفاعلية ستُفعّل عند الإطلاق</p>
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
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <input
        {...props}
        className="w-full rounded-md border border-border-strong bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function InfoCard({ icon, title, lines, cta }: { icon: string; title: string; lines: string[]; cta?: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="font-bold">{title}</p>
        {lines.map((l, i) => (
          <p key={i} className={`mt-1 text-sm ${i === 0 ? "text-foreground/85" : "text-muted-foreground"}`}>{l}</p>
        ))}
        {cta && (
          <button className="mt-3 text-sm font-bold text-primary">{cta} ←</button>
        )}
      </div>
    </div>
  );
}
