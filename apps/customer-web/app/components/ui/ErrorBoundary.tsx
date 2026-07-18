"use client";

import { Component, type ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Boundary cục bộ cho các khối "trang trí" có thể vỡ vì lý do ngoài tầm kiểm soát (VD: WebGL bị
// chặn/không hỗ trợ trên máy người dùng) - lỗi chỉ mất đúng khối này, không kéo sập cả section/trang.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
