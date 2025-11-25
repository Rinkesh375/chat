import type { LayoutProps } from "@/types/layout-type";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen bg-black">{children}</div>
  );
}
