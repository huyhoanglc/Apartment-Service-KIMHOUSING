"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/lien-he", label: "Liên hệ" },
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
      className="h-4 w-4 shrink-0 text-navy/40"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="m17 17-3.5-3.5" strokeLinecap="round" />
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
      action="/"
      method="GET"
      className={`flex items-center gap-2 rounded-full border border-navy/10 bg-navy/3 px-4 py-2 transition-all duration-300 focus-within:border-gold focus-within:bg-white ${className ?? ""}`}
    >
      <SearchIcon />
      <input
        type="text"
        name="district"
        placeholder="Tìm theo khu vực..."
        className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-navy/40"
      />
    </form>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/5 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          {logoError ? (
            <span className="text-lg font-bold tracking-wide text-navy">
              KIM <span className="text-gold-to">HOUSING</span>
            </span>
          ) : (
            <Image
              src="/Logo_removebg.png"
              alt="Kim Housing"
              width={140}
              height={40}
              priority
              className="h-9 w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        <div className="hidden flex-1 items-center gap-6 md:flex">
          <SearchForm className="max-w-xs flex-1" />

          <nav className="flex items-center gap-6 text-sm font-medium text-navy">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-300 hover:text-gold-to"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto hidden md:block">
          <Link href="/lien-he" className={goldButtonClass}>
            Liên hệ ngay
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-md text-navy md:hidden"
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy/10 bg-white px-4 py-4 md:hidden">
          <SearchForm className="mb-4" />
          <nav className="flex flex-col gap-3 text-sm font-medium text-navy">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
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
