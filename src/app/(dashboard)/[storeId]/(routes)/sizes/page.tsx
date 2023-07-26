// Hooks / Packages
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";

// Conponents
import SizesClient from "./components/SizesClient";

// Types
import { StoreIdProps } from "@/types/props";
import { SizeColumns } from "@/types/columns";
import { format } from "date-fns";

const CategoriesPage = async ({ params }: StoreIdProps) => {
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

  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // if store did not exist
  if (!store) {
    redirect(`/`);
  }

  const formattedSizes: SizeColumns[] = sizes.map(size => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: format(size.createdAt, "MMMM,do,yyy"),
  }));

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient formattedSizes={formattedSizes} store={store} />
      </section>
    </main>
  );
};

export default CategoriesPage;
