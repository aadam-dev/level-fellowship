import Image from "next/image";
import { cn } from "@/lib/utils";

export function MarketingImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
