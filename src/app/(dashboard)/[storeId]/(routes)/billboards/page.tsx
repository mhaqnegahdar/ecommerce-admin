// Hooks / Packages
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";

// Conponents
import BillboardsClient from "./components/BillboardsClient";

// Types
import { StoreIdProps } from "@/types/props";
import { BillboardColumn } from "@/types/columns";
import { format } from "date-fns";

const Billboards = async ({ params }: StoreIdProps) => {
  const { userId } = auth();

  // unauthenticated user
  if (!userId) {
    redirect(`/`);
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // if store did not exist
  if (!store) {
    redirect(`/`);
  }

  const formattedBillboards: BillboardColumn[] = billboards.map(billboard => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MMMM,do,yyy"),
  }));

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <BillboardsClient
          formattedBillboards={formattedBillboards}
          store={store}
        />
      </section>
    </main>
  );
};

export default Billboards;
