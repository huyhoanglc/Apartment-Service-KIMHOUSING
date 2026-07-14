"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

interface PendingConfirm {
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
}

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<PendingConfirm | null>(null);

  const confirmDialog = useCallback<ConfirmFn>((options) => {
    return new Promise((resolve) => {
      setPending({ options, resolve });
    });
  }, []);

  function handle(result: boolean) {
    pending?.resolve(result);
    setPending(null);
  }

  return (
    <ConfirmContext.Provider value={confirmDialog}>
      {children}
      {pending && (
        <div className="fixed inset-0 z-300 flex items-center justify-center bg-navy/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl">
            <h2 className="text-base font-semibold text-navy">{pending.options.title ?? "Xác nhận"}</h2>
            {pending.options.description && (
              <p className="mt-2 text-sm text-navy/60">{pending.options.description}</p>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handle(false)}
                className="rounded-md border border-navy/15 px-4 py-2 text-sm font-medium text-navy transition-colors duration-200 hover:border-gold hover:text-gold-to"
              >
                {pending.options.cancelText ?? "Huỷ"}
              </button>
              <button
                type="button"
                onClick={() => handle(true)}
                className={
                  pending.options.danger
                    ? "rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700"
                    : "rounded-md bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy transition-all duration-200 hover:brightness-105"
                }
              >
                {pending.options.confirmText ?? "Xác nhận"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}
