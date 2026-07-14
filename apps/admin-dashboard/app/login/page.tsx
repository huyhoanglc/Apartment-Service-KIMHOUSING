"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { API_URL } from "@/app/lib/api";
import { saveSession } from "@/app/lib/auth";
import LoadingOverlay from "@/app/components/LoadingOverlay";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const inputClass =
  "w-full rounded-md border border-white/15 bg-white/5 py-2 pl-10 pr-10 text-sm text-white placeholder-white/30 outline-none transition-colors duration-300 focus:border-gold";
const labelClass = "mb-1 block text-sm font-medium text-white/70";

const FEATURES = [
  "Quản lý căn hộ & phòng toàn diện",
  "Vận hành nhanh chóng và an toàn",
  "Hỗ trợ nội bộ 24/7",
];

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="M3 5.5l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <rect x="4" y="9" width="12" height="8" rx="1.5" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (!open) {
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <path d="M2.5 10s2.8-5 7.5-5 7.5 5 7.5 5-2.8 5-7.5 5-7.5-5-7.5-5Z" />
        <circle cx="10" cy="10" r="2.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <path d="M2.5 10s2.8-5 7.5-5 7.5 5 7.5 5-2.8 5-7.5 5-7.5-5-7.5-5Z" />
      <circle cx="10" cy="10" r="2.2" />
      <path d="M3 17 17 3" strokeLinecap="round" />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden>
      <circle cx="10" cy="10" r="10" fill="#0068FF" />
      <path
        d="M5.5 8.4c0-.5.4-.9.9-.9h1.4a.5.5 0 0 1 .4.8L5.9 11.6h1.9a.5.5 0 0 1 0 1H6.1a.9.9 0 0 1-.7-1.5l2.2-3.1H6.4a.9.9 0 0 1-.9-.6Zm5.4-.9a.5.5 0 0 1 .5.5v4.5a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5Zm2 .1a.5.5 0 0 1 .5.5v3.9a.5.5 0 0 1-1 0V8.1a.5.5 0 0 1 .5-.5Z"
        fill="#fff"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zaloNotice, setZaloNotice] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Đăng nhập thất bại");
        return;
      }

      saveSession(data.token, data.user);
      router.push("/dashboard");
    } catch {
      setError("Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(credentialResponse: CredentialResponse) {
    if (!credentialResponse.credential) {
      setError("Đăng nhập Google thất bại");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Đăng nhập Google thất bại");
        return;
      }

      saveSession(data.token, data.user);
      router.push("/dashboard");
    } catch {
      setError("Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#050d1a] px-6 py-16">
      <LoadingOverlay show={loading} label="Đang đăng nhập..." />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 12% 8%, #12294a 0%, #0a192f 45%, #050d1a 100%), radial-gradient(45% 40% at 90% 90%, rgba(212,175,55,0.10), transparent)",
        }}
      />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left branding */}
        <div className="hidden flex-col gap-10 md:flex">
          <Image
            src="/Logo_navbar.png"
            alt="Kim Housing"
            width={468}
            height={196}
            priority
            className="h-11 w-auto object-contain"
          />

          <div>
            <h2 className="text-3xl font-semibold text-white">Nền tảng quản lý căn hộ hàng đầu</h2>
            <ul className="mt-6 space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right form card */}
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Image
                src="/Logo_navbar.png"
                alt="Kim Housing"
                width={468}
                height={196}
                priority
                className="mb-4 h-8 w-auto object-contain md:hidden"
              />
              <h1 className="text-xl font-semibold text-white">Đăng nhập</h1>
              <p className="mt-1 text-sm text-white/60">Đăng nhập vào hệ thống quản lý</p>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-white/40">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClass} pr-3`}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className={labelClass}>
                Mật khẩu
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-white/40">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-white/40 transition-colors duration-200 hover:text-white"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/60">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-white/30 text-gold-to accent-current"
                />
                Ghi nhớ tôi
              </label>
              <Link href="/forgot-password" className="text-gold underline transition-colors duration-300 hover:text-gold-via">
                Quên mật khẩu?
              </Link>
            </div>

            {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 disabled:opacity-50"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            <div className="mt-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/40">hoặc</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 justify-center">
                {GOOGLE_CLIENT_ID ? (
                  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} locale="vi">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => setError("Đăng nhập Google thất bại")}
                      width="180"
                    />
                  </GoogleOAuthProvider>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/40"
                  >
                    Google
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setZaloNotice(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-white/15 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to"
              >
                <ZaloIcon />
                Zalo
              </button>
            </div>

            {zaloNotice && (
              <p className="mt-3 text-center text-xs text-white/50">
                Tính năng đăng nhập Zalo sắp ra mắt
              </p>
            )}
          </form>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs text-white/25">
        © {new Date().getFullYear()} Kim Housing
      </p>
    </div>
  );
}
