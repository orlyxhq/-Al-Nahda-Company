export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21V10" />
          <path d="M12 10c0-4 3-7 7-7-.2 4-3 7-7 7Z" />
          <path d="M12 13c0-3-2.5-5-5.5-5C6.7 11 9 13 12 13Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-ink">زِراعة</span>
        <span className="mt-0.5 text-[10px] font-medium tracking-[0.22em] text-muted-foreground">
          AGRITECH
        </span>
      </span>
    </span>
  );
}
