"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import ApartmentForm, { type ApartmentFormValues } from "../ApartmentForm";

export default function NewApartmentPage() {
  const router = useRouter();

  async function handleCreate(values: ApartmentFormValues): Promise<string | null> {
    const res = await apiFetch("/api/apartments", {
      method: "POST",
      body: JSON.stringify({
        houseNumber: values.houseNumber,
        street: values.street,
        district: values.district,
        buildingName: values.buildingName || undefined,
        managerName: values.managerName,
        managerPhone: values.managerPhone,
        accessType: values.accessType,
        totalRooms: Number(values.totalRooms),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        return data.errors.map((e: { field: string; message: string }) => e.message).join(", ");
      }
      return data.message ?? "Tạo apartment thất bại";
    }

    router.push("/dashboard/apartments");
    return null;
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-navy">Thêm Apartment</h1>
      <ApartmentForm onSubmit={handleCreate} submitLabel="Tạo mới" />
    </div>
  );
}
