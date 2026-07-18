"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/app/components/ui/Spinner";
import ErrorBoundary from "@/app/components/ui/ErrorBoundary";

// Chunk three.js/@react-three/fiber (khá nặng) chỉ được tải khi component này thực sự render -
// kết hợp với IntersectionObserver bên dưới để chỉ tải khi người dùng cuộn gần tới, không ảnh
// hưởng tốc độ tải các trang khác hay LCP của chính trang Về chúng tôi.
const BrandEmblem3D = dynamic(() => import("@/app/components/BrandEmblem3D"), {
  ssr: false,
  loading: () => <Spinner size="lg" />,
});

// Máy không hỗ trợ/chặn WebGL (chính sách trình duyệt doanh nghiệp, GPU bị blocklist, Safari tắt
// WebGL...) khiến Canvas của three.js throw ngay lúc mount. Không có boundary, lỗi này kéo sập cả
// section (thậm chí cả trang nếu route không có error.tsx riêng) - đúng dạng bug "section trắng ở
// laptop khi lên production" mà không phải máy nào cũng gặp nên khó tái hiện ở máy dev.
function StaticEmblemFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-20 w-20 sm:h-24 sm:w-24">
        <defs>
          <linearGradient id="fallback-star" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fcf6ba" />
            <stop offset="100%" stopColor="#b38728" />
          </linearGradient>
        </defs>
        <path d="M50 2 L58 40 L98 50 L58 60 L50 98 L42 60 L2 50 L42 40 Z" fill="url(#fallback-star)" />
      </svg>
    </div>
  );
}

export default function BrandEmblemLazy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // matchMedia chỉ có ở client, không tính được lúc render đầu (SSR) - không ảnh hưởng hydrate
    // vì khối 3D chỉ thực sự mount sau khi "visible" bật (IntersectionObserver bên dưới).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative flex aspect-square w-full items-center justify-center">
      {visible ? (
        <ErrorBoundary fallback={<StaticEmblemFallback />}>
          <BrandEmblem3D reduceMotion={reduceMotion} />
        </ErrorBoundary>
      ) : (
        <Spinner size="lg" />
      )}
    </div>
  );
}
