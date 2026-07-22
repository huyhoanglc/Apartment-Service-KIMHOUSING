import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Danh sách route tĩnh hiện có trong app router. Không liệt kê /apartments/[slug] vì trang
// danh sách /apartments hiện đang "Đang cập nhật" (chưa có link nội bộ nào trỏ tới phòng cụ thể) -
// khi tính năng tìm phòng lên chính thức, bổ sung generateSitemaps/fetch danh sách phòng tại đây.
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/history", changeFrequency: "yearly", priority: 0.5 },
  { path: "/about/social-responsibility", changeFrequency: "yearly", priority: 0.5 },
  { path: "/about/team", changeFrequency: "yearly", priority: 0.5 },
  { path: "/about/values", changeFrequency: "yearly", priority: 0.5 },
  { path: "/apartments", changeFrequency: "daily", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.4 },
  { path: "/news", changeFrequency: "weekly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
];

// Mỗi route tĩnh xuất ra 1 entry/locale (vi không tiền tố, en có tiền tố /en - đúng theo
// routing.localePrefix "as-needed"), kèm alternates.languages trỏ chéo qua lại - đúng pattern
// sitemap đa ngôn ngữ mà Next.js/Google khuyến nghị (mỗi URL tự khai luôn các bản dịch của nó).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return STATIC_ROUTES.flatMap(({ path, changeFrequency, priority }) => {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${SITE_URL}${getPathname({ locale, href: path })}`;
    }
    languages["x-default"] = `${SITE_URL}${getPathname({ locale: routing.defaultLocale, href: path })}`;

    return routing.locales.map((locale) => ({
      url: `${SITE_URL}${getPathname({ locale, href: path })}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
