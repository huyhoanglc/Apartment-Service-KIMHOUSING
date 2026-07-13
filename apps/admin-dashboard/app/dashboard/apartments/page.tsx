"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/auth";
import LoadingOverlay from "@/app/components/LoadingOverlay";

interface Apartment {
  id: string;
  houseNumber: string;
  street: string;
  district: string;
  buildingName: string | null;
  managerName: string;
  managerPhone: string;
  accessType: "STAIRS" | "ELEVATOR" | "BOTH";
  totalRooms: number;
  rooms: { id: string }[];
}

const ACCESS_TYPE_LABEL: Record<Apartment["accessType"], string> = {
  STAIRS: "Cầu thang bộ",
  ELEVATOR: "Thang máy",
  BOTH: "Cả hai",
};

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [districtInput, setDistrictInput] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = getUser()?.role === "ADMIN";

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const query = district ? `?district=${encodeURIComponent(district)}` : "";
        const res = await apiFetch(`/api/apartments${query}`);
        const data = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setError(data.message ?? "Không tải được danh sách");
          return;
        }
        setApartments(data);
      } catch {
        if (!ignore) setError("Không thể kết nối đến máy chủ");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [district]);

  function handleFilterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDistrict(districtInput.trim());
  }

  async function handleDelete(id: string) {
    if (!confirm("Xoá apartment này? Hành động không thể hoàn tác.")) return;

    setDeleting(true);
    try {
      const res = await apiFetch(`/api/apartments/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message ?? "Xoá thất bại");
        return;
      }
      setApartments((prev) => prev.filter((a) => a.id !== id));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <LoadingOverlay show={deleting} label="Đang xoá..." />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-navy">Apartments</h1>
        <Link
          href="/dashboard/apartments/new"
          className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
        >
          + Thêm Apartment
        </Link>
      </div>

      <div className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
        <form onSubmit={handleFilterSubmit} className="mb-4 flex gap-2">
          <input
            value={districtInput}
            onChange={(e) => setDistrictInput(e.target.value)}
            placeholder="Lọc theo quận/huyện"
            className="w-64 rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold"
          />
          <button
            type="submit"
            className="rounded-md border border-navy/15 px-4 py-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to"
          >
            Lọc
          </button>
        </form>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {loading && <p className="text-sm text-navy/60">Đang tải...</p>}

        {!loading && !error && apartments.length === 0 && (
          <p className="text-sm text-navy/60">Chưa có apartment nào.</p>
        )}

        {!loading && apartments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-navy/10 text-left text-navy/50">
                  <th className="py-2 pr-4 font-medium">Địa chỉ</th>
                  <th className="py-2 pr-4 font-medium">Quận</th>
                  <th className="py-2 pr-4 font-medium">Quản lý</th>
                  <th className="py-2 pr-4 font-medium">Thang</th>
                  <th className="py-2 pr-4 font-medium">Số phòng</th>
                  <th className="py-2 pr-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {apartments.map((apt) => (
                  <tr
                    key={apt.id}
                    className="border-b border-navy/5 text-navy transition-colors duration-200 hover:bg-navy/2"
                  >
                    <td className="py-3 pr-4">
                      {apt.houseNumber} {apt.street}
                      {apt.buildingName ? ` (${apt.buildingName})` : ""}
                    </td>
                    <td className="py-3 pr-4">{apt.district}</td>
                    <td className="py-3 pr-4">
                      {apt.managerName} - {apt.managerPhone}
                    </td>
                    <td className="py-3 pr-4">{ACCESS_TYPE_LABEL[apt.accessType]}</td>
                    <td className="py-3 pr-4">
                      {apt.rooms.length}/{apt.totalRooms}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-3">
                        <Link
                          href={`/dashboard/apartments/${apt.id}`}
                          className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to"
                        >
                          Phòng
                        </Link>
                        <Link
                          href={`/dashboard/apartments/${apt.id}/edit`}
                          className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to"
                        >
                          Sửa
                        </Link>
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="text-red-600 underline transition-colors duration-300 hover:text-red-700"
                          >
                            Xoá
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
