"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL, apiFetch } from "@/app/lib/api";
import { extractErrorMessage } from "@/app/lib/apiError";
import { getToken, getUser } from "@/app/lib/auth";
import { usePageTitle } from "@/app/components/PageTitleContext";
import { useToast } from "@/app/components/ToastProvider";
import { useConfirm } from "@/app/components/ConfirmProvider";
import ImageLightbox from "@/app/components/ImageLightbox";
import { slugify } from "@/app/lib/slugify";
import Stepper, { type WizardStep } from "./Stepper";
import BuildingSearchCard from "./BuildingSearchCard";
import BuildingCreateCard from "./BuildingCreateCard";
import RoomFormCard, { type Feature } from "./RoomFormCard";
import RoomPreviewCard from "./RoomPreviewCard";
import type { StagedImage } from "./ImageDropzone";
import {
  emptyWizardRoomValues,
  type BuildingSearchInput,
  type BuildingSummary,
  type RoomFieldErrors,
  type WizardRoomValues,
} from "./types";

type Phase = "search" | "create-building" | "create-room" | "done";

function CheckCircleBigIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
      <circle cx="10" cy="10" r="7.5" />
      <path d="m6.8 10 2.2 2.2 4.2-4.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function uploadMediaWithProgress(
  roomId: string,
  files: File[],
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("roomId", roomId);
    files.forEach((file) => formData.append("files", file));

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}/api/media/upload`);
    const token = getToken();
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error("Tải ảnh lên thất bại"));
    };
    xhr.onerror = () => reject(new Error("Không thể kết nối đến máy chủ"));
    xhr.send(formData);
  });
}

export default function NewRoomWizardPage() {
  usePageTitle("Thêm phòng mới");
  const router = useRouter();
  const { showToast } = useToast();
  const confirmDialog = useConfirm();
  const isAdmin = getUser()?.role === "ADMIN";

  const [phase, setPhase] = useState<Phase>("search");
  const [addressSummary, setAddressSummary] = useState<BuildingSearchInput>({
    houseNumber: "",
    street: "",
    district: "",
  });
  const [building, setBuilding] = useState<BuildingSummary | null>(null);

  const [roomValues, setRoomValues] = useState<WizardRoomValues>(emptyWizardRoomValues);
  const [images, setImages] = useState<StagedImage[]>([]);
  const [errors, setErrors] = useState<RoomFieldErrors>({});
  const [saving, setSaving] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [createdRoom, setCreatedRoom] = useState<{ id: string; apartmentId: string } | null>(null);

  const [features, setFeatures] = useState<Feature[]>([]);
  const [featuresError, setFeaturesError] = useState<string | null>(null);
  const [addingFeature, setAddingFeature] = useState(false);

  const step: WizardStep = phase === "create-room" ? 2 : phase === "done" ? 3 : 1;

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await apiFetch("/api/features");
        const result = await res.json();
        if (ignore) return;
        if (!res.ok) {
          setFeaturesError(result.message ?? "Không tải được danh sách tiện ích");
          return;
        }
        setFeatures(result.data);
      } catch {
        if (!ignore) setFeaturesError("Không thể kết nối đến máy chủ");
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleAddFeature(name: string) {
    setAddingFeature(true);
    setFeaturesError(null);
    try {
      const res = await apiFetch("/api/features", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      const result = await res.json();

      if (!res.ok) {
        setFeaturesError(result.message ?? "Không thêm được tiện ích");
        return;
      }

      setFeatures((prev) => [...prev, result.data]);
      setRoomValues((prev) => ({ ...prev, featureIds: [...prev.featureIds, result.data.id] }));
    } catch {
      setFeaturesError("Không thể kết nối đến máy chủ");
    } finally {
      setAddingFeature(false);
    }
  }

  async function handleDeleteFeature(id: string) {
    const ok = await confirmDialog({
      title: "Xoá tiện ích?",
      description: "Tiện ích này sẽ bị gỡ khỏi mọi apartment/phòng đang dùng trong hệ thống.",
      confirmText: "Xoá",
      danger: true,
    });
    if (!ok) return;

    try {
      const res = await apiFetch(`/api/features/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showToast(data.message ?? "Xoá tiện ích thất bại", "error");
        return;
      }
      setFeatures((prev) => prev.filter((f) => f.id !== id));
      setRoomValues((prev) => ({ ...prev, featureIds: prev.featureIds.filter((fid) => fid !== id) }));
      showToast("Đã xoá tiện ích", "success");
    } catch {
      showToast("Không thể kết nối đến máy chủ", "error");
    }
  }

  function handleBuildingFound(foundBuilding: BuildingSummary) {
    setAddressSummary({
      houseNumber: foundBuilding.houseNumber,
      street: foundBuilding.street,
      district: foundBuilding.district,
    });
    setBuilding(foundBuilding);
    setPhase("create-room");
  }

  function handleCreateNewBuilding(input: BuildingSearchInput) {
    setAddressSummary(input);
    setPhase("create-building");
  }

  function updateRoomValue<K extends keyof WizardRoomValues>(key: K, value: WizardRoomValues[K]) {
    setRoomValues((prev) => {
      if (key === "code") {
        const next = { ...prev, code: value as string };
        if (!prev.slugTouched) next.slug = slugify(value as string);
        return next;
      }
      if (key === "slug") {
        return { ...prev, slug: value as string, slugTouched: true };
      }
      return { ...prev, [key]: value };
    });

    if (key === "code") setErrors((prev) => ({ ...prev, code: undefined }));
    if (key === "roomType") setErrors((prev) => ({ ...prev, roomType: undefined }));
    if (key === "area") setErrors((prev) => ({ ...prev, area: undefined }));
    if (key === "basePrice" || key === "publicPrice") setErrors((prev) => ({ ...prev, price: undefined }));
  }

  function handleImagesChange(next: StagedImage[]) {
    setImages(next);
    if (next.length > 0) setErrors((prev) => ({ ...prev, images: undefined }));
  }

  function resetWizard() {
    setPhase("search");
    setAddressSummary({ houseNumber: "", street: "", district: "" });
    setBuilding(null);
    setRoomValues(emptyWizardRoomValues);
    setImages([]);
    setErrors({});
    setCreatedRoom(null);
  }

  async function handleSaveRoom() {
    if (!building) return;

    const nextErrors: RoomFieldErrors = {};
    if (!roomValues.code.trim()) nextErrors.code = "Chưa nhập mã phòng";
    if (!roomValues.roomType) nextErrors.roomType = "Chưa chọn loại phòng";
    if (!(Number(roomValues.area) > 0)) nextErrors.area = "Diện tích phải lớn hơn 0";
    if (!(Number(roomValues.basePrice) > 0) || !(Number(roomValues.publicPrice) > 0)) {
      nextErrors.price = "Chưa nhập giá hợp lệ";
    }
    if (images.length === 0) nextErrors.images = "Cần ít nhất 1 ảnh";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      showToast("Vui lòng kiểm tra lại các trường còn thiếu", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch("/api/rooms", {
        method: "POST",
        body: JSON.stringify({
          apartmentId: building.id,
          code: roomValues.code.trim(),
          slug: roomValues.slug.trim() || slugify(roomValues.code),
          roomType: roomValues.roomType,
          area: Number(roomValues.area) || 0,
          basePrice: Number(roomValues.basePrice),
          publicPrice: Number(roomValues.publicPrice),
          status: roomValues.status,
          featureIds: roomValues.featureIds,
        }),
      });
      const result = await res.json();

      if (!res.ok) {
        showToast(extractErrorMessage(result, "Tạo phòng thất bại"), "error");
        return;
      }

      const roomId: string = result.data.id;

      if (images.length > 0) {
        setUploadProgress(0);
        try {
          await uploadMediaWithProgress(
            roomId,
            images.map((img) => img.file),
            setUploadProgress
          );
        } catch {
          showToast("Đã tạo phòng nhưng tải ảnh lên thất bại, hãy thử lại ở trang chi tiết phòng", "error");
        }
      }

      showToast("Đã tạo phòng thành công", "success");
      setCreatedRoom({ id: roomId, apartmentId: building.id });
      setPhase("done");
    } catch {
      showToast("Không thể kết nối đến máy chủ", "error");
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  }

  if (phase === "done" && createdRoom) {
    return (
      <div className="mx-auto max-w-md">
        <div className="animate-fade-in rounded-2xl border border-navy/10 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircleBigIcon />
          </span>
          <h1 className="mt-4 text-lg font-semibold text-navy">Đã tạo phòng thành công!</h1>
          <p className="mt-1 text-sm text-navy/60">Phòng {roomValues.code} đã được thêm vào hệ thống.</p>

          <div className="mt-6 flex flex-col gap-2">
            <Link
              href={`/dashboard/apartments/${createdRoom.apartmentId}/rooms/${createdRoom.id}`}
              className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
            >
              Xem phòng vừa tạo
            </Link>
            <button
              type="button"
              onClick={resetWizard}
              className="rounded-full border border-navy/15 px-5 py-2.5 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to"
            >
              Tạo phòng khác
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/apartments")}
              className="text-sm text-navy/50 underline transition-colors duration-300 hover:text-gold-to"
            >
              Về Rổ Hàng Kim Housing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col items-center gap-5">
        <p className="text-sm text-navy/50">Kiểm tra dự án trước khi tạo phòng mới.</p>
        <Stepper current={step} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {phase === "search" && (
            <BuildingSearchCard onContinue={handleBuildingFound} onCreateNew={handleCreateNewBuilding} />
          )}

          {phase === "create-building" && (
            <BuildingCreateCard
              addressSummary={addressSummary}
              onCreated={(newBuilding) => {
                setBuilding(newBuilding);
                setPhase("create-room");
              }}
            />
          )}

          {phase === "create-room" && building && (
            <>
              <RoomFormCard
                values={roomValues}
                onChange={updateRoomValue}
                images={images}
                onImagesChange={handleImagesChange}
                errors={errors}
                features={features}
                featuresError={featuresError}
                onAddFeature={handleAddFeature}
                addingFeature={addingFeature}
                onDeleteFeature={isAdmin ? handleDeleteFeature : undefined}
                onImageClick={setLightboxIndex}
              />

              <div className="animate-fade-in mt-4 flex items-center justify-between rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
                <div className="text-sm text-navy/60">
                  {uploadProgress !== null ? `Đang tải ảnh lên... ${uploadProgress}%` : null}
                </div>
                <button
                  type="button"
                  onClick={handleSaveRoom}
                  disabled={saving}
                  className="ml-auto rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-navy-light disabled:opacity-60"
                >
                  {saving ? "Đang lưu..." : "Lưu phòng"}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="lg:col-span-5">
          <RoomPreviewCard
            imageUrls={images.map((img) => img.previewUrl)}
            code={roomValues.code}
            roomType={roomValues.roomType}
            area={roomValues.area}
            publicPrice={roomValues.publicPrice}
            status={roomValues.status}
            address={
              building
                ? `${building.houseNumber} ${building.street}`
                : addressSummary.houseNumber
                  ? `${addressSummary.houseNumber} ${addressSummary.street}`
                  : ""
            }
            district={building?.district ?? addressSummary.district}
            featureLabels={features
              .filter((f) => roomValues.featureIds.includes(f.id))
              .map((f) => f.name)}
            onImageClick={setLightboxIndex}
            isNewProject={building?.isNewProject}
          />
        </div>
      </div>

      <ImageLightbox
        images={images.map((img) => img.previewUrl)}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
