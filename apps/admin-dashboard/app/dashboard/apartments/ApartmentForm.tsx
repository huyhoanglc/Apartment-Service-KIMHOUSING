"use client";

import { useState, type FormEvent } from "react";
import LoadingOverlay from "@/app/components/LoadingOverlay";

export type AccessType = "STAIRS" | "ELEVATOR" | "BOTH";

export interface ApartmentFormValues {
  houseNumber: string;
  street: string;
  district: string;
  buildingName: string;
  managerName: string;
  managerPhone: string;
  accessType: AccessType | "";
  totalRooms: string;
}

export const emptyApartmentFormValues: ApartmentFormValues = {
  houseNumber: "",
  street: "",
  district: "",
  buildingName: "",
  managerName: "",
  managerPhone: "",
  accessType: "",
  totalRooms: "",
};

const inputClass =
  "w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold";
const labelClass = "mb-1 block text-sm font-medium text-navy/70";

export default function ApartmentForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: Partial<ApartmentFormValues>;
  onSubmit: (values: ApartmentFormValues) => Promise<string | null>;
  submitLabel: string;
}) {
  const [values, setValues] = useState<ApartmentFormValues>({
    ...emptyApartmentFormValues,
    ...initialValues,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof ApartmentFormValues>(key: K, value: ApartmentFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const errMessage = await onSubmit(values);
    setLoading(false);
    if (errMessage) setError(errMessage);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-4 rounded-lg border border-navy/10 bg-white p-6 shadow-sm"
    >
      <LoadingOverlay show={loading} label="Đang lưu..." />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="houseNumber" className={labelClass}>
            Số nhà
          </label>
          <input
            id="houseNumber"
            required
            value={values.houseNumber}
            onChange={(e) => update("houseNumber", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="street" className={labelClass}>
            Đường
          </label>
          <input
            id="street"
            required
            value={values.street}
            onChange={(e) => update("street", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="district" className={labelClass}>
            Quận/Huyện
          </label>
          <input
            id="district"
            required
            value={values.district}
            onChange={(e) => update("district", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="buildingName" className={labelClass}>
            Tên toà nhà (không bắt buộc)
          </label>
          <input
            id="buildingName"
            value={values.buildingName}
            onChange={(e) => update("buildingName", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="managerName" className={labelClass}>
            Tên quản lý
          </label>
          <input
            id="managerName"
            required
            value={values.managerName}
            onChange={(e) => update("managerName", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="managerPhone" className={labelClass}>
            SĐT quản lý
          </label>
          <input
            id="managerPhone"
            required
            value={values.managerPhone}
            onChange={(e) => update("managerPhone", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="accessType" className={labelClass}>
            Thang bộ / thang máy
          </label>
          <select
            id="accessType"
            required
            value={values.accessType}
            onChange={(e) => update("accessType", e.target.value as AccessType)}
            className={inputClass}
          >
            <option value="" disabled>
              -- Chọn --
            </option>
            <option value="STAIRS">Cầu thang bộ</option>
            <option value="ELEVATOR">Thang máy</option>
            <option value="BOTH">Cả hai</option>
          </select>
        </div>
        <div>
          <label htmlFor="totalRooms" className={labelClass}>
            Tổng số phòng
          </label>
          <input
            id="totalRooms"
            type="number"
            min={1}
            required
            value={values.totalRooms}
            onChange={(e) => update("totalRooms", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 disabled:opacity-50"
      >
        {loading ? "Đang lưu..." : submitLabel}
      </button>
    </form>
  );
}
