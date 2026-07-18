"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/app/components/ui/Spinner";

// Chunk three.js/@react-three/fiber (khá nặng) chỉ được tải khi component này thực sự render -
// kết hợp với IntersectionObserver bên dưới để chỉ tải khi người dùng cuộn gần tới, không ảnh
// hưởng tốc độ tải các trang khác hay LCP của chính trang Về chúng tôi.
const BrandEmblem3D = dynamic(() => import("@/app/components/BrandEmblem3D"), {
  ssr: false,
  loading: () => <Spinner size="lg" />,
});

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
      {visible ? <BrandEmblem3D reduceMotion={reduceMotion} /> : <Spinner size="lg" />}
    </div>
  );
}
