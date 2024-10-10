import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const isMobile = useIsMobile();
  return (
    <SidebarLayout defaultOpen={isMobile ? false : true} className="relative">
      <AppSidebar />
      <main className="flex flex-1 bg-[#F8FAFC] w-full p-2 transition-all duration-300 ease-in-out">
        <Outlet />
      </main>
    </SidebarLayout>
  );
}
