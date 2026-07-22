import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

// Hằng số dùng chung cho metadata, sitemap, robots và structured data (JSON-LD).
// SITE_URL nên được override qua biến môi trường NEXT_PUBLIC_SITE_URL khi deploy ở domain khác.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kimhousing.vn";

export const SITE_NAME = "Kim Housing";

const OG_LOCALE: Record<AppLocale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

// Next.js merge metadata theo segment - nếu page tự khai báo openGraph, nó THAY THẾ toàn bộ
// object openGraph kế thừa từ layout (không merge sâu từng field). Dùng helper này ở mọi page
// con để không bị mất locale/siteName/images mặc định khi chỉ muốn đổi title/description/url.
//
// `path` luôn là đường dẫn KHÔNG tiền tố locale (VD "/about", không phải "/en/about") - getPathname
// tự thêm/bỏ tiền tố "/en" đúng theo routing.localePrefix ("as-needed": vi không tiền tố, en có).
export function pageMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: AppLocale;
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const canonicalPath = getPathname({ locale, href: path });
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({ locale: l, href: path });
  }
  languages["x-default"] = getPathname({ locale: routing.defaultLocale, href: path });

  return {
    alternates: {
      canonical: canonicalPath,
      languages,
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: SITE_NAME,
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: "/Logo_navbar.png",
          width: 468,
          height: 196,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/Logo_navbar.png"],
    },
  };
}

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Công Ty TNHH MTV KIM Housing",
  url: SITE_URL,
  logo: `${SITE_URL}/Logo_navbar.png`,
  // Hotline chưa có số chính thức ("Đang cập nhật") - không đưa placeholder vào JSON-LD/hiển
  // thị công khai. Bổ sung telephone khi có số thật.
  telephone: undefined as string | undefined,
  email: "kimhousing.hrad@gmail.com",
  streetAddress: "14/5A5 Đường Kỳ Đồng",
  addressLocality: "Phường Nhiêu Lộc",
  addressRegion: "Thành phố Hồ Chí Minh",
  addressCountry: "VN",
  sameAs: ["https://www.facebook.com/KIMhousing26/"],
} as const;
