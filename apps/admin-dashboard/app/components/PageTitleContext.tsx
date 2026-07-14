"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PageTitleContextValue {
  title: string;
  setTitle: (title: string) => void;
}

const PageTitleContext = createContext<PageTitleContextValue | null>(null);

export function PageTitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("");
  return <PageTitleContext.Provider value={{ title, setTitle }}>{children}</PageTitleContext.Provider>;
}

export function usePageTitle(title: string) {
  const ctx = useContext(PageTitleContext);
  useEffect(() => {
    ctx?.setTitle(title);
    return () => ctx?.setTitle("");
  }, [ctx, title]);
}

export function useHeaderTitle(): string {
  const ctx = useContext(PageTitleContext);
  return ctx?.title ?? "";
}
