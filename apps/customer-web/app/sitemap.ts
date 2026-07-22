import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
