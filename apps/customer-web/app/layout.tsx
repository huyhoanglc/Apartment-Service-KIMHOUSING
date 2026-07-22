import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrandIntro from "@/app/components/BrandIntro";
import FloatingActions from "@/app/components/FloatingActions";
import OrganizationSchema from "@/app/components/OrganizationSchema";
import { SITE_NAME, SITE_URL } from "@/app/lib/site";
import "./globals.css";

const THEME_INIT_SCRIPT = `
try {
  if (localStorage.getItem('kimhousing_theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_DESCRIPTION =
  "Kim Housing cung cấp dịch vụ cho thuê căn hộ dịch vụ, phòng trọ cao cấp tại TP.HCM - đầy đủ tiện nghi, vị trí thuận tiện, giá cả hợp lý.";
const DEFAULT_TITLE = "Kim Housing - Căn Hộ Dịch Vụ TP.HCM";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "căn hộ dịch vụ TP.HCM",
    "cho thuê căn hộ dịch vụ",
    "phòng trọ cao cấp",
    "Kim Housing",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
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
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/Logo_navbar.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <OrganizationSchema />
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <BrandIntro />
        <Navbar />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
