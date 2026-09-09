import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ROOM_STATUS_LABEL, ROOM_TYPE_LABEL, type RoomListItem } from "@/app/dashboard/apartments/RoomCard";

function roomToRow(room: RoomListItem) {
  return {
    "Mã phòng": room.code,
    "Địa chỉ": `${room.apartment.houseNumber} ${room.apartment.street}`,
    Quận: room.apartment.district,
    "Loại phòng": ROOM_TYPE_LABEL[room.roomType],
    "Diện tích (m²)": room.area,
    "Giá (đ/tháng)": room.publicPrice,
    "Trạng thái": ROOM_STATUS_LABEL[room.status],
    "Cập nhật": new Date(room.updatedAt).toLocaleDateString("vi-VN"),
  };
}

export function exportRoomsToExcel(rooms: RoomListItem[], fileName = "kho-ro-hang.xlsx") {
  const rows = rooms.map(roomToRow);
  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = [{ wch: 14 }, { wch: 32 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 16 }, { wch: 14 }, { wch: 12 }];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Kho rổ hàng");
  XLSX.writeFile(workbook, fileName);
}

// jsPDF không có sẵn font hỗ trợ dấu tiếng Việt (Helvetica) nên bỏ dấu cho phần xuất PDF để
// đảm bảo hiển thị đúng; bản Excel ở trên vẫn giữ nguyên dấu vì Excel đọc UTF-8 bình thường.
function stripDiacritics(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export function exportRoomsToPdf(rooms: RoomListItem[], fileName = "kho-ro-hang.pdf") {
  const doc = new jsPDF({ orientation: "landscape" });
  const rows = rooms.map((room) => Object.values(roomToRow(room)).map((v) => stripDiacritics(String(v))));
  const headers = Object.keys(roomToRow(rooms[0] ?? ({} as RoomListItem))).map(stripDiacritics);

  doc.setFontSize(12);
  doc.text(stripDiacritics("Kim Housing - Danh sach Kho ro hang"), 14, 12);

  autoTable(doc, {
    head: [headers.length ? headers : ["Ma phong", "Dia chi", "Quan", "Loai phong", "Dien tich (m2)", "Gia (d/thang)", "Trang thai", "Cap nhat"]],
    body: rows,
    startY: 18,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [10, 25, 47] },
  });

  doc.save(fileName);
}
