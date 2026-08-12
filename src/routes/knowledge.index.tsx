import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES } from "@/lib/data";
import { LazyImage } from "@/components/site/LazyImage";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title: "مركز المعرفة — النهضة الزراعية والتجارية" },
      {
        name: "description",
        content:
          "مقالات وأدلّة عملية في إدارة التربة والمياه والوقاية والإدارة الموسمية للمحاصيل.",
      },
    ],
  }),
  component: KnowledgeIndex,
});

function KnowledgeIndex() {
  const [featured, ...rest] = ARTICLES;
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-secondary/30">
        <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" />
        <div className="container-x relative py-12 lg:py-20">
          <p className="eyebrow">مركز المعرفة</p>
          <h1 className="display-1 mt-5 max-w-3xl text-[1.9rem] sm:text-[2.6rem] lg:text-[4.75rem]">
            علم زراعي قابل للتطبيق، مكتوب بلغة المزارع.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            مقالات وأدلّة من خبراء النهضة الزراعية والتجارية في إدارة التربة، الري، التغذية،
            وقاية النبات، وأفضل الممارسات الموسمية.
          </p>
          <div className="divider-leaf mt-8 max-w-md" />
        </div>
      </section>


      <section className="container-x section-pad-sm">
        {/* featured */}
        <Link
          to="/knowledge/$id"
          params={{ id: featured.id }}
          className="group reveal-on-scroll surface-elevated grid gap-0 overflow-hidden md:grid-cols-[1.2fr_1fr]"
        >

          <LazyImage
            src={featured.cover}
            alt={featured.title}
              loading="eager"
              fetchPriority="high"
            wrapperClassName="aspect-[4/3] md:aspect-auto md:h-full"
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="flex flex-col justify-center p-8 md:p-10">
            <span className="self-start rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              مقال مميّز
            </span>
            <h2 className="display-2 mt-5 transition group-hover:text-primary">
              {featured.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{featured.author}</span>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <span>{featured.date}</span>
              <span className="h-1 w-1 rounded-full bg-border-strong" />
              <span>{featured.readingTime}</span>
            </div>
          </div>
        </Link>

        <div className="mt-10 flex items-end justify-between border-b border-border pb-4">
          <h2 className="display-3">أحدث المقالات</h2>
          <span className="text-sm text-muted-foreground tnum">{rest.length} مقال</span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Link
              key={a.id}
              to="/knowledge/$id"
              params={{ id: a.id }}
              className="group reveal-on-scroll hover-lift flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/60"
              style={{ transitionDelay: `${(i % 6) * 70}ms` }}
            >
              <div className="relative">
                <LazyImage
                  src={a.image}
                  alt={a.title}
                  wrapperClassName="aspect-[5/4]"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 start-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-bold text-primary backdrop-blur">
                  {a.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{a.date}</span>
                  <span className="h-1 w-1 rounded-full bg-border-strong" />
                  <span>{a.readingTime}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug transition group-hover:text-primary">
                  {a.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{a.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <p className="text-xs font-semibold text-foreground/80">{a.author}</p>
                  <span className="text-sm text-primary opacity-0 transition group-hover:opacity-100">←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </>
  );
}
