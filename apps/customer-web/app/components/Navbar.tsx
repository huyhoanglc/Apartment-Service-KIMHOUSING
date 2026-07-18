"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/app/components/ThemeToggle";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import Button from "@/app/components/ui/Button";
import { cn } from "@/app/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/about", label: "Về chúng tôi" },
  { href: "/news", label: "Tin tức" },
  { href: "/careers", label: "Tuyển dụng" },
  { href: "/contact", label: "Liên hệ" },
];

const linkClass = (active: boolean) =>
  cn(
    "shrink-0 rounded-full px-3.5 py-2 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to",
    active && "bg-gold/15 text-gold-to"
  );

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 8));

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-navy/85 shadow-soft-md backdrop-blur-md"
          : "border-transparent bg-navy"
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5 lg:px-8 xl:px-10">
        <Link href="/" className="flex shrink-0 items-center">
          {logoError ? (
            <span className="text-lg font-bold tracking-wide text-white">
              KIM <span className="text-gold-to">HOUSING</span>
            </span>
          ) : (
            <Image
              src="/Logo_navbar.png"
              alt="Kim Housing"
              width={468}
              height={196}
              priority
              className="h-11 w-auto object-contain sm:h-12"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium whitespace-nowrap text-white lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={linkClass(isActive(link.href))}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button href="/contact" size="sm" className="whitespace-nowrap">
            Liên hệ ngay
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-white"
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-navy lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4 text-sm font-medium text-white">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={linkClass(isActive(link.href))}
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/contact" onClick={() => setMobileOpen(false)} className="mt-2 text-center">
                Liên hệ ngay
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
