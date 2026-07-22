import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrandIntro from "@/app/components/BrandIntro";
import FloatingActions from "@/app/components/FloatingActions";
import OrganizationSchema from "@/app/components/OrganizationSchema";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/app/lib/site";
import { routing, type AppLocale } from "@/i18n/routing";
import "../globals.css";

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

const KEYWORDS: Record<AppLocale, string[]> = {
  vi: ["căn hộ dịch vụ TP.HCM", "cho thuê căn hộ dịch vụ", "phòng trọ cao cấp", "Kim Housing"],
  en: ["serviced apartments Ho Chi Minh City", "apartment rental Vietnam", "premium boarding rooms", "Kim Housing"],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.default" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_NAME}`,
      default: title,
    },
    description,
    keywords: KEYWORDS[locale as AppLocale] ?? KEYWORDS.vi,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/" }),
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
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Cho phép các page/layout con dùng getTranslations()/setRequestLocale mà không phải truyền
  // locale thủ công qua props - cần thiết để static rendering hoạt động đúng với next-intl.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <OrganizationSchema />
          <Script id="theme-init" strategy="beforeInteractive">
            {THEME_INIT_SCRIPT}
          </Script>
          <BrandIntro />
          <Navbar />
          {children}
          <Footer />
          <FloatingActions />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
