import { Badge } from "@/components/ui/badge";

type StatusProps = {
  status: "draft" | "confirmed" | "in_transit" | "delivered" | "cancelled" | "pending";
};

export default function StatusBadge({ status }: StatusProps) {
  if (status === "in_transit") {
    return (
      <Badge className="bg-[#CB6F1B26] py-1 px-3 text-[#CB6F1B] w-fit flex justify-center hover:bg-[#CB6F1B26] hover:text-[#CB6F1B]">
        In Transit
      </Badge>
    );
  }
  if (status === "cancelled") {
    return (
      <Badge className="bg-[#FDF2F8] py-1 px-3 text-[#ED4F9D] w-fit flex justify-center hover:bg-[#FDF2F8] hover:text-[#ED4F9D]">
        Cancelled
      </Badge>
    );
  }

  if (status === "draft") {
    return (
      <Badge className="bg-[#D6D8D9] py-1 px-3 text-[#4F4F4F] w-fit flex justify-center hover:bg-[#D6D8D9] hover:text-[#4F4F4F]">
        Draft
      </Badge>
    );
  }

  if (status === "confirmed") {
    return (
      <Badge className="bg-[#EFF6FF] py-1 px-3 text-[#2563EB] w-fit flex justify-center hover:bg-[#EFF6FF] hover:text-[#2563EB]">
        Completed
      </Badge>
    );
  }

  if (status === "pending") {
    return (
        <Badge className="bg-yellow-500  py-1 px-3 w-fit flex justify-center hover:bg-yellow-600 hover:text-white">
          Pending
        </Badge>
    );
  }
}
