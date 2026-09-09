"use client";

import { usePageTitle } from "@/app/components/PageTitleContext";
import RoomWizard from "./RoomWizard";

export default function NewRoomWizardPage() {
  usePageTitle("Thêm phòng mới");
  return <RoomWizard />;
}
