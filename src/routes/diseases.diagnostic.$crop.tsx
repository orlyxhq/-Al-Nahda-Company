import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DIAGNOSTIC_CROPS, SYMPTOMS, type CropDef, type Symptom } from "@/lib/data";

export const Route = createFileRoute("/diseases/diagnostic/$crop")({
  head: ({ params }) => {
    const c = DIAGNOSTIC_CROPS.find((x) => x.id === params.crop);
    return {
      meta: [
        { title: `أعراض ${c?.name ?? "المحصول"} — مركز التشخيص | النهضة الزراعية والتجارية` },
        { name: "description", content: `استعرض الأعراض الشائعة على ${c?.name ?? "هذا المحصول"} وحدّد الأسباب المحتملة.` },
      ],
    };
  },
  loader: ({ params }): { crop: CropDef; symptoms: Symptom[] } => {
    const crop = DIAGNOSTIC_CROPS.find((x) => x.id === params.crop);
    if (!crop) throw notFound();
    const symptoms = crop.commonSymptoms
      .map((sid) => SYMPTOMS.find((s) => s.id === sid))
      .filter((s): s is Symptom => Boolean(s));
    return { crop, symptoms };
  },
  component: CropDiagnostic,
});

function CropDiagnostic() {
  const { crop, symptoms } = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-8 sm:py-12">
          <Link to="/diseases/diagnostic" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
            <span>→</span> اختر محصولاً آخر
          </Link>
          <nav className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/diseases" className="hover:text-foreground">مركز الأمراض</Link>
            <span>/</span>
            <Link to="/diseases/diagnostic" className="hover:text-foreground">مركز التشخيص</Link>
            <span>/</span>
            <span className="text-foreground">{crop.name}</span>
          </nav>

          <p className="eyebrow mt-6">٢) اختر العَرَض الظاهر</p>
          <h1 className="display-2 mt-3 balance">الأعراض الشائعة على {crop.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/80 sm:text-base sm:leading-8 balance">
            انقر العَرَض الأقرب لما تراه على نباتاتك. ستجد قائمة بالأسباب المحتملة مرتّبة حسب الاحتمالية، مع روابط لصفحات الأمراض والمنتجات الموصى بها.
          </p>
        </div>
      </section>

      <section className="container-x py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {symptoms.map((s) => (
            <Link
              key={s.id}
              to="/diseases/symptom/$id"
              params={{ id: s.id }}
              className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold transition group-hover:text-primary">{s.name}</h3>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/70 tnum">
                  {s.possibleCauses.length} سبباً
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground balance">{s.description}</p>
            </Link>
          ))}
        </div>

        {symptoms.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            لا توجد أعراض مفهرسة لهذا المحصول بعد.
          </div>
        )}
      </section>
    </>
  );
}
