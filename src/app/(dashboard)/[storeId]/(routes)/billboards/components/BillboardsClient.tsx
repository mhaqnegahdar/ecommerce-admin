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
import { BillboardsClientProps } from "@/types/props";

// Icons
import { Plus } from "lucide-react";
import ApiList from "@/components/ui/ApiList";

const BillboardsClient = ({
  formattedBillboards,
  store,
}: BillboardsClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <section className=" flex  items-center justify-between">
        <Heading
          title={`Billboards (${formattedBillboards.length})`}
          description={`Manage ${store.name} store billboards`}
          className="w-full sm:w-auto"
        />
        <Button
          className="hidden sm:flex  "
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
          }}
        >
          <Plus className="me-2 w-4 h-4" />
          Add New
        </Button>
        <Button
          variant={`secondary`}
          className=" rounded-full block sm:hidden h-[3.25rem]"
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
          }}
        >
          <span className="sr-only">Add New</span>
          <Plus className=" w-4 h-4" />
        </Button>
      </section>
      <Separator />
      <DataTable
        searchKey="label"
        columns={columns}
        data={formattedBillboards}
      />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillboardsClient;
