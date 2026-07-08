import logoUrl from "@/assets/logo-nahda.webp";

export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-2 sm:gap-2.5 ${className}`}>
      <img
        src={logoUrl}
        alt="النهضة الزراعية والتجارية"
        className="h-10 w-10 sm:h-12 sm:w-12 object-contain shrink-0 drop-shadow-sm"
        loading="eager"
        decoding="async"
      />
      {showText && (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="font-display text-[12px] sm:text-[15px] font-extrabold tracking-tight text-ink truncate">
            النهضة الزراعية والتجارية
          </span>
          <span className="mt-0.5 hidden sm:inline text-[11.5px] font-semibold tracking-[0.06em] text-primary/85 truncate">
            Al-Nahda For Agrochemicals AND Trading
          </span>
        </span>
      )}
    </span>
  );
}
