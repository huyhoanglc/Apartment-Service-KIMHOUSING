import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";

// customer-web hiện không có route /admin hay /api riêng (nằm ở app admin-dashboard/backend
// khác), disallow ở đây chỉ để phòng hờ nếu sau này được reverse-proxy chung domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
