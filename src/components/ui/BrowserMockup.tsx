import Image from "next/image";
import type { Project } from "@/config/projects";

type Variant = Project["mockup"];

/** Neutral wireframe "page" used until a real screenshot is supplied. */
function Wire({ variant }: { variant: Variant }) {
  const bar = "rounded-sm bg-white/10";
  const acc = "rounded-sm bg-accent";
  return (
    <div className="flex h-full flex-col gap-[4%] p-[4%]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className={`h-2 w-[14%] ${acc}`} />
        <div className="flex gap-[3%]">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 w-8 ${bar}`} />
          ))}
        </div>
      </div>

      {variant === "shop" ? (
        <div className="grid flex-1 grid-cols-4 gap-[2.5%]">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className={`flex-1 ${i === 1 ? "bg-accent/70" : "bg-white/[0.07]"} rounded`} />
              <div className={`h-1.5 w-3/4 ${bar}`} />
              <div className={`h-1.5 w-1/3 ${i % 3 === 0 ? acc : bar}`} />
            </div>
          ))}
        </div>
      ) : variant === "wix" ? (
        <div className="grid flex-1 grid-cols-5 gap-[3%]">
          <div className="col-span-3 flex flex-col justify-center gap-2">
            <div className={`h-4 w-4/5 ${bar}`} />
            <div className={`h-4 w-3/5 ${bar}`} />
            <div className={`mt-2 h-1.5 w-full ${bar}`} />
            <div className={`h-1.5 w-5/6 ${bar}`} />
            <div className={`mt-2 h-5 w-1/3 ${acc}`} />
          </div>
          <div className="col-span-2 rounded-xl bg-gradient-to-br from-accent/60 to-white/5" />
        </div>
      ) : variant === "custom" ? (
        <div className="grid flex-1 grid-cols-6 grid-rows-3 gap-[2.5%]">
          <div className="col-span-4 row-span-2 rounded bg-white/[0.07]" />
          <div className="col-span-2 rounded bg-accent/70" />
          <div className="col-span-2 rounded bg-white/[0.07]" />
          <div className="col-span-2 rounded bg-white/[0.07]" />
          <div className="col-span-2 rounded bg-white/[0.07]" />
          <div className="col-span-2 rounded bg-white/[0.07]" />
        </div>
      ) : (
        <>
          <div className="relative flex flex-[1.3] flex-col justify-center gap-2 overflow-hidden rounded-lg bg-white/[0.06] p-[5%]">
            <div className={`h-3.5 w-3/5 ${bar}`} />
            <div className={`h-3.5 w-2/5 ${bar}`} />
            <div className={`mt-1 h-5 w-24 ${acc}`} />
            {variant === "bakery" && <div className="absolute right-0 top-0 h-full w-1/3 bg-accent/15" />}
          </div>
          <div className="grid flex-1 grid-cols-3 gap-[3%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5 rounded bg-white/[0.05] p-[8%]">
                <div className={`h-2 w-2/3 ${i === 0 ? acc : bar}`} />
                <div className={`h-1.5 w-full ${bar}`} />
                <div className={`h-1.5 w-4/5 ${bar}`} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function BrowserMockup({
  variant = "wordpress",
  image,
  alt,
  label = "yourproject.com",
  className = "",
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  variant?: Variant;
  image?: string;
  alt?: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface2 px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto w-full max-w-[60%] truncate rounded-md bg-black/50 px-3 py-1 text-center font-mono text-[10px] text-muted">
          {label}
        </div>
        <div className="w-10" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] w-full bg-gradient-to-b from-surface to-bg">
        {image ? (
          <Image src={image} alt={alt ?? ""} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        ) : (
          <Wire variant={variant} />
        )}
      </div>
    </div>
  );
}
