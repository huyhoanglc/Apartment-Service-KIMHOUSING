import { defineRouting } from "next-intl/routing";

// vi giữ URL không tiền tố (khớp với sitemap/canonical đã publish trước đó trong dự án),
// en dùng tiền tố /en. localePrefix "as-needed" tự động áp dụng đúng quy tắc này.
export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
