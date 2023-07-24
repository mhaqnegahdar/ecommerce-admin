"use client";

import { ColumnDef } from "@tanstack/react-table";

// Types
import { BillboardColumn } from "@/types/columns";
import CellAction from "./CellAction";

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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
