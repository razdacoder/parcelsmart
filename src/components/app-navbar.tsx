import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppNavBar({ title }: { title: string }) {
  return (
    <header className="bg-white py-5 shadow-sm px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h2 className="text-lg md:text-2xl font-bold">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        <Button className="gap-2 hidden md:inline-flex" size="sm">
          <QuestionMarkIcon />
          Help
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="size-4" />
        </Button>

        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary font-semibold text-white">
            RR
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
