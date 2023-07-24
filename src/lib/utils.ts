// Hooks / Packages
import { toast } from "react-hot-toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onCopy = (copyText: string, copyName: string) => {
  navigator.clipboard.writeText(copyText);
  toast.success(`${copyName} copied to the clipboard.`);
};
