"use client";

import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle } from "@/app/components/ui/sheet";
import RoomWizard from "@/app/dashboard/rooms/new/RoomWizard";

export default function RoomWizardSheet({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent size="xl">
        <SheetHeader>
          <SheetTitle>+ Thêm phòng mới</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <RoomWizard onClose={() => onOpenChange(false)} onCreated={onCreated} />
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
