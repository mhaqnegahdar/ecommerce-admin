"use client";

import { ColumnDef } from "@tanstack/react-table";

// Types
import { BillboardColumn } from "@/types/columns";

//Components

// Icons

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
