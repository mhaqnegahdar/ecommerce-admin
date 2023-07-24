"use client";

// Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Types
import { ApiAlertProps } from "@/types/props";
import { textMap, variantMap } from "@/types/maps";

// Icons
import { Copy, Server } from "lucide-react";

// Actions
import { onCopy } from "@/lib/utils";

const ApiAlert = ({
  title,
  description,
  variant = "public",
}: ApiAlertProps) => {
  // Actions
  // copy API route

  return (
    <Alert>
      <AlertTitle className="flex items-center gap-x-2">
        <Server className="w-4 h-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between   ">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm">
          {description}
        </code>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => onCopy(description, "API Route")}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
