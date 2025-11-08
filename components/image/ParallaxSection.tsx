"use client";
import * as React from "react";
import Image from "next/image";

type Props = {
  id?: string;
  src: string;
  minHeight?: number;
  strength?: number;
  focalY?: number;            // 0..1
  gradient?: string;
  overlay?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;         // classes du wrapper "inner" (largeur, paddings, etc.)
  center?: boolean;           // centre verticalement (par défaut: true)
  children?: React.ReactNode;
};

export default function ParallaxSection({
  id,
  src,
  minHeight = 520,
  strength = 0.25,
  focalY = 0.35,
  gradient = "linear-gradient(to top, rgba(13,27,42,0.4) 0%, rgba(23,42,69,0.4) 100%)",
  overlay = false,
  priority = false,
  sizes = "100vw",
  className = "mx-auto w-full max-w-[1200px] px-4 sm:px-10 py-10 md:py-16 text-center flex flex-col items-center gap-6",
  center = true,
  children,
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const onScroll = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = el.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const centerAbs = start + rect.height / 2;
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const dy = viewportCenter - centerAbs;
      const y = dy * strength;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(y));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <section id={id} className="w-full">
      <div ref={ref} className="relative w-full overflow-clip" style={{ minHeight }}>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 will-change-transform pointer-events-none"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          <Image
            src={src}
            id={id}
            alt=""
            fill
            priority={priority}
            quality={90}
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: `center ${Math.round(focalY * 100)}%` }}
          />
          {!!overlay &&
            <div id={`${id}-overlay`} className="absolute inset-0" style={{ background: gradient }} />
          }
        </div>

        <div
          className={`${className} ${center ? "grid place-items-center" : ""}`}
          // clé: l'inner a la même min-height => la grille peut centrer verticalement
          style={{ minHeight }}
        >
          {/* si tu veux du gap entre éléments, garde un conteneur flex ici */}
          <div className="flex flex-col items-center gap-6 text-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
