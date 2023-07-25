"use client";

import { ColumnDef } from "@tanstack/react-table";

// Types
import { CategoryColumns } from "@/types/columns";
import CellAction from "./CellAction";

//Components

// Icons

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboards",
    cell: ({ row }) => row.original.billboardLabel,
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
