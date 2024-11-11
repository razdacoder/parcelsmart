import useMe from "@/features/auth/api/useMe";
import { getInitials } from "@/lib/utils";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { HelpSupportModal } from "./help-modal";
import NotificationBox from "./notification-box";
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
        <HelpSupportModal>
          <Button className="gap-2 hidden md:inline-flex h-8" size="sm">
            <QuestionMarkIcon />
            Help
          </Button>
        </HelpSupportModal>

        <NotificationBox />
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
