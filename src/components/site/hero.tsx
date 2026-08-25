import { useEffect, useRef, useState } from "react";
import heroModel from "@/assets/hero-model.jpg";
import { applyFilter } from "@/lib/site-data";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setOffset(Math.max(-40, Math.min(40, -rect.top * 0.08)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-cream">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroModel}
          alt="Model wearing a handcrafted 22K gold necklace and earrings from RAS Jewellers"
          width={1920}
          height={1088}
          className="h-full w-full scale-110 object-cover object-[70%_center] will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-cream/10 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-x flex min-h-[520px] items-center py-20 md:min-h-[680px]">
        <div className="max-w-lg">
          <span className="animate-hero-in block h-px w-16 bg-gold-dark/60 [animation-delay:80ms]" />
          <h1 className="animate-hero-in mt-7 font-serif text-4xl leading-[1.1] tracking-tight text-foreground [animation-delay:200ms] md:text-6xl">
            Crafting Trust<br />Since 2000
          </h1>
          <p className="animate-hero-in mt-6 max-w-md text-sm leading-relaxed text-muted-foreground [animation-delay:360ms] md:text-base">
            For over 25 years, RAS Jewellers has been a part of life&apos;s most
            precious moments. Discover timeless gold and silver jewellery designed
            with elegance and trust.
          </p>
          <div className="animate-hero-in mt-9 flex flex-wrap gap-3 [animation-delay:520ms]">
            <button
              type="button"
              onClick={() => applyFilter({ kind: "all" })}
              className="rounded-full bg-primary px-8 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-[0_10px_30px_-12px_var(--gold-dark)] transition-transform hover:scale-[1.03]"
            >
              Explore Collection
            </button>
            <a
              href="#about"
              className="rounded-full border border-gold-dark/50 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-gold-dark transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Visit Our Showroom
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
