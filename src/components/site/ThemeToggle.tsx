import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "nahda-theme";
const HINT_KEY = "nahda-theme-hint";

function getInitial(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return "light"; // default is always light; user opts in to dark
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const initial = getInitial();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);

    // One-time professional hint about dark mode
    try {
      const dismissed = window.localStorage.getItem(HINT_KEY);
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!dismissed && !stored) {
        const t = window.setTimeout(() => setShowHint(true), 1400);
        return () => window.clearTimeout(t);
      }
    } catch {
      /* storage disabled */
    }
  }, []);

  const dismissHint = () => {
    setShowHint(false);
    try {
      window.localStorage.setItem(HINT_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const setAndPersist = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setAndPersist(theme === "dark" ? "light" : "dark");

  const enableDarkFromHint = () => {
    setAndPersist("dark");
    dismissHint();
  };

  const label = theme === "dark" ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي";
  const isDark = mounted && theme === "dark";

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className={`grid h-10 w-10 place-items-center rounded-md border border-border-strong bg-background text-foreground/80 transition hover:bg-secondary hover:text-primary ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4.5 w-4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isDark ? (
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </>
          )}
        </svg>
      </button>

      {mounted && showHint && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-3 bottom-4 z-[60] mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-border-strong bg-card/95 p-3.5 shadow-elev backdrop-blur-md sm:inset-x-auto sm:right-6 sm:left-auto"
          style={{ animation: "nahda-hint-in 0.35s ease-out" }}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-bold text-ink">الوضع الداكن متاح</p>
            <p className="mt-0.5 text-[12.5px] leading-5 text-muted-foreground">
              يمكنك تفعيل الوضع الداكن لتجربة تصفح أهدأ للعين.
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={enableDarkFromHint}
                className="rounded-md bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground transition hover:bg-primary-deep"
              >
                تفعيل الآن
              </button>
              <button
                type="button"
                onClick={dismissHint}
                className="rounded-md border border-border px-3 py-1.5 text-[12px] font-semibold text-foreground/75 transition hover:bg-secondary"
              >
                ليس الآن
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={dismissHint}
            aria-label="إغلاق"
            className="-mr-1 -mt-1 grid h-7 w-7 place-items-center rounded-md text-foreground/50 hover:bg-secondary hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <style>{`@keyframes nahda-hint-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
      )}
    </>
  );
}
