import { createFileRoute, Link } from "@tanstack/react-router";
import { DIAGNOSTIC_CROPS, SYMPTOMS } from "@/lib/data";

export const Route = createFileRoute("/diseases/diagnostic/")({
  head: () => ({
    meta: [
      { title: "مركز تشخيص الأعراض حسب المحصول — النهضة الزراعية والتجارية" },
      { name: "description", content: "ابدأ بتشخيص مشكلة محصولك: اختر المحصول واستعرض الأعراض الشائعة والأسباب المحتملة وروابط الأمراض والعلاجات." },
      { property: "og:title", content: "مركز التشخيص الزراعي — النهضة الزراعية والتجارية" },
    ],
  }),
  component: DiagnosticIndex,
});

function DiagnosticIndex() {
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-10 sm:py-14">
          <Link to="/diseases" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
            <span>→</span> العودة إلى مركز الأمراض
          </Link>
          <p className="eyebrow mt-6">مركز التشخيص</p>
          <h1 className="display-1 mt-3 balance">شخّص مشكلة محصولك في ٣ خطوات</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8 balance">
            اختر المحصول الذي تزرعه، ثمّ حدّد العَرَض الظاهر، لينتقل بك النظام إلى الأسباب المحتملة مرتّبة بالاحتمالية مع منتجات وحلول مقترحة.
          </p>
        </div>
      </section>

      <section className="container-x py-10 sm:py-14">
        <h2 className="text-xl font-bold">١) اختر المحصول</h2>
        <p className="mt-1 text-sm text-muted-foreground">يدعم النظام {DIAGNOSTIC_CROPS.length} محصولاً، ويضمّ {SYMPTOMS.length} عَرَضاً مفهرساً.</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DIAGNOSTIC_CROPS.map((c) => (
            <Link
              key={c.id}
              to="/diseases/diagnostic/$crop"
              params={{ crop: c.id }}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-card"
            >
              <div>
                <h3 className="text-lg font-bold group-hover:text-primary">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground tnum">{c.commonSymptoms.length} أعراض مفهرسة</p>
              </div>
              <span className="text-2xl text-primary opacity-0 transition group-hover:opacity-100">←</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
