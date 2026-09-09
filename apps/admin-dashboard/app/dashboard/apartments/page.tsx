"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Download, FileSpreadsheet, FileText, Plus } from "lucide-react";
import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/auth";
import { useToast } from "@/app/components/ToastProvider";
import { useConfirm } from "@/app/components/ConfirmProvider";
import { usePageTitle } from "@/app/components/PageTitleContext";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import EmptyState from "@/app/components/dashboard/EmptyState";
import ErrorState from "@/app/components/dashboard/ErrorState";
import { useInventoryStore, PAGE_SIZE } from "@/app/store/useInventoryStore";
import { useRooms } from "@/app/hooks/useRooms";
import { refineRooms, sortRooms } from "@/app/lib/filterRooms";
import { exportRoomsToExcel, exportRoomsToPdf } from "@/app/lib/exportRooms";
import FilterBar from "./FilterBar";
import SortMenu from "./SortMenu";
import RoomCard, { type RoomListItem, type RoomStatus } from "./RoomCard";
import RoomCardSkeleton from "./RoomCardSkeleton";
import RoomTable from "./RoomTable";
import RoomQuickViewDialog from "./RoomQuickViewDialog";
import BulkActionBar from "./BulkActionBar";
import RoomWizardSheet from "./RoomWizardSheet";

export default function ApartmentsPage() {
  usePageTitle("Kho rổ hàng");
  const { showToast } = useToast();
  const confirmDialog = useConfirm();
  const queryClient = useQueryClient();
  const isAdmin = getUser()?.role === "ADMIN";

  const filters = useInventoryStore((s) => s.filters);
  const page = useInventoryStore((s) => s.page);
  const setPage = useInventoryStore((s) => s.setPage);
  const sortField = useInventoryStore((s) => s.sortField);
  const sortDir = useInventoryStore((s) => s.sortDir);
  const setSort = useInventoryStore((s) => s.setSort);
  const viewMode = useInventoryStore((s) => s.viewMode);
  const selectedIds = useInventoryStore((s) => s.selectedIds);
  const toggleSelected = useInventoryStore((s) => s.toggleSelected);
  const setSelected = useInventoryStore((s) => s.setSelected);
  const clearSelected = useInventoryStore((s) => s.clearSelected);

  const [quickViewRoom, setQuickViewRoom] = useState<RoomListItem | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useRooms(filters);

  const filteredRooms = useMemo(() => refineRooms(data?.rows ?? [], filters), [data, filters]);
  const sortedRooms = useMemo(() => sortRooms(filteredRooms, sortField, sortDir), [filteredRooms, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedRooms.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleRooms = sortedRooms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function invalidateRooms() {
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
  }

  async function handleDeleteRoom(room: RoomListItem) {
    const ok = await confirmDialog({
      title: "Xoá phòng?",
      description: `Phòng ${room.code} sẽ bị xoá vĩnh viễn khỏi hệ thống.`,
      confirmText: "Xoá",
      danger: true,
    });
    if (!ok) return;

    const res = await apiFetch(`/api/rooms/${room.id}`, { method: "DELETE" });
    if (!res.ok) {
      showToast("Xoá phòng thất bại", "error");
      return;
    }
    showToast("Đã xoá phòng", "success");
    setSelected(selectedIds.filter((id) => id !== room.id));
    invalidateRooms();
  }

  async function handleBulkChangeStatus(status: RoomStatus) {
    setBulkBusy(true);
    try {
      const results = await Promise.allSettled(
        selectedIds.map((id) => apiFetch(`/api/rooms/${id}`, { method: "PUT", body: JSON.stringify({ status }) }))
      );
      const failed = results.filter((r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok)).length;
      if (failed > 0) showToast(`Đổi trạng thái thất bại cho ${failed} phòng`, "error");
      else showToast(`Đã đổi trạng thái ${selectedIds.length} phòng`, "success");
      clearSelected();
      invalidateRooms();
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleBulkDelete() {
    const ok = await confirmDialog({
      title: `Xoá ${selectedIds.length} phòng?`,
      description: "Các phòng đã chọn sẽ bị xoá vĩnh viễn khỏi hệ thống.",
      confirmText: "Xoá tất cả",
      danger: true,
    });
    if (!ok) return;

    setBulkBusy(true);
    try {
      const results = await Promise.allSettled(selectedIds.map((id) => apiFetch(`/api/rooms/${id}`, { method: "DELETE" })));
      const failed = results.filter((r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok)).length;
      if (failed > 0) showToast(`Xoá thất bại ${failed} phòng`, "error");
      else showToast(`Đã xoá ${selectedIds.length} phòng`, "success");
      clearSelected();
      invalidateRooms();
    } finally {
      setBulkBusy(false);
    }
  }

  function handleBulkAssignSale() {
    showToast("Tính năng gán phòng cho sale khác đang được phát triển", "info");
  }

  function handleToggleSelectAll() {
    const pageIds = visibleRooms.map((r) => r.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    setSelected(allSelected ? selectedIds.filter((id) => !pageIds.includes(id)) : [...new Set([...selectedIds, ...pageIds])]);
  }

  function handleExportExcel() {
    if (sortedRooms.length === 0) return;
    exportRoomsToExcel(sortedRooms);
    showToast("Đã xuất file Excel", "success");
  }

  function handleExportPdf() {
    if (sortedRooms.length === 0) return;
    exportRoomsToPdf(sortedRooms);
    showToast("Đã xuất file PDF", "success");
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6 flex items-center justify-end gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={sortedRooms.length === 0}>
              <Download className="h-4 w-4" /> Xuất file
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportExcel}>
              <FileSpreadsheet className="h-4 w-4" /> Xuất Excel (.xlsx)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportPdf}>
              <FileText className="h-4 w-4" /> Xuất PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/dashboard/apartments/new" className="text-sm text-navy/50 underline transition-colors duration-300 hover:text-gold-to">
          Chỉ tạo dự án
        </Link>
        <Button onClick={() => setWizardOpen(true)}>
          <Plus className="h-4 w-4" /> Thêm Phòng
        </Button>
      </div>

      <div className="mb-6">
        <FilterBar />
      </div>

      {isError && <ErrorState description={error instanceof Error ? error.message : undefined} onRetry={() => refetch()} />}

      {!isError && isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isError && !isLoading && sortedRooms.length === 0 && (
        <EmptyState
          title="Không tìm thấy phòng phù hợp"
          description="Thử điều chỉnh bộ lọc hoặc thêm phòng mới vào kho rổ hàng."
          action={
            <Button variant="outline" onClick={() => useInventoryStore.getState().clearFilters()}>
              Xoá bộ lọc
            </Button>
          }
        />
      )}

      {!isError && !isLoading && sortedRooms.length > 0 && (
        <>
          <div className="mb-3 flex items-center justify-between gap-3 text-sm text-navy/50">
            <span>
              {sortedRooms.length} phòng phù hợp {isFetching && "· đang cập nhật..."}
            </span>
            <SortMenu />
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  selected={selectedIds.includes(room.id)}
                  onToggleSelect={toggleSelected}
                  onQuickView={setQuickViewRoom}
                  onDelete={isAdmin ? handleDeleteRoom : undefined}
                />
              ))}
            </div>
          ) : (
            <RoomTable
              rooms={visibleRooms}
              selectedIds={selectedIds}
              onToggleSelect={toggleSelected}
              onToggleSelectAll={handleToggleSelectAll}
              sortField={sortField}
              sortDir={sortDir}
              onSort={setSort}
              onQuickView={setQuickViewRoom}
              onDelete={isAdmin ? handleDeleteRoom : undefined}
              canDelete={isAdmin}
            />
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-200 hover:border-gold hover:text-gold-to disabled:opacity-30"
                aria-label="Trang trước"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-navy/60">
                Trang {currentPage} / {totalPages} · {sortedRooms.length} phòng
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-200 hover:border-gold hover:text-gold-to disabled:opacity-30"
                aria-label="Trang sau"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}

      <BulkActionBar
        count={selectedIds.length}
        onClear={clearSelected}
        onChangeStatus={handleBulkChangeStatus}
        onAssignSale={handleBulkAssignSale}
        onDelete={handleBulkDelete}
        canDelete={isAdmin}
        busy={bulkBusy}
      />

      <RoomQuickViewDialog room={quickViewRoom} onOpenChange={(open) => !open && setQuickViewRoom(null)} />
      <RoomWizardSheet open={wizardOpen} onOpenChange={setWizardOpen} onCreated={invalidateRooms} />
    </div>
  );
}
