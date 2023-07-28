"use client";

// Hooks / Packages

// Components
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./Columns";

// Types
import { OrdersClientProps } from "@/types/props";

const OrdersClient = ({ formattedOrders, store }: OrdersClientProps) => {
  return (
    <>
      <section className=" flex  items-center justify-start">
        <Heading
          title={`Orders (${formattedOrders.length})`}
          description={`Manage ${store.name} store orders`}
          className="w-full sm:w-auto"
        />
      </section>
      <Separator />
      <DataTable searchKey="phone" columns={columns} data={formattedOrders} />
    </>
  );
};

export default OrdersClient;
