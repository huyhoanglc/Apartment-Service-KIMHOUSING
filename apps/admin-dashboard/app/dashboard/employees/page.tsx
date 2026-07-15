"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { extractErrorMessage } from "@/app/lib/apiError";
import { usePageTitle } from "@/app/components/PageTitleContext";
import { useToast } from "@/app/components/ToastProvider";
import { getUser, type AuthUser } from "@/app/lib/auth";

interface Employee {
  id: string;
  employeeCode: string;
  fullName: string | null;
  email: string | null;
  dateOfBirth: string | null;
  phone: string | null;
  position: string | null;
  startDate: string | null;
  managerName: string | null;
  employmentType: string | null;
  salaryInfo: string | null;
  employmentStatus: string | null;
}

const PAGE_SIZE = 20;
const STATUS_OPTIONS = ["Đang làm việc", "Đã nghỉ việc", "Đang tạm off thời gian dài"];

const STATUS_STYLE: Record<string, string> = {
  "Đang làm việc": "bg-green-100 text-green-700",
  "Đã nghỉ việc": "bg-red-100 text-red-700",
  "Đang tạm off thời gian dài": "bg-amber-100 text-amber-700",
};

function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-navy/40">—</span>;
  const style = STATUS_STYLE[status] ?? "bg-navy/10 text-navy/60";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${style}`}>{status}</span>;
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

function SyncIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <path d="M4 10a6 6 0 0 1 10.2-4.2M16 10a6 6 0 0 1-10.2 4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3v3h-3M6 17v-3h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

export default function EmployeesPage() {
  usePageTitle("Quản lý nhân viên");
  const router = useRouter();
  const { showToast } = useToast();
  const user = useSyncExternalStore(subscribeNoop, getUser, getServerSnapshot);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      showToast("Chỉ ADMIN mới có quyền truy cập trang này", "error");
      router.replace("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    let ignore = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("pageSize", String(PAGE_SIZE));
        if (search) params.set("search", search);
        if (status) params.set("employmentStatus", status);

        const res = await apiFetch(`/api/employees?${params.toString()}`);
        const result = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setError(extractErrorMessage(result, "Không tải được danh sách nhân viên"));
          return;
        }
        setEmployees(result.data);
        setTotal(result.pagination?.total ?? 0);
        setTotalPages(result.pagination?.totalPages ?? 1);
      } catch {
        if (!ignore) setError("Không thể kết nối đến máy chủ");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [user, page, search, status, reloadKey]);

  async function handleSync() {
    setSyncing(true);
    try {
      const res = await apiFetch("/api/employees/sync", { method: "POST" });
      const result = await res.json();
      if (!res.ok) {
        showToast(extractErrorMessage(result, "Đồng bộ thất bại"), "error");
        return;
      }
      const { totalRows, created, updated, skipped } = result.data;
      showToast(
        `Đồng bộ xong: ${totalRows} dòng, ${created} mới, ${updated} cập nhật, ${skipped} bỏ qua`,
        "success"
      );
      setPage(1);
      setReloadKey((k) => k + 1);
    } catch {
      showToast("Không thể kết nối đến máy chủ", "error");
    } finally {
      setSyncing(false);
    }
  }

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-navy">Quản lý nhân viên</h1>
        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 disabled:opacity-50"
        >
          <SyncIcon />
          {syncing ? "Đang đồng bộ..." : "Đồng bộ từ Google Sheet"}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Tìm theo mã NV, tên, email..."
          className={`${inputClass} max-w-xs`}
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className={`${inputClass} max-w-xs`}
        >
          <option value="">Tất cả tình trạng</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="text-sm text-navy/60">Đang tải...</p>}

      {!loading && !error && employees.length === 0 && (
        <p className="text-sm text-navy/60">Chưa có dữ liệu nhân viên. Thử bấm &quot;Đồng bộ từ Google Sheet&quot;.</p>
      )}

      {!loading && employees.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-navy/10 bg-white shadow-sm">
          <table className="w-full min-w-max text-left text-sm">
            <thead className="border-b border-navy/10 bg-navy/5 text-xs font-medium tracking-wide text-navy/50 uppercase">
              <tr>
                <th className="px-4 py-3">Mã NV</th>
                <th className="px-4 py-3">Họ và tên</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">SĐT</th>
                <th className="px-4 py-3">Vị trí</th>
                <th className="px-4 py-3">Ngày vào làm</th>
                <th className="px-4 py-3">Quản lý trực tiếp</th>
                <th className="px-4 py-3">Hình thức</th>
                <th className="px-4 py-3">Tình trạng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {employees.map((emp) => (
                <tr key={emp.id} className="text-navy transition-colors duration-150 hover:bg-navy/[0.02]">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{emp.employeeCode}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{emp.fullName ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-navy/70">{emp.email ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{emp.phone ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{emp.position ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(emp.startDate)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{emp.managerName ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{emp.employmentType ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={emp.employmentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-full border border-navy/15 px-3 py-1.5 text-sm text-navy transition-colors duration-200 hover:border-gold hover:text-gold-to disabled:opacity-30"
          >
            Trước
          </button>
          <span className="text-sm text-navy/60">
            Trang {page} / {totalPages} · {total} nhân viên
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-full border border-navy/15 px-3 py-1.5 text-sm text-navy transition-colors duration-200 hover:border-gold hover:text-gold-to disabled:opacity-30"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
