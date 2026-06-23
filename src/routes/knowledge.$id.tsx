import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ARTICLES, type Article } from "@/lib/data";
import { LazyImage } from "@/components/site/LazyImage";

export const Route = createFileRoute("/knowledge/$id")({
  head: ({ params }) => {
    const a = ARTICLES.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${a?.title ?? "مقال"} — زِراعة` },
        { name: "description", content: a?.excerpt ?? "" },
        { property: "og:title", content: a?.title ?? "مقال — زِراعة" },
        { property: "og:description", content: a?.excerpt ?? "" },
        ...(a?.cover ? [{ property: "og:image", content: a.cover }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const article = ARTICLES.find((x) => x.id === params.id);
    if (!article) throw notFound();
    return { article };
  },
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="display-2">المقال غير موجود</h1>
      <Link to="/knowledge" className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
        العودة إلى مركز المعرفة
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-x py-24 text-center" role="alert">
      <h1 className="display-2">حدث خطأ</h1>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ArticleDetail,
});

function ArticleDetail() {
  const data = Route.useLoaderData() as { article: Article };
  const article = data.article;
  const router = useRouter();
  const related = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      {/* Hero with cover image */}
      <section className="relative border-b border-border">
        <LazyImage
          src={article.cover}
          alt={article.title}
          wrapperClassName="absolute inset-0"
          className="opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="container-x relative py-16 lg:py-24">
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => router.history.back()}
              className="rounded-md border border-border bg-background/80 px-3 py-1.5 font-semibold text-foreground backdrop-blur transition hover:border-primary hover:text-primary"
            >
              ← رجوع
            </button>
            <Link
              to="/knowledge"
              className="rounded-md border border-border bg-background/80 px-3 py-1.5 font-semibold text-foreground backdrop-blur transition hover:border-primary hover:text-primary"
            >
              مركز المعرفة
            </Link>
            <span className="rounded-md bg-gold/20 px-3 py-1.5 font-bold text-gold">
              {article.category}
            </span>
          </div>
          <h1 className="display-1 mt-8 max-w-4xl">{article.title}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-bold text-foreground">{article.author}</p>
              <p className="text-xs">{article.authorRole}</p>
            </div>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{article.date}</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_3fr_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3 text-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              مشاركة
            </p>
            {["نسخ الرابط", "X / تويتر", "لينكدإن", "واتساب"].map((s) => (
              <button
                key={s}
                className="block w-full rounded-md border border-border bg-card px-3 py-2 text-right hover:border-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </aside>

        <article className="space-y-8 text-base leading-9 text-foreground/90">
          <p className="text-lg leading-9 text-foreground">{article.intro}</p>

          {article.sections.map((sec) => (
            <div key={sec.heading} className="space-y-4">
              <h2 className="display-2">{sec.heading}</h2>
              {sec.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {sec.bullets && (
                <ul className="list-inside list-disc space-y-2 pr-2 marker:text-primary">
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <blockquote className="border-r-4 border-gold bg-gold/10 p-6 text-lg leading-9">
            "{article.pullQuote}"
          </blockquote>

          <div className="rounded-2xl border border-border bg-secondary/60 p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              خلاصات سريعة
            </p>
            <ul className="mt-4 space-y-3">
              {article.takeaways.map((t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-7">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-semibold">هل تطبّق هذه الإرشادات في حقلك؟</p>
            <p className="mt-2 text-sm text-muted-foreground">
              تواصل مع مهندس زراعي لمراجعة خطّتك مجاناً.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
            >
              احجز استشارة
            </Link>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              في هذه الصفحة
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {article.sections.map((s) => (
                <li key={s.heading}>
                  <a href="#" className="text-foreground/75 hover:text-primary">
                    {s.heading}
                  </a>
                </li>
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
              <LazyImage
                src={a.image}
                alt={a.title}
                wrapperClassName="aspect-[5/4] rounded-xl border border-border"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <p className="mt-4 text-xs text-muted-foreground">
                {a.category} · {a.readingTime}
              </p>
              <h3 className="mt-2 text-lg font-bold leading-snug transition group-hover:text-primary">
                {a.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
