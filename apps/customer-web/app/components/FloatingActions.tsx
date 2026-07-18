"use client";

import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const HOTLINE_DISPLAY = "0394 008 700";
const HOTLINE_TEL = "tel:0394008700";
// Chưa có link Zalo OA riêng - dùng link chat trực tiếp theo số hotline (định dạng zalo.me/<số
// điện thoại>), đổi sang link OA chính thức khi có.
const ZALO_HREF = "https://zalo.me/0394008700";

const buttonBase =
  "flex h-12 w-12 items-center justify-center rounded-full shadow-soft-lg transition-transform duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-to focus-visible:ring-offset-2";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setShowTop(latest > 480));

  function scrollToTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-center gap-3 sm:right-8 sm:bottom-8">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            aria-label="Lên đầu trang"
            className={`${buttonBase} bg-white text-navy dark:bg-navy-light dark:text-white`}
          >
            <ArrowUp size={20} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={ZALO_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo với Kim Housing"
        className={`${buttonBase} bg-[#0068FF] text-white`}
      >
        <MessageCircle size={22} strokeWidth={2} />
      </a>

      <a
        href={HOTLINE_TEL}
        aria-label={`Gọi hotline ${HOTLINE_DISPLAY}`}
        className={`${buttonBase} animate-pulse-ring bg-emerald-500 text-white`}
      >
        <Phone size={20} strokeWidth={2} />
      </a>
    </div>
  );
}
