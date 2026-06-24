import logoUrl from "@/assets/logo-nahda.png";

export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={logoUrl}
        alt="النهضة الزراعية والتجارية"
        className="h-11 w-11 sm:h-12 sm:w-12 object-contain shrink-0 drop-shadow-sm"
        loading="eager"
        decoding="async"
      />
      {showText && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-[15px] sm:text-base font-extrabold tracking-tight text-ink whitespace-nowrap">
            النهضة الزراعية
          </span>
          <span className="mt-0.5 text-[10px] sm:text-[11px] font-medium tracking-[0.14em] text-muted-foreground whitespace-nowrap">
            والتجارية
          </span>
        </span>
      )}
    </span>
  );
}
