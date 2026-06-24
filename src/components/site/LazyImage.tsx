import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  wrapperClassName?: string;
};

export function LazyImage({ src, alt, className, wrapperClassName, loading = "lazy", ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-secondary", wrapperClassName)}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary via-muted to-secondary" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        {...rest}
      />
      {errored && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
          تعذّر تحميل الصورة
        </div>
      )}
    </div>
  );
}
