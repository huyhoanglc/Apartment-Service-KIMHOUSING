"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { API_URL } from "@/app/lib/api";

type Step = "request" | "reset" | "done";

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
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        {step === "request" && (
          <form onSubmit={handleRequestOtp}>
            <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Quên mật khẩu
            </h1>
            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              Nhập email để nhận mã OTP đặt lại mật khẩu.
            </p>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            {error && (
              <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>

            <div className="mt-4 text-center text-sm">
              <Link href="/login" className="text-zinc-600 underline dark:text-zinc-400">
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword}>
            <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Nhập mã OTP
            </h1>
            {info && (
              <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">{info}</p>
            )}

            <div className="mb-4">
              <label
                htmlFor="otp"
                className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
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
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
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
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
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
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            {error && (
              <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>

            <div className="mt-4 flex justify-between text-sm">
              <button
                type="button"
                onClick={() => setStep("request")}
                className="text-zinc-600 underline dark:text-zinc-400"
              >
                Đổi email
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => void requestOtp()}
                className="text-zinc-600 underline dark:text-zinc-400 disabled:opacity-50"
              >
                Gửi lại mã OTP
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div>
            <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Đặt lại mật khẩu thành công
            </h1>
            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              Bạn có thể đăng nhập bằng mật khẩu mới.
            </p>
            <Link
              href="/login"
              className="block w-full rounded-md bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Về trang đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
