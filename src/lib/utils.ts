import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const copyText = (text: string) => {
  window.navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

export const getInitials = (
  first_name?: string,
  last_name?: string
): string => {
  return (
    `${first_name?.charAt(0).toUpperCase()}${last_name
      ?.charAt(0)
      .toUpperCase()}` || ""
  );
};

export function isLeastExpensiveRate(rates?: ShipmentRate[]): string {
  if (rates?.length === 0 || !rates) return "";

  const leastExpensiveRate = rates.reduce((leastExpensive, currentRate) => {
    return currentRate.amount < leastExpensive.amount
      ? currentRate
      : leastExpensive;
  });

  return leastExpensiveRate.carrier_slug;
}
