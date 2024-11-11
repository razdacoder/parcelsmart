import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";

export default function NotificationBox() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 mr-4" side="bottom">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium border-b p-4">Notifications</h3>
          <div className="flex flex-col gap-0.5">
            <div className="px-4 py-2 border-b">
              <p className="text-xs">Latest Changes in our terms and policy</p>
            </div>
            <div className="px-4 py-2 border-b">
              <p className="text-xs">Latest Changes in our terms and policy</p>
            </div>
            <div className="px-4 py-2 border-b">
              <p className="text-xs">Latest Changes in our terms and policy</p>
            </div>
            <div className="px-4 py-2 border-b">
              <p className="text-xs">Latest Changes in our terms and policy</p>
            </div>
            <div className="px-4 py-2 border-b">
              <p className="text-xs">Latest Changes in our terms and policy</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
