import useMe from "@/features/auth/api/useMe";
import { getInitials } from "@/lib/utils";
import { Bell } from "lucide-react";
import { HelpSupportModal } from "./help-modal";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppNavBar({ title }: { title: string }) {
  const { data } = useMe();
  return (
    <header className="bg-white py-5 shadow-sm px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h2 className="text-lg md:text-2xl font-bold">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <HelpSupportModal />

        <Button variant="ghost" size="icon">
          <Bell className="size-4" />
        </Button>
        {data && (
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary font-semibold text-white">
              {getInitials(data?.data.first_name, data?.data.last_name)}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  );
}
