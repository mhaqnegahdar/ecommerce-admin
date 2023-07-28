"use client";
// Hooks / Packages
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { onOpen } from "@/redux/modal/alertModalSlice";
import { useAppDispatch } from "@/redux/hooks";

// Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

// Types
import { CellActionProps } from "@/types/props";

// Actions
import { onCopy } from "@/lib/utils";

const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  // States
  const deletePayload = useMemo(() => {
    return {
      title: "Are you sure you want to delete this product?",
      description: "This action cannot be undone.",
      action: "delete",
      api: `/api/${params.storeId}/products/${data.id}`,
      successMessage: "Product deleted.",
      failMessage:
        "Make sure you removed all the categories using this product first.",
      afterRoute: `/${params.storeId}/products`,
    };
  }, [params.storeId, data.id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onCopy(data.id, "Product Id")}
        >
          <Copy className="mr-2 h-4 w-4" /> Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}
        >
          <Edit className="mr-2 h-4 w-4" /> Update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => dispatch(onOpen(deletePayload))}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
