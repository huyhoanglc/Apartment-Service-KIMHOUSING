"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="vi">
      <body>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
            background: "#0a1e3c",
            color: "#fff",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Đã có lỗi xảy ra</h1>
          <p style={{ maxWidth: 420, color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
            Trang đang gặp sự cố hiển thị. Bạn thử tải lại trang xem sao nhé.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              borderRadius: 9999,
              padding: "0.6rem 1.5rem",
              fontWeight: 600,
              fontSize: "0.875rem",
              background: "linear-gradient(90deg,#fcf6ba,#d4af37,#b38728)",
              color: "#0a1e3c",
              border: "none",
              cursor: "pointer",
            }}
          >
            Tải lại trang
          </button>
        </div>
      </body>
    </html>
  );
}
