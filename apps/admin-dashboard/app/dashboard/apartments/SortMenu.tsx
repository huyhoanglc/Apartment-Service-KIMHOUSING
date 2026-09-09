"use client";

import { ArrowDownAZ, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useInventoryStore, type SortDir, type SortField } from "@/app/store/useInventoryStore";

const OPTIONS: { field: SortField; dir: SortDir; label: string }[] = [
  { field: "updatedAt", dir: "desc", label: "Mới cập nhật nhất" },
  { field: "updatedAt", dir: "asc", label: "Cập nhật cũ nhất" },
  { field: "publicPrice", dir: "asc", label: "Giá tăng dần" },
  { field: "publicPrice", dir: "desc", label: "Giá giảm dần" },
  { field: "area", dir: "asc", label: "Diện tích tăng dần" },
  { field: "area", dir: "desc", label: "Diện tích giảm dần" },
];

export default function SortMenu() {
  const sortField = useInventoryStore((s) => s.sortField);
  const sortDir = useInventoryStore((s) => s.sortDir);
  const setSortExplicit = useInventoryStore((s) => s.setSortExplicit);

  const current = OPTIONS.find((o) => o.field === sortField && o.dir === sortDir) ?? OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ArrowDownAZ className="h-3.5 w-3.5" /> {current.label} <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Sắp xếp theo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {OPTIONS.map((opt) => (
          <DropdownMenuItem key={`${opt.field}-${opt.dir}`} onClick={() => setSortExplicit(opt.field, opt.dir)}>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
