"use client";

import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { extractErrorMessage } from "@/app/lib/apiError";
import { usePageTitle } from "@/app/components/PageTitleContext";
import RoomForm, { type RoomFormValues } from "../RoomForm";

export default function NewRoomPage() {
  usePageTitle("Thêm phòng");
  const router = useRouter();
  const params = useParams<{ id: string }>();

  async function handleCreate(values: RoomFormValues): Promise<string | null> {
    const res = await apiFetch("/api/rooms", {
      method: "POST",
      body: JSON.stringify({
        apartmentId: params.id,
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

    const result = await res.json();

    if (!res.ok) {
      return extractErrorMessage(result, "Tạo phòng thất bại");
    }

    router.push(`/dashboard/apartments/${params.id}`);
    return null;
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-navy">Thêm phòng</h1>
      <RoomForm onSubmit={handleCreate} submitLabel="Tạo mới" />
    </div>
  );
}
