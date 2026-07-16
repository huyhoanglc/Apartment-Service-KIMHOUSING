import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
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

export const metadata: Metadata = {
  title: {
    template: "%s | Kim Housing",
    default: "Kim Housing - Căn Hộ Dịch Vụ TP.HCM",
  },
  description:
    "Kim Housing cung cấp dịch vụ cho thuê căn hộ dịch vụ, phòng trọ cao cấp tại TP.HCM - đầy đủ tiện nghi, vị trí thuận tiện, giá cả hợp lý.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
