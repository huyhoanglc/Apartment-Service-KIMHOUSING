"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

// AOS.init() chỉ cần gọi 1 lần, nhưng AOS.refresh() phải gọi lại mỗi khi đổi route
// (điều hướng phía client) vì layout không remount nên AOS không tự biết có section mới.
export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out", once: true, offset: 60 });
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
}
