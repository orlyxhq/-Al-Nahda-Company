import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES } from "@/lib/data";
import { LazyImage } from "@/components/site/LazyImage";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title: "مركز المعرفة — زِراعة" },
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
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x py-14 lg:py-20">
          <p className="eyebrow">مركز المعرفة</p>
          <h1 className="display-1 mt-5 max-w-3xl">
            علم زراعي قابل للتطبيق، مكتوب بلغة المزارع.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            مقالات وأدلّة من خبراء زِراعة في إدارة التربة، الري، التغذية،
            وقاية النبات، وأفضل الممارسات الموسمية.
          </p>
        </div>
      </section>

      <section className="container-x py-14">
        {/* featured */}
        <Link
          to="/knowledge/$id"
          params={{ id: featured.id }}
          className="group grid gap-0 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[1.2fr_1fr]"
        >
          <LazyImage
            src={featured.cover}
            alt={featured.title}
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

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
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
              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-md bg-secondary px-2 py-1 font-semibold text-foreground">
                  {a.category}
                </span>
                <span>{a.date}</span>
                <span className="h-1 w-1 rounded-full bg-border-strong" />
                <span>{a.readingTime}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold leading-snug transition group-hover:text-primary">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{a.excerpt}</p>
              <p className="mt-4 text-xs font-semibold text-foreground/80">{a.author}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
