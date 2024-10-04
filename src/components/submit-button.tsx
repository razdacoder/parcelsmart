import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isPending: boolean;
  children: ReactNode;
};

export default function SubmitButton({
  isPending,
  children,
}: SubmitButtonProps) {
  return (
    <Button disabled={isPending} size="lg" className="w-full">
      {isPending ? <Loader className="size-5 animate-spin" /> : children}
    </Button>
  );
}
