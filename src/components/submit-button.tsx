import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isPending: boolean;
  className?: string;
  children: ReactNode;
};

export default function SubmitButton({
  isPending,
  className,
  children,
}: SubmitButtonProps) {
  return (
    <Button disabled={isPending} size="lg" className={cn("w-full", className)}>
      {isPending ? <Loader className="size-5 animate-spin" /> : children}
    </Button>
  );
}
