import type { Metadata } from "next";

// Hằng số dùng chung cho metadata, sitemap, robots và structured data (JSON-LD).
// SITE_URL nên được override qua biến môi trường NEXT_PUBLIC_SITE_URL khi deploy ở domain khác.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kimhousing.vn";

export const SITE_NAME = "Kim Housing";

// Next.js merge metadata theo segment - nếu page tự khai báo openGraph, nó THAY THẾ toàn bộ
// object openGraph kế thừa từ layout (không merge sâu từng field). Dùng helper này ở mọi page
// con để không bị mất locale/siteName/images mặc định khi chỉ muốn đổi title/description/url.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  return {
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
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
