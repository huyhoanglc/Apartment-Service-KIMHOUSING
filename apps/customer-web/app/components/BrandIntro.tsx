"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const STORAGE_KEY = "kim_intro_seen";
const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL_MS = 3300;
const SKIP_VISIBLE_AFTER_MS = 600;

// Logo thật của công ty (/public/Logo_navbar.png - cũng chính là logo trên Navbar/Footer,
// đảm bảo phần intro bàn giao đúng sang logo thật, không phải hình vẽ minh hoạ).
const LOGO_WIDTH = 468;
const LOGO_HEIGHT = 196;
// Tỉ lệ chiều rộng phần biểu tượng ngôi sao trong logo - dùng để "mở khoá" riêng phần mark
// trước, rồi mới lộ dần sang "KIM HOUSING" (kỹ thuật wipe-reveal bằng overflow-hidden, không
// cắt ảnh thủ công).
const STAR_FRACTION = 0.27;
const DISPLAY_WIDTH = "clamp(220px, 60vw, 340px)";

export default function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Safari private mode / storage bị chặn - bỏ qua, intro sẽ phát lại lần sau, không phải lỗi nghiêm trọng
    }
    setExiting(true);
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      finishedRef.current = true;
      // Overlay được render giống hệt nhau ở server và lần render đầu tiên trên client (visible=true)
      // để tránh lệch hydrate - chỉ có thể biết "đã xem chưa" (sessionStorage/matchMedia) sau khi mount,
      // nên buộc phải setState trong effect này thay vì tính trực tiếp lúc render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const skipTimer = setTimeout(() => setCanSkip(true), SKIP_VISIBLE_AFTER_MS);
    const endTimer = setTimeout(finish, TOTAL_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(endTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!visible) return null;

  const handleExitComplete = () => {
    document.body.style.overflow = "";
    setVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Kim Housing"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 0.94 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Tia sáng vàng quét ngang màn hình */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-gold/25 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "320%" }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
          />

          <div className="flex flex-col items-center gap-6 px-6 text-center">
            {/* Logo thật: wipe-reveal - mark (ngôi sao) hiện trước, "KIM HOUSING" lộ dần sau,
                bằng overflow-hidden clip trên chính ảnh logo thật, không dựng lại bằng SVG/text giả. */}
            <div className="relative" style={{ width: DISPLAY_WIDTH }}>
              <motion.div
                className="overflow-hidden"
                initial={{ width: "0%", opacity: 0, scale: 0.85 }}
                animate={{
                  width: ["0%", `${STAR_FRACTION * 100}%`, `${STAR_FRACTION * 100}%`, "100%"],
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  width: { duration: 1.15, delay: 0.35, times: [0, 0.4, 0.55, 1], ease: EASE },
                  opacity: { duration: 0.5, delay: 0.35, ease: EASE },
                  scale: { duration: 0.5, delay: 0.35, ease: EASE },
                }}
                style={{ filter: "drop-shadow(0 0 26px rgba(212,175,55,0.35))" }}
              >
                <Image
                  src="/Logo_navbar.png"
                  alt="Kim Housing"
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  priority
                  style={{ width: DISPLAY_WIDTH, height: "auto", maxWidth: "none" }}
                />
              </motion.div>

              {/* Ánh sáng quét ngang qua logo sau khi đã lộ đủ chữ */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/60 to-transparent mix-blend-overlay"
                initial={{ x: "-150%", opacity: 0 }}
                animate={{ x: "150%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.7, delay: 1.55, ease: EASE }}
              />
            </div>

            <motion.p
              className="text-xs font-medium tracking-widest text-white/50 uppercase sm:text-sm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 1.85, ease: EASE }}
            >
              Your Trusted Serviced Apartment Partner
            </motion.p>
          </div>

          <AnimatePresence>
            {canSkip && (
              <motion.button
                type="button"
                onClick={finish}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-5 bottom-5 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition-colors duration-300 hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-to sm:right-8 sm:bottom-8"
                aria-label="Bỏ qua giới thiệu thương hiệu"
              >
                Bỏ qua
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
