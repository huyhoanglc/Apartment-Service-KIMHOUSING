"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import ApartmentForm, { type ApartmentFormValues } from "../../ApartmentForm";

export default function EditApartmentPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<ApartmentFormValues | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await apiFetch(`/api/apartments/${params.id}`);
        const data = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setLoadError(data.message ?? "Không tải được apartment");
          return;
        }

        setInitialValues({
          houseNumber: data.houseNumber,
          street: data.street,
          district: data.district,
          buildingName: data.buildingName ?? "",
          managerName: data.managerName,
          managerPhone: data.managerPhone,
          accessType: data.accessType,
          totalRooms: String(data.totalRooms),
        });
      } catch {
        if (!ignore) setLoadError("Không thể kết nối đến máy chủ");
      }
    })();

    return () => {
      ignore = true;
    };
  }, [params.id]);

  async function handleUpdate(values: ApartmentFormValues): Promise<string | null> {
    const res = await apiFetch(`/api/apartments/${params.id}`, {
      method: "PUT",
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
      return data.message ?? "Cập nhật apartment thất bại";
    }

    router.push("/dashboard/apartments");
    return null;
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-navy">Sửa Apartment</h1>

      {loadError && <p className="text-sm text-red-600">{loadError}</p>}

      {!loadError && !initialValues && <p className="text-sm text-navy/60">Đang tải...</p>}

      {initialValues && (
        <ApartmentForm initialValues={initialValues} onSubmit={handleUpdate} submitLabel="Lưu thay đổi" />
      )}
    </div>
  );
}
