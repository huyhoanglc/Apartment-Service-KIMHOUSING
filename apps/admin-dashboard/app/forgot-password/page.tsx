"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { API_URL } from "@/app/lib/api";
import LoadingOverlay from "@/app/components/LoadingOverlay";

type Step = "request" | "reset" | "done";

const inputClass =
  "w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold";
const labelClass = "mb-1 block text-sm font-medium text-navy/70";
const buttonClass =
  "w-full rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 disabled:opacity-50";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function requestOtp() {
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Không gửi được mã OTP");
        return;
      }

      setInfo(data.message ?? "Nếu email tồn tại, mã OTP đã được gửi");
      setStep("reset");
    } catch {
      setError("Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  }

  function handleRequestOtp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void requestOtp();
  }

  async function handleResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Đặt lại mật khẩu thất bại");
        return;
      }

      setStep("done");
    } catch {
      setError("Không thể kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4">
      <LoadingOverlay
        show={loading}
        label={step === "reset" ? "Đang xử lý..." : "Đang gửi mã OTP..."}
      />

      <div className="w-full max-w-sm rounded-lg border border-navy/10 bg-white p-8 shadow-sm">
        {step === "request" && (
          <form onSubmit={handleRequestOtp}>
            <h1 className="mb-2 text-xl font-semibold text-navy">Quên mật khẩu</h1>
            <p className="mb-6 text-sm text-navy/60">Nhập email để nhận mã OTP đặt lại mật khẩu.</p>

            <div className="mb-6">
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

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <button type="submit" disabled={loading} className={buttonClass}>
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>

            <div className="mt-4 text-center text-sm">
              <Link href="/login" className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword}>
            <h1 className="mb-2 text-xl font-semibold text-navy">Nhập mã OTP</h1>
            {info && <p className="mb-6 text-sm text-navy/60">{info}</p>}

            <div className="mb-4">
              <label htmlFor="otp" className={labelClass}>
                Mã OTP (6 số, hết hạn sau 5 phút)
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className={labelClass}>
                Mật khẩu mới
              </label>
              <input
                id="newPassword"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className={labelClass}>
                Nhập lại mật khẩu mới
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <button type="submit" disabled={loading} className={buttonClass}>
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>

            <div className="mt-4 flex justify-between text-sm">
              <button
                type="button"
                onClick={() => setStep("request")}
                className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to"
              >
                Đổi email
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => void requestOtp()}
                className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to disabled:opacity-50"
              >
                Gửi lại mã OTP
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div>
            <h1 className="mb-2 text-xl font-semibold text-navy">Đặt lại mật khẩu thành công</h1>
            <p className="mb-6 text-sm text-navy/60">Bạn có thể đăng nhập bằng mật khẩu mới.</p>
            <Link href="/login" className={`${buttonClass} block text-center`}>
              Về trang đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
