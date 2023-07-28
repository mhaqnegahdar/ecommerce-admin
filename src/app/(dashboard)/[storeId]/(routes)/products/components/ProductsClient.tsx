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
import { ProductsClientProps } from "@/types/props";

// Icons
import { Plus } from "lucide-react";
import ApiList from "@/components/ui/ApiList";

const ProductsClient = ({ formattedProducts, store }: ProductsClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <section className=" flex  items-center justify-between">
        <Heading
          title={`Products (${formattedProducts.length})`}
          description={`Manage ${store.name} store products`}
          className="w-full sm:w-auto"
        />
        <Button
          className="hidden sm:flex  "
          onClick={() => {
            router.push(`/${params.storeId}/products/new`);
          }}
        >
          <Plus className="me-2 w-4 h-4" />
          Add New
        </Button>
        <Button
          variant={`secondary`}
          className=" rounded-full block sm:hidden h-[3.25rem]"
          onClick={() => {
            router.push(`/${params.storeId}/products/new`);
          }}
        >
          <span className="sr-only">Add New</span>
          <Plus className=" w-4 h-4" />
        </Button>
      </section>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={formattedProducts} />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductsClient;
