"use client";

import logowhite from "@/assets/logo.svg";
import { useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  TruckIcon,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-provider";
import { NavMain } from "./nav-main";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
} from "./ui/sidebar";

export const iframeHeight = "870px";

export const containerClassName = "w-full h-full";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Shipment",
      url: "/shipment",
      icon: TruckIcon,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: WalletCards,
    },
    // {
    //   title: "Insight",
    //   url: "/insight",
    //   icon: ChartNoAxesCombinedIcon,
    // },
    {
      title: "Address Book",
      url: "/address-book",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return (
    <Sidebar className="bg-primary text-white space-y-8">
      <SidebarHeader className="relative flex justify-center py-5 pe-10">
        <img src={logowhite} alt="Parcel Smart Logo" className="h-[52px]" />
        {/* <SidebarTrigger className="absolute top-3 -right-4 z-10 bg-white text-text" /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <NavMain items={data.navMain} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={() => {
            logout();
            queryClient.clear();
            navigate("/auth/login", { replace: true });
          }}
          variant="secondary"
          className="w-full gap-2 text-primary"
        >
          <LogOut className="size-4 text-primary" /> Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
