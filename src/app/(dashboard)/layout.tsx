import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import type { LayoutProps } from "@/types/layout-type";

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
         <DashboardNavbar/>
        {children}
      </main>
    </SidebarProvider>
  );
}
