import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "المنتجات",
    links: [
      { to: "/products/fertilizers", label: "الأسمدة" },
      { to: "/products/pesticides", label: "المبيدات" },
      { to: "/products/seeds", label: "البذور والشتلات" },
      { to: "/products", label: "جميع الفئات" },
    ],
  },
  {
    title: "المعرفة",
    links: [
      { to: "/diseases", label: "الأمراض الزراعية" },
      { to: "/knowledge", label: "الأدلة والمقالات" },
      { to: "/knowledge", label: "التوصيات الموسمية" },
      { to: "/knowledge", label: "أفضل الممارسات" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { to: "/about", label: "من نحن" },
      { to: "/about", label: "رؤيتنا ومهمّتنا" },
      { to: "/about", label: "فريق العمل" },
      { to: "/contact", label: "التواصل" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_3fr] lg:gap-16 lg:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            منصة زراعية متكاملة تجمع بين الخبرة الميدانية والعلم الحديث،
            لمساعدة المزارعين والشركات على زيادة الإنتاجية وحماية المحاصيل
            بأفضل الحلول المتاحة في السوق.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {["x", "in", "ig", "wa"].map((s) => (
              <a
                key={s}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-md border border-border-strong text-sm font-bold text-foreground/70 transition hover:border-primary hover:text-primary"
                aria-label={s}
              >
                {s === "x" ? "𝕏" : s === "in" ? "in" : s === "ig" ? "○" : "☎"}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-bold tracking-[0.18em] text-foreground/60 uppercase">
                {c.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/85 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} زِراعة. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground">سياسة الخصوصية</a>
            <a href="#" className="hover:text-foreground">شروط الاستخدام</a>
            <a href="#" className="hover:text-foreground">الشهادات والاعتمادات</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
