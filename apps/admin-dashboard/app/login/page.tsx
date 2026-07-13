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
  "w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold";
const labelClass = "mb-1 block text-sm font-medium text-navy/70";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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
    <div className="flex flex-1 items-center justify-center bg-background px-4">
      <LoadingOverlay show={loading} label="Đang đăng nhập..." />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-navy/10 bg-white p-8 shadow-sm"
      >
        <div className="mb-6 flex flex-col items-center gap-2">
          <Image
            src="/Logo_navbar.png"
            alt="Kim Housing"
            width={468}
            height={196}
            priority
            className="h-10 w-auto object-contain"
          />
          <p className="text-sm text-navy/60">Đăng nhập vào hệ thống quản lý</p>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className={labelClass}>
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 disabled:opacity-50"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {GOOGLE_CLIENT_ID && (
          <div className="mt-4">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-navy/10" />
              <span className="text-xs text-navy/40">hoặc</span>
              <div className="h-px flex-1 bg-navy/10" />
            </div>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} locale="vi">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Đăng nhập Google thất bại")}
                  width="320"
                />
              </div>
            </GoogleOAuthProvider>
          </div>
        )}

        <div className="mt-4 text-center text-sm">
          <Link href="/forgot-password" className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to">
            Quên mật khẩu?
          </Link>
        </div>
      </form>
    </div>
  );
}
