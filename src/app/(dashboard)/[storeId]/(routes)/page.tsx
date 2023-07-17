// Hooks / Packages
import { prisma } from "@/lib/prismadb";

// Types
import { StoreIdProps } from "@/types/props";

const StoreDashboard = async ({ params }: StoreIdProps) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
};

export default StoreDashboard;
