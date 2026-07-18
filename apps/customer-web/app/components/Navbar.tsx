"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/app/components/ThemeToggle";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { cn } from "@/app/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/can-ho", label: "Căn hộ" },
];

const KIM_HOUSING_MENU = [
  { href: "/ve-kim", label: "Về Kim Housing" },
  { href: "/gia-tri-cot-loi", label: "Giá trị cốt lõi" },
  { href: "/#tam-nhin", label: "Tầm nhìn chiến lược" },
  { href: "/lich-su", label: "Lịch sử" },
  { href: "/trach-nhiem-xa-hoi", label: "Trách nhiệm xã hội" },
  { href: "/doi-ngu-nhan-su", label: "Đội ngũ nhân sự" },
];

const TRAILING_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/tuyen-dung", label: "Tuyển dụng" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/thu-vien-anh", label: "Thư viện ảnh" },
];

const linkClass = (active: boolean) =>
  cn(
    "shrink-0 rounded-full px-3 py-2 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to",
    active && "bg-gold/15 text-gold-to"
  );

const goldButtonClass =
  "rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2 text-sm font-semibold text-navy shadow-soft transition-all duration-300 hover:shadow-gold hover:brightness-105 hover:scale-[1.02] active:scale-[0.98]";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [kimOpen, setKimOpen] = useState(false);
  const [kimMobileOpen, setKimMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const kimMenuRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 8));

  useEffect(() => {
    if (!kimOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (kimMenuRef.current && !kimMenuRef.current.contains(event.target as Node)) {
        setKimOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [kimOpen]);

  const kimActive = KIM_HOUSING_MENU.some((item) => item.href === pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-navy/85 shadow-soft-md backdrop-blur-md"
          : "border-transparent bg-navy"
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8 xl:px-10">
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
              className="h-10 w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        <div className="hidden flex-1 items-center gap-8 xl:flex">
          <nav className="flex flex-1 items-center justify-center gap-1 text-sm font-medium whitespace-nowrap text-white">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={linkClass(pathname === link.href)}
              >
                {link.label}
              </Link>
            ))}

            <div ref={kimMenuRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setKimOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={kimOpen}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-2 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to",
                  (kimOpen || kimActive) && "bg-gold/15 text-gold-to"
                )}
              >
                Kim Housing
                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className={cn("shrink-0 transition-transform duration-300", kimOpen && "rotate-180")}
                />
              </button>
              <AnimatePresence>
                {kimOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full z-10 mt-3 w-64 rounded-card border border-white/10 bg-navy-light py-2 shadow-soft-lg"
                  >
                    {KIM_HOUSING_MENU.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setKimOpen(false)}
                        className={cn(
                          "mx-2 block rounded-md px-3 py-2 text-sm text-white/80 transition-colors duration-300 hover:bg-gold/15 hover:text-gold",
                          pathname === item.href && "bg-gold/10 text-gold"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {TRAILING_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={linkClass(pathname === link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto hidden shrink-0 items-center gap-4 xl:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/lien-he" className={cn(goldButtonClass, "whitespace-nowrap")}>
            Liên hệ ngay
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1 xl:hidden">
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
            className="overflow-hidden border-t border-white/10 bg-navy xl:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4 text-sm font-medium text-white">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass(pathname === link.href)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => setKimMobileOpen((v) => !v)}
                aria-expanded={kimMobileOpen}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-left transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to",
                  kimMobileOpen && "bg-gold/15 text-gold-to"
                )}
              >
                Kim Housing
                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className={cn("shrink-0 transition-transform duration-300", kimMobileOpen && "rotate-180")}
                />
              </button>
              <AnimatePresence>
                {kimMobileOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-1 flex flex-col gap-1 overflow-hidden border-l border-white/10 pl-4"
                  >
                    {KIM_HOUSING_MENU.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md px-3 py-1.5 text-sm text-white/70 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {TRAILING_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass(pathname === link.href)}
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/lien-he" onClick={() => setMobileOpen(false)} className={cn(goldButtonClass, "mt-2 text-center")}>
                Liên hệ ngay
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
