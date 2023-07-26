"use client";

import { ColumnDef } from "@tanstack/react-table";

// Types
import { SizeColumns } from "@/types/columns";
import CellAction from "./CellAction";

//Components

// Icons

export const columns: ColumnDef<SizeColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
