import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ARTICLES, type Article } from "@/lib/data";

export const Route = createFileRoute("/knowledge/$id")({
  head: ({ params }) => {
    const a = ARTICLES.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${a?.title ?? "مقال"} — زِراعة` },
        { name: "description", content: a?.excerpt ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const article = ARTICLES.find((x) => x.id === params.id);
    if (!article) throw notFound();
    return { article };
  },
  component: ArticleDetail,
});

function ArticleDetail() {
  const data = Route.useLoaderData() as { article: Article };
  const article = data.article;
  const related = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-12 lg:py-16">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/knowledge" className="hover:text-foreground">مركز المعرفة</Link>
            <span>/</span>
            <span className="text-foreground">{article.category}</span>
          </nav>
          <h1 className="display-1 mt-6 max-w-3xl">{article.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{article.author}</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{article.date}</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{article.readingTime}</span>
            <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground">{article.category}</span>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_3fr_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3 text-sm">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">مشاركة</p>
            {["نسخ الرابط", "X / تويتر", "لينكدإن", "واتساب"].map((s) => (
              <button key={s} className="block w-full rounded-md border border-border bg-card px-3 py-2 text-right hover:border-primary">{s}</button>
            ))}
          </div>
        </aside>

        <article className="space-y-6 text-base leading-9 text-foreground/90">
          <p className="text-lg leading-9 text-foreground">
            {article.excerpt}
          </p>
          <div className="aspect-[16/9] rounded-xl border border-border bg-secondary ag-grain" />
          <h2 className="display-2 mt-10">مقدّمة</h2>
          <p>
            في هذا الدليل العملي نستعرض المبادئ العلمية وراء {article.category}،
            مع خطوات تطبيقية يمكنك البدء بها مباشرة في حقلك. الهدف ليس تقديم
            نظريات معقّدة، بل ترجمتها إلى قرارات يومية واضحة.
          </p>
          <h2 className="display-2">المبادئ الأساسية</h2>
          <p>
            تنطلق أيّ خطّة ناجحة من فهم دقيق للظروف المحلّية: التربة، المياه،
            المناخ، والمحصول المستهدف. كل قرار يُبنى على بيانات قابلة للقياس،
            لا على افتراضات عامة منقولة من سياق مختلف.
          </p>
          <ul className="list-inside list-disc space-y-2 pr-2">
            <li>تشخيص دقيق قبل أيّ تدخّل.</li>
            <li>تدرّج في تطبيق التغييرات لمراقبة الأثر.</li>
            <li>توثيق النتائج لتحسين القرارات في المواسم القادمة.</li>
          </ul>
          <blockquote className="border-r-4 border-gold bg-gold/10 p-6 text-lg leading-9">
            "أهمّ ما يفرّق بين مزرعة ناجحة وأخرى متعثّرة هو الانضباط في التطبيق،
            لا حجم الميزانية."
          </blockquote>
          <h2 className="display-2">الخطوات العملية</h2>
          <p>
            اتّبع الترتيب التالي مع التزام دقيق بالتوقيت: لكلّ خطوة نافذة زمنية
            مثلى لا يجب تخطّيها. سجّل ملاحظاتك بعد كل عملية لتراكم خبرة قابلة
            للقياس.
          </p>
          <ol className="list-inside list-decimal space-y-3 pr-2">
            <li>تحليل أوّلي للتربة والمياه قبل بدء الموسم.</li>
            <li>إعداد جدولة التسميد والري وفقاً لنتائج التحليل.</li>
            <li>متابعة أسبوعية حقلية وتسجيل المؤشّرات الرئيسية.</li>
            <li>مراجعة ربع موسمية للخطّة وتعديلها عند الحاجة.</li>
          </ol>
          <h2 className="display-2">خاتمة</h2>
          <p>
            النجاح الزراعي ليس حظّاً، بل نتيجة مباشرة لقرارات صحيحة في الوقت
            المناسب. نأمل أن يكون هذا الدليل خطوة مفيدة في رحلتك. لمزيد من
            الدعم، تواصل مع فريق الاستشارة الفنية لدينا.
          </p>
          <div className="rounded-xl border border-border bg-secondary/60 p-6">
            <p className="text-sm font-semibold">هل تطبّق هذه الإرشادات في حقلك؟</p>
            <p className="mt-2 text-sm text-muted-foreground">تواصل مع مهندس زراعي لمراجعة خطّتك مجاناً.</p>
            <Link to="/contact" className="mt-4 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep">احجز استشارة</Link>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">في هذه الصفحة</p>
            <ul className="mt-4 space-y-2 text-sm">
              {["مقدّمة", "المبادئ الأساسية", "الخطوات العملية", "خاتمة"].map((s) => (
                <li key={s}><a href="#" className="text-foreground/75 hover:text-primary">{s}</a></li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="container-x pb-14">
        <div className="ribbon-divider mb-12" />
        <h2 className="display-2">قراءات مقترحة</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.id}
              to="/knowledge/$id"
              params={{ id: a.id }}
              className="group"
            >
              <div className="aspect-[5/4] rounded-xl border border-border bg-secondary ag-grain" />
              <p className="mt-4 text-xs text-muted-foreground">{a.category} · {a.readingTime}</p>
              <h3 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-primary">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
