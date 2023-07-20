"use client";

// Hooks / Packages
import { useParams, useRouter } from "next/navigation";

// Components
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Types

// Icons
import { Plus } from "lucide-react";

const BillboardsClient = () => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for X store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
          }}
        >
          <Plus className="me-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardsClient;
