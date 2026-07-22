"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/app/components/ui/Button";

export interface HeroSlide {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("heroCarousel");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  return (
    <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative aspect-4/3 overflow-hidden rounded-card border border-white/10 bg-linear-to-br from-navy-light via-navy to-black/80 shadow-soft-lg sm:aspect-video lg:aspect-4/3">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.25) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold-from/10 blur-3xl" />
        <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
          <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20" aria-hidden>
            <defs>
              <linearGradient id="hero-star" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fcf6ba" />
                <stop offset="100%" stopColor="#b38728" />
              </linearGradient>
            </defs>
            <path
              d="M50 2 L58 40 L98 50 L58 60 L50 98 L42 60 L2 50 L42 40 Z"
              fill="url(#hero-star)"
            />
          </svg>
          <p className="text-xs font-semibold tracking-[0.3em] text-white/50 uppercase">
            Kim Housing
          </p>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t("prevSlide")}
          className="absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-to"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t("nextSlide")}
          className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-to"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t("goToSlide", { index: i + 1 })}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-gold" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative min-h-64 overflow-hidden rounded-card bg-white p-6 shadow-soft-lg sm:p-8 lg:-ml-16 dark:bg-navy-light">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">{slide.kicker}</p>
            <h1 className="mt-2 text-2xl leading-tight font-bold text-navy sm:text-3xl dark:text-white">
              {slide.title}
            </h1>
            <p className="mt-3 text-sm text-navy/70 sm:text-base dark:text-white/70">{slide.description}</p>
            <Button href={slide.ctaHref} className="mt-5">
              {slide.ctaLabel}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
