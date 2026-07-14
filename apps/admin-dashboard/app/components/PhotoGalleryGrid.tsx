function ImagePlaceholderIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
      <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
      <circle cx="7" cy="9" r="1.5" />
      <path d="m4 14 4-3.5 3 2.5 3.5-3.5 3.5 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 1 ảnh chính bên trái + lưới 3x2 (6 ô) bên phải.
 * Ô cuối cùng (góc phải dưới) hiện overlay "+n" khi còn ảnh chưa hiển thị hết.
 */
export default function PhotoGalleryGrid({
  images,
  heightClass = "h-48",
}: {
  images: string[];
  heightClass?: string;
}) {
  const [main, ...rest] = images;
  const thumbs = rest.slice(0, 6);
  const extraCount = Math.max(0, rest.length - thumbs.length);

  if (!main) {
    return (
      <div className={`flex ${heightClass} w-full flex-col items-center justify-center gap-1 text-navy/30`}>
        <ImagePlaceholderIcon />
        <span className="text-xs">Chưa có ảnh</span>
      </div>
    );
  }

  return (
    <div className={`flex ${heightClass} w-full gap-0.5`}>
      <div className={`relative h-full overflow-hidden ${thumbs.length > 0 ? "w-3/5" : "w-full"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ảnh Cloudinary/blob URL, không nằm trong danh sách domain tối ưu hoá tĩnh */}
        <img src={main} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>

      {thumbs.length > 0 && (
        <div className="grid w-2/5 grid-cols-3 grid-rows-2 gap-0.5">
          {thumbs.map((url, i) => (
            <div key={i} className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- ảnh Cloudinary/blob URL, không nằm trong danh sách domain tối ưu hoá tĩnh */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              {i === thumbs.length - 1 && extraCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-navy/60 text-xs font-semibold text-white">
                  +{extraCount}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
