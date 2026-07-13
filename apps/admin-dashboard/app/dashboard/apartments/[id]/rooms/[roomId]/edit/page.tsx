"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import RoomForm, { type RoomFormValues } from "../../RoomForm";

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams<{ id: string; roomId: string }>();
  const [initialValues, setInitialValues] = useState<RoomFormValues | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await apiFetch(`/api/rooms/${params.roomId}`);
        const data = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setLoadError(data.message ?? "Không tải được phòng");
          return;
        }

        setInitialValues({
          code: data.code,
          slug: data.slug,
          roomType: data.roomType,
          area: String(data.area),
          basePrice: String(data.basePrice ?? ""),
          publicPrice: String(data.publicPrice),
          status: data.status,
          featureIds: (data.features ?? []).map(
            (rf: { feature: { id: string } }) => rf.feature.id
          ),
        });
      } catch {
        if (!ignore) setLoadError("Không thể kết nối đến máy chủ");
      }
    })();

    return () => {
      ignore = true;
    };
  }, [params.roomId]);

  async function handleUpdate(values: RoomFormValues): Promise<string | null> {
    const res = await apiFetch(`/api/rooms/${params.roomId}`, {
      method: "PUT",
      body: JSON.stringify({
        code: values.code,
        slug: values.slug,
        roomType: values.roomType,
        area: Number(values.area),
        basePrice: Number(values.basePrice),
        publicPrice: Number(values.publicPrice),
        status: values.status,
        featureIds: values.featureIds,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        return data.errors.map((e: { field: string; message: string }) => e.message).join(", ");
      }
      return data.message ?? "Cập nhật phòng thất bại";
    }

    router.push(`/dashboard/apartments/${params.id}`);
    return null;
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-navy">Sửa phòng</h1>

      {loadError && <p className="text-sm text-red-600">{loadError}</p>}

      {!loadError && !initialValues && <p className="text-sm text-navy/60">Đang tải...</p>}

      {initialValues && (
        <RoomForm initialValues={initialValues} onSubmit={handleUpdate} submitLabel="Lưu thay đổi" />
      )}
    </div>
  );
}
