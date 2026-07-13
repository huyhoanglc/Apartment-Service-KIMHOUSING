import { getRooms, getFeatures, type RoomType } from "@/app/lib/api";
import RoomCard from "@/app/components/RoomCard";

// Không khai báo metadata riêng ở đây - trang chủ kế thừa title/description
// mặc định từ app/layout.tsx (layout.template không áp dụng cho page cùng segment gốc).

const inputClass =
  "w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold dark:border-white/15 dark:bg-white/5 dark:text-white";
const labelClass = "mb-1 block text-xs font-medium text-navy/70 dark:text-white/70";

function asString(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const district = asString(params.district);
  const roomType = asString(params.roomType) as RoomType | "";
  const minPrice = asString(params.minPrice);
  const maxPrice = asString(params.maxPrice);
  const featureId = asString(params.featureId);

  const [rooms, features] = await Promise.all([
    getRooms({ district, roomType, minPrice, maxPrice, featureId }).catch(() => null),
    getFeatures().catch(() => []),
  ]);

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <main className="flex flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold text-navy dark:text-white">Căn hộ dịch vụ cho thuê</h1>
          <p className="text-sm text-navy/60 dark:text-white/60">
            Tìm phòng phù hợp theo khu vực, giá và tiện ích
          </p>
        </div>

        <form
          method="GET"
          className="flex flex-wrap items-end gap-3 rounded-lg border border-navy/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <div>
            <label htmlFor="district" className={labelClass}>
              Quận/Huyện
            </label>
            <input
              id="district"
              name="district"
              defaultValue={district}
              placeholder="VD: Quận 1"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="roomType" className={labelClass}>
              Loại phòng
            </label>
            <select id="roomType" name="roomType" defaultValue={roomType} className={inputClass}>
              <option value="">Tất cả</option>
              <option value="STUDIO">Studio</option>
              <option value="DUPLEX">Duplex</option>
              <option value="ONE_BEDROOM">1 phòng ngủ</option>
              <option value="TWO_BEDROOM">2 phòng ngủ</option>
            </select>
          </div>

          <div>
            <label htmlFor="minPrice" className={labelClass}>
              Giá từ
            </label>
            <input
              id="minPrice"
              name="minPrice"
              type="number"
              min={0}
              defaultValue={minPrice}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className={labelClass}>
              Giá đến
            </label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              min={0}
              defaultValue={maxPrice}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="featureId" className={labelClass}>
              Tiện ích
            </label>
            <select id="featureId" name="featureId" defaultValue={featureId} className={inputClass}>
              <option value="">Tất cả</option>
              {features.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
          >
            Tìm phòng
          </button>
        </form>

        {rooms === null && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Không tải được danh sách phòng, vui lòng thử lại sau.
          </p>
        )}

        {rooms !== null && rooms.length === 0 && (
          <p className="text-sm text-navy/60 dark:text-white/60">Không tìm thấy phòng phù hợp.</p>
        )}

        {rooms !== null && rooms.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
