"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import { extractErrorMessage } from "@/app/lib/apiError";
import { usePageTitle } from "@/app/components/PageTitleContext";

interface MyApartment {
  id: string;
  apartmentCode: string;
  houseNumber: string;
  street: string;
  district: string;
  lastActivityAt: string;
  dueAt: string;
  isOverdue: boolean;
  _count: { rooms: number };
}

interface MyApartmentWithBadge extends MyApartment {
  badgeLabel: string;
  badgeClassName: string;
}

const PAGE_SIZE = 20;
const HOUR_MS = 60 * 60 * 1000;

// Tính label/màu badge tại thời điểm fetch (không gọi Date.now() lúc render - component phải
// pure), gắn thẳng vào từng apartment trước khi lưu vào state.
function withBadge(apt: MyApartment, now: number): MyApartmentWithBadge {
  const diffMs = new Date(apt.dueAt).getTime() - now;

  if (apt.isOverdue) {
    const days = Math.max(1, Math.ceil(-diffMs / (24 * HOUR_MS)));
    return { ...apt, badgeLabel: `Quá hạn ${days} ngày`, badgeClassName: "bg-red-100 text-red-700" };
  }

  if (diffMs < 24 * HOUR_MS) {
    const hours = Math.max(1, Math.ceil(diffMs / HOUR_MS));
    return { ...apt, badgeLabel: `Còn ${hours} giờ`, badgeClassName: "bg-amber-100 text-amber-700" };
  }

  const days = Math.ceil(diffMs / (24 * HOUR_MS));
  return { ...apt, badgeLabel: `Còn ${days} ngày`, badgeClassName: "bg-green-100 text-green-700" };
}

export default function MySourcesPage() {
  usePageTitle("Nguồn của tôi");

  const [apartments, setApartments] = useState<MyApartmentWithBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch(`/api/apartments/mine?page=${page}&pageSize=${PAGE_SIZE}`);
        const result = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setError(extractErrorMessage(result, "Không tải được danh sách nguồn"));
          return;
        }
        const now = Date.now();
        setApartments((result.data as MyApartment[]).map((apt) => withBadge(apt, now)));
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
  }, [page]);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-navy">Nguồn của tôi</h1>
      <p className="mb-4 text-sm text-navy/60">
        Căn hộ do bạn tạo. Cứ 3 ngày cần cập nhật trạng thái ít nhất 1 phòng, nếu không hệ thống sẽ nhắc bạn và
        admin.
      </p>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="text-sm text-navy/60">Đang tải...</p>}

      {!loading && !error && apartments.length === 0 && (
        <p className="text-sm text-navy/60">Bạn chưa tạo căn hộ nào.</p>
      )}

      {!loading && apartments.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-navy/10 bg-white shadow-sm">
          <table className="w-full min-w-max text-left text-sm">
            <thead className="border-b border-navy/10 bg-navy/5 text-xs font-medium tracking-wide text-navy/50 uppercase">
              <tr>
                <th className="px-4 py-3">Mã CH</th>
                <th className="px-4 py-3">Địa chỉ</th>
                <th className="px-4 py-3">Số phòng</th>
                <th className="px-4 py-3">Cập nhật gần nhất</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {apartments.map((apt) => (
                <tr key={apt.id} className="text-navy transition-colors duration-150 hover:bg-navy/2">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    <Link href={`/dashboard/apartments/${apt.id}`} className="hover:text-gold-to">
                      {apt.apartmentCode}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {apt.houseNumber} {apt.street}, {apt.district}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{apt._count.rooms}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-navy/70">
                    {new Date(apt.lastActivityAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${apt.badgeClassName}`}
                    >
                      {apt.badgeLabel}
                    </span>
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
            Trang {page} / {totalPages} · {total} căn hộ
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
