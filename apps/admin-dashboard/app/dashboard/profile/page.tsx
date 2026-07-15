"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { apiFetch } from "@/app/lib/api";
import { extractErrorMessage } from "@/app/lib/apiError";
import { usePageTitle } from "@/app/components/PageTitleContext";

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: "ADMIN" | "SALE" | "CUSTOMER";
}

interface EmployeeProfile {
  employeeCode: string;
  fullName: string | null;
  dateOfBirth: string | null;
  phone: string | null;
  position: string | null;
  startDate: string | null;
  managerName: string | null;
  employmentType: string | null;
  salaryInfo: string | null;
  employmentStatus: string | null;
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = date.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

const STATUS_STYLE: Record<string, string> = {
  "Đang làm việc": "bg-green-100 text-green-700",
  "Đã nghỉ việc": "bg-red-100 text-red-700",
  "Đang tạm off thời gian dài": "bg-amber-100 text-amber-700",
};

function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-navy/40">—</span>;
  const style = STATUS_STYLE[status] ?? "bg-navy/10 text-navy/60";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>{status}</span>;
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-navy/40 uppercase">{label}</p>
      <div className="mt-1 text-sm text-navy">{value ?? "—"}</div>
    </div>
  );
}

export default function ProfilePage() {
  usePageTitle("Hồ sơ của tôi");

  const [user, setUser] = useState<ProfileUser | null>(null);
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch("/api/auth/me");
        const result = await res.json();
        if (!res.ok) {
          if (!cancelled) setError(extractErrorMessage(result, "Không tải được hồ sơ"));
          return;
        }
        if (!cancelled) {
          setUser(result.data.user);
          setEmployee(result.data.employee);
        }
      } catch {
        if (!cancelled) setError("Không thể kết nối đến máy chủ");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-navy/60">Đang tải...</p>;
  }

  if (error || !user) {
    return <p className="text-sm text-red-600">{error ?? "Không tải được hồ sơ"}</p>;
  }

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4 rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-gold-from via-gold-via to-gold-to text-lg font-semibold text-navy">
            {initials}
          </span>
        )}
        <div>
          <h2 className="text-lg font-semibold text-navy">{user.name}</h2>
          <p className="text-sm text-navy/60">{user.email}</p>
          <span className="mt-1 inline-flex rounded-full bg-navy/10 px-2.5 py-0.5 text-xs font-medium text-navy/70">
            {user.role}
          </span>
        </div>
      </div>

      {!employee ? (
        <div className="rounded-lg border border-navy/10 bg-white p-6 text-sm text-navy/60 shadow-sm">
          Không tìm thấy hồ sơ nhân sự khớp với email này trong danh sách nhân sự đã đồng bộ.
        </div>
      ) : (
        <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-navy">Thông tin nhân sự</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <Field label="Mã nhân viên" value={employee.employeeCode} />
            <Field label="Vị trí làm việc" value={employee.position} />
            <Field label="Ngày sinh" value={formatDate(employee.dateOfBirth)} />
            <Field label="Số điện thoại" value={employee.phone} />
            <Field label="Ngày bắt đầu làm việc" value={formatDate(employee.startDate)} />
            <Field label="Người quản lý trực tiếp" value={employee.managerName} />
            <Field label="Hình thức làm việc" value={employee.employmentType} />
            <Field label="Mức lương / hệ số lương" value={employee.salaryInfo} />
            <Field label="Tình trạng hoạt động" value={<StatusBadge status={employee.employmentStatus} />} />
          </div>
        </div>
      )}
    </div>
  );
}
