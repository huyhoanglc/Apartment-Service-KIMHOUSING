import type { AccessType, ApartmentType } from "../../apartments/ApartmentForm";
import type { RoomType, RoomStatus } from "../../apartments/RoomCard";

export interface BuildingSummary {
  id: string;
  houseNumber: string;
  street: string;
  district: string;
  buildingName: string | null;
  managerName: string;
  managerPhone: string;
  accessType: AccessType;
  apartmentType: ApartmentType;
  totalRooms: number;
  rooms: { id: string }[];
}

export interface BuildingSearchInput {
  houseNumber: string;
  street: string;
  district: string;
}

export interface WizardRoomValues {
  code: string;
  slug: string;
  slugTouched: boolean;
  roomType: RoomType | "";
  area: string;
  basePrice: string;
  publicPrice: string;
  status: RoomStatus;
  featureIds: string[];
}

export const emptyWizardRoomValues: WizardRoomValues = {
  code: "",
  slug: "",
  slugTouched: false,
  roomType: "",
  area: "",
  basePrice: "",
  publicPrice: "",
  status: "AVAILABLE",
  featureIds: [],
};

export type RoomFieldErrors = Partial<Record<"code" | "roomType" | "area" | "price" | "images", string>>;
