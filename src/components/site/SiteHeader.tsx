import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "الرئيسية" },
  { to: "/products", label: "المنتجات" },
  { to: "/diseases", label: "الأمراض والحلول" },
  { to: "/knowledge", label: "مركز المعرفة" },
  { to: "/about", label: "عن الشركة" },
  { to: "/contact", label: "تواصل" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const router = useRouter();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showBack = pathname !== "/";

  const goBack = () => {
    if (window.history.length > 1) {
      router.history.back();
      return;
    }
    router.navigate({ to: "/" });
  };

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const next = window.scrollY > 12;
        if (scrolledRef.current !== next) {
          scrolledRef.current = next;
          setScrolled(next);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/50 backdrop-blur-xl"
          : "border-b border-transparent bg-background/50 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-foreground/75 hover:text-foreground" }}
              className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {showBack && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-background px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <span>→</span>
              رجوع
            </button>
          )}
          <Link
            to="/diseases"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            تشخيص مرض
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:bg-primary-deep"
          >
            تحدّث مع خبير
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {showBack && (
            <button
              type="button"
              aria-label="رجوع"
              onClick={goBack}
              className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background text-foreground"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <button
            aria-label="فتح القائمة"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-primary" }}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/diseases"
                onClick={() => setOpen(false)}
                className="rounded-md border border-border-strong px-3 py-2.5 text-center text-sm font-semibold"
              >
                تشخيص مرض
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                تحدّث مع خبير
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
