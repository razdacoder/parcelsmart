import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function APIKeyView() {
  return (
    <div className="border-2 rounded-lg p-4 md:p-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
        <h3 className="text-lg font-bold text-text">API Keys</h3>
        <Button className="w-full md:w-fit text-sm gap-2" size="lg">
          View Documentation <ArrowRight className="size-4" />{" "}
        </Button>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-text">Test API Keys</h3>
        <div className="border-2 rounded-lg p-2 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <KeyRound className="size-4" />
              <h6 className="text-sm font-semibold">Public Key:</h6>
            </div>
            <p className="truncate text-sm">
              pk_test_o5FPXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS
            </p>
          </div>
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(
                "pk_test_o5FPXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS"
              );
              toast.success("Copied to clipboard");
            }}
          >
            <Copy className="size-4 text-primary" />
          </button>
        </div>
        <div className="border-2 rounded-lg p-2 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <KeyRound className="size-4" />
              <h6 className="text-sm font-semibold">Secret Key:</h6>
            </div>
            <p className="truncate text-sm">
              pk_test_o5FPXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS
            </p>
          </div>
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(
                "pk_test_o5FPXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS"
              );
              toast.success("Copied to clipboard");
            }}
          >
            <Copy className="size-4 text-primary" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-bold text-text">Live API Keys</h3>
        <div className="border-2 rounded-lg p-2 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <KeyRound className="size-4" />
              <h6 className="text-sm font-semibold">Public Key:</h6>
            </div>
            <p className="truncate text-sm">
              pk_test_o5FPXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS
            </p>
          </div>
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(
                "pk_test_o5FPXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS"
              );
              toast.success("Copied to clipboard");
            }}
          >
            <Copy className="size-4 text-primary" />
          </button>
        </div>
        <div className="border-2 rounded-lg p-2 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <KeyRound className="size-4" />
              <h6 className="text-sm font-semibold">Secret Key:</h6>
            </div>
            <p className="truncate text-sm">
              pk_test_o5FPXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS
            </p>
          </div>
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(
                "pk_test_o5FPXxQKm8Gdl1h0TNBbGRvBLQ2YtjBS"
              );
              toast.success("Copied to clipboard");
            }}
          >
            <Copy className="size-4 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}
