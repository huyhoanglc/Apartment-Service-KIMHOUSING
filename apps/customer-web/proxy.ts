import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 đổi tên file convention middleware.ts -> proxy.ts (hàm export vẫn tương thích
// signature cũ - next-intl's createMiddleware trả về đúng dạng request => response mà proxy cần).
export default createMiddleware(routing);

export const config = {
  // Bỏ qua /api, nội bộ Next (_next, _vercel) và mọi path có dấu chấm (robots.txt, sitemap.xml,
  // icon.png, apple-icon.png...) - các file này nằm ngoài app/[locale], không cần gắn locale.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
