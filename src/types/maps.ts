// Types
import { BadgeProps } from "@/components/ui/badge";
import { ApiAlertProps } from "./props";

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export { textMap, variantMap };
