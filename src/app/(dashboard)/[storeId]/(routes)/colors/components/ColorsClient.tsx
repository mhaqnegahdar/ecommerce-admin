"use client";

// Hooks / Packages
import { useParams, useRouter } from "next/navigation";

// Components
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./Columns";

// Types
import { ColorsClientProps } from "@/types/props";

// Icons
import { Plus } from "lucide-react";
import ApiList from "@/components/ui/ApiList";

const ColorsClient = ({ formattedColors, store }: ColorsClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <section className=" flex  items-center justify-between">
        <Heading
          title={`Colors (${formattedColors.length})`}
          description={`Manage ${store.name} store colors`}
          className="w-full sm:w-auto"
        />
        <Button
          className="hidden sm:flex  "
          onClick={() => {
            router.push(`/${params.storeId}/colors/new`);
          }}
        >
          <Plus className="me-2 w-4 h-4" />
          Add New
        </Button>
        <Button
          variant={`secondary`}
          className=" rounded-full block sm:hidden h-[3.25rem]"
          onClick={() => {
            router.push(`/${params.storeId}/colors/new`);
          }}
        >
          <span className="sr-only">Add New</span>
          <Plus className=" w-4 h-4" />
        </Button>
      </section>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedColors} />
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorsClient;
