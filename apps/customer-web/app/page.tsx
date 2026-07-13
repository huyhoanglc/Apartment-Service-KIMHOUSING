import { getRooms, getFeatures, type RoomType } from "@/app/lib/api";
import RoomCard from "@/app/components/RoomCard";

// Không khai báo metadata riêng ở đây - trang chủ kế thừa title/description
// mặc định từ app/layout.tsx (layout.template không áp dụng cho page cùng segment gốc).

const inputClass =
  "w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";
const labelClass = "mb-1 block text-xs font-medium text-zinc-700 dark:text-zinc-300";

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
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">KIMHOUSING</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Căn hộ dịch vụ cho thuê theo phòng
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-6 p-6">
        <form
          method="GET"
          className="flex flex-wrap items-end gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
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
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
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
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Không tìm thấy phòng phù hợp.</p>
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
