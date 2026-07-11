import type { ReactElement } from "react";
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

type IconProps = { className?: string };

const SOCIALS: { label: string; href: string; Icon: (p: IconProps) => ReactElement }[] = [
  {
    label: "X (تويتر)",
    href: "#",
    Icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.77-6.24L4.8 22H2l7-8-7-12h6.914l4.31 5.77L18.244 2Zm-2.393 18h1.65L7.24 4h-1.77l10.381 16Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    Icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 21.5h4.51V8.5H.24v13ZM8.15 8.5h4.32v1.78h.06c.6-1.14 2.07-2.34 4.27-2.34 4.57 0 5.41 3 5.41 6.9v7.66h-4.5V15.7c0-1.68-.03-3.85-2.35-3.85-2.35 0-2.71 1.83-2.71 3.72v5.93H8.15V8.5Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    Icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "واتساب",
    href: "#",
    Icon: ({ className }) => (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.29-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.45ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.73.97 1-3.64-.24-.37a9.86 9.86 0 0 1-1.52-5.27c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.9 9.89Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-secondary/40">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" aria-hidden="true" />

      <div className="container-x relative grid gap-12 py-16 lg:grid-cols-[1.4fr_3fr] lg:gap-16 lg:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            منصة زراعية متكاملة تجمع بين الخبرة الميدانية والعلم الحديث،
            لمساعدة المزارعين والشركات على زيادة الإنتاجية وحماية المحاصيل
            بأفضل الحلول المتاحة في السوق.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground/75 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            منذ ١٩٧٠ · أكثر من نصف قرن من الخبرة الميدانية
          </div>
          <div className="mt-6 flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="group grid h-10 w-10 place-items-center rounded-full border border-border-strong bg-background/60 text-foreground/70 transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <s.Icon className="h-4 w-4" />
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
                      className="group inline-flex items-center gap-2 text-sm text-foreground/85 transition-colors hover:text-primary"
                    >
                      <span className="h-px w-3 bg-border-strong transition-all group-hover:w-5 group-hover:bg-primary" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-border bg-background/40 backdrop-blur">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} النهضة الزراعية والتجارية. جميع الحقوق محفوظة.</p>
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
