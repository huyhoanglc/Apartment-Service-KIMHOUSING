"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

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

const goldButtonClass =
  "rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0 text-white/40"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="m17 17-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

function SearchForm({ className }: { className?: string }) {
  return (
    <form
      action="/can-ho"
      method="GET"
      className={`flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 transition-all duration-300 focus-within:border-gold focus-within:bg-white/10 ${className ?? ""}`}
    >
      <SearchIcon />
      <input
        type="text"
        name="district"
        placeholder="Tìm theo khu vực..."
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
      />
    </form>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [kimOpen, setKimOpen] = useState(false);
  const [kimMobileOpen, setKimMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const kimMenuRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy shadow-sm">
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
          <SearchForm className="hidden w-48 shrink-0 2xl:flex" />

          <nav className="flex flex-1 items-center justify-center gap-1 text-sm font-medium whitespace-nowrap text-white">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full px-3 py-2 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to"
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
                className={`flex items-center gap-1 rounded-full px-3 py-2 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to ${
                  kimOpen ? "bg-gold/15 text-gold-to" : ""
                }`}
              >
                Kim Housing
                <ChevronIcon open={kimOpen} />
              </button>
              {kimOpen && (
                <div className="absolute left-0 top-full z-10 mt-3 w-64 rounded-lg border border-white/10 bg-navy-light py-2 shadow-xl">
                  {KIM_HOUSING_MENU.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setKimOpen(false)}
                      className="mx-2 block rounded-md px-3 py-2 text-sm text-white/80 transition-colors duration-300 hover:bg-gold/15 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {TRAILING_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full px-3 py-2 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto hidden shrink-0 items-center gap-4 xl:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link href="/lien-he" className={`${goldButtonClass} whitespace-nowrap`}>
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
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy px-4 py-4 xl:hidden">
          <SearchForm className="mb-4" />
          <nav className="flex flex-col gap-1 text-sm font-medium text-white">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setKimMobileOpen((v) => !v)}
              aria-expanded={kimMobileOpen}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-left transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to ${
                kimMobileOpen ? "bg-gold/15 text-gold-to" : ""
              }`}
            >
              Kim Housing
              <ChevronIcon open={kimMobileOpen} />
            </button>
            {kimMobileOpen && (
              <div className="mb-1 flex flex-col gap-1 border-l border-white/10 pl-4">
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
              </div>
            )}

            {TRAILING_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 transition-colors duration-300 hover:bg-gold/15 hover:text-gold-to"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/lien-he"
              onClick={() => setMobileOpen(false)}
              className={`${goldButtonClass} mt-2 text-center`}
            >
              Liên hệ ngay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
