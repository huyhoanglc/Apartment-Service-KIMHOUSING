function ImagePlaceholderIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
      <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
      <circle cx="7" cy="9" r="1.5" />
      <path d="m4 14 4-3.5 3 2.5 3.5-3.5 3.5 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Thumb({
  url,
  showBadge,
  extraCount,
  onClick,
}: {
  url: string;
  showBadge: boolean;
  extraCount: number;
  onClick?: () => void;
}) {
  return (
    <div
      className={`relative h-full overflow-hidden ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ảnh Cloudinary/blob URL, không nằm trong danh sách domain tối ưu hoá tĩnh */}
      <img src={url} alt="" className="h-full w-full object-cover" />
      {showBadge && extraCount > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy/60 text-xs font-semibold text-white">
          +{extraCount}
        </div>
      )}
    </div>
  );
}

/**
 * 1 ảnh chính bên trái (65%) + cột 2 ảnh nhỏ xếp chồng bên phải (35%),
 * và 1 hàng ngang 3 ảnh nhỏ bên dưới. Ảnh nhỏ cuối cùng (góc phải dưới
 * cùng) hiện overlay "+n" khi còn ảnh chưa hiển thị hết.
 */
export default function PhotoGalleryGrid({
  images,
  heightClass = "h-48",
  onImageClick,
}: {
  images: string[];
  heightClass?: string;
  onImageClick?: (index: number) => void;
}) {
  const [main, ...rest] = images;

  if (!main) {
    return (
      <div className={`flex ${heightClass} w-full flex-col items-center justify-center gap-1 text-navy/30`}>
        <ImagePlaceholderIcon />
        <span className="text-xs">Chưa có ảnh</span>
      </div>
    );
  }

  const topStack = rest.slice(0, 2);
  const bottomRow = rest.slice(2, 5);
  const hasRight = topStack.length > 0;
  const hasBottom = bottomRow.length > 0;
  const extraCount = Math.max(0, rest.length - (topStack.length + bottomRow.length));

  return (
    <div className={`flex ${heightClass} w-full flex-col gap-0.5`}>
      <div className={`flex w-full gap-0.5 ${hasBottom ? "h-[68%]" : "h-full"}`}>
        <div
          className={`relative h-full overflow-hidden ${hasRight ? "w-[65%]" : "w-full"} ${onImageClick ? "cursor-pointer" : ""}`}
          onClick={onImageClick ? () => onImageClick(0) : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ảnh Cloudinary/blob URL, không nằm trong danh sách domain tối ưu hoá tĩnh */}
          <img
            src={main}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {hasRight && (
          <div className="flex h-full w-[35%] flex-col gap-0.5">
            {topStack.map((url, i) => (
              <div key={url} className={topStack.length === 2 ? "h-1/2" : "h-full"}>
                <Thumb
                  url={url}
                  showBadge={!hasBottom && i === topStack.length - 1}
                  extraCount={extraCount}
                  onClick={onImageClick ? () => onImageClick(1 + i) : undefined}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {hasBottom && (
        <div className="flex h-[32%] w-full gap-0.5">
          {bottomRow.map((url, i) => (
            <div key={url} className="h-full flex-1">
              <Thumb
                url={url}
                showBadge={i === bottomRow.length - 1}
                extraCount={extraCount}
                onClick={onImageClick ? () => onImageClick(1 + topStack.length + i) : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
