"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/auth";

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

    const res = await apiFetch(`/api/apartments/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.message ?? "Xoá thất bại");
      return;
    }
    setApartments((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Apartments</h1>
        <Link
          href="/dashboard/apartments/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          + Thêm Apartment
        </Link>
      </div>

      <form onSubmit={handleFilterSubmit} className="mb-4 flex gap-2">
        <input
          value={districtInput}
          onChange={(e) => setDistrictInput(e.target.value)}
          placeholder="Lọc theo quận/huyện"
          className="w-64 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <button
          type="submit"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-50"
        >
          Lọc
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</p>}
      {loading && <p className="text-sm text-zinc-600 dark:text-zinc-400">Đang tải...</p>}

      {!loading && !error && apartments.length === 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Chưa có apartment nào.</p>
      )}

      {!loading && apartments.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-4">Địa chỉ</th>
                <th className="py-2 pr-4">Quận</th>
                <th className="py-2 pr-4">Quản lý</th>
                <th className="py-2 pr-4">Thang</th>
                <th className="py-2 pr-4">Số phòng</th>
                <th className="py-2 pr-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apt) => (
                <tr
                  key={apt.id}
                  className="border-b border-zinc-100 text-zinc-900 dark:border-zinc-900 dark:text-zinc-50"
                >
                  <td className="py-2 pr-4">
                    {apt.houseNumber} {apt.street}
                    {apt.buildingName ? ` (${apt.buildingName})` : ""}
                  </td>
                  <td className="py-2 pr-4">{apt.district}</td>
                  <td className="py-2 pr-4">
                    {apt.managerName} - {apt.managerPhone}
                  </td>
                  <td className="py-2 pr-4">{ACCESS_TYPE_LABEL[apt.accessType]}</td>
                  <td className="py-2 pr-4">
                    {apt.rooms.length}/{apt.totalRooms}
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/apartments/${apt.id}`}
                        className="text-zinc-600 underline dark:text-zinc-400"
                      >
                        Phòng
                      </Link>
                      <Link
                        href={`/dashboard/apartments/${apt.id}/edit`}
                        className="text-zinc-600 underline dark:text-zinc-400"
                      >
                        Sửa
                      </Link>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="text-red-600 underline dark:text-red-400"
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
  );
}
