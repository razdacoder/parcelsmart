import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isPending: boolean;
  className?: string;
  disabled?: boolean
  children: ReactNode;
};

export default function SubmitButton({
  isPending,
  className,
  children,
  disabled
}: SubmitButtonProps) {
  return (
    <Button disabled={disabled} size="lg" className={cn("w-full", className)}>
      {isPending ? <Loader className="size-5 animate-spin" /> : children}
    </Button>
  );
}
