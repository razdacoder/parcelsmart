"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function NavMain({
  className,
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentProps<"ul">) {
  const { pathname } = useLocation();
  return (
    <ul className={cn("grid gap-2", className)}>
      {items.map((item) => {
        const isActive = pathname === item.url;
        return (
          <li>
            <div className="relative flex items-center">
              <Link
                to={item.url}
                className={cn(
                  "group min-w-8 flex h-12 flex-1 items-center gap-2 overflow-hidden rounded-md px-3 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-primary focus-visible:ring-2",
                  isActive &&
                    "bg-accent text-primary hover:bg-accent/90 hover:text-primary"
                )}
              >
                <item.icon className={cn("size-5 shrink-0")} />
                <div className="flex flex-1 overflow-hidden">
                  <div className="line-clamp-1 pr-6">{item.title}</div>
                </div>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
