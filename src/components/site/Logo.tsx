import logoUrl from "@/assets/logo-nahda.webp";

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
        <span className="flex flex-col leading-tight min-w-0">
          <span className="font-display text-[13px] sm:text-[15px] font-extrabold tracking-tight text-ink whitespace-nowrap">
            النهضة الزراعية والتجارية
          </span>
          <span className="mt-0.5 text-[10px] sm:text-[11.5px] font-semibold tracking-[0.06em] text-primary/85 whitespace-nowrap">
            Al-Nahda For Agrochemicals AND Trading
          </span>

        </span>
      )}
    </span>
  );
}
