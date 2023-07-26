// Hooks / Packages
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";

// Conponents
import SizesClient from "./components/ColorsClient";

// Types
import { StoreIdProps } from "@/types/props";
import { ColorColumns } from "@/types/columns";
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

  const colors = await prisma.color.findMany({
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

  const formattedColors: ColorColumns[] = colors.map(color => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM,do,yyy"),
  }));

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient formattedColors={formattedColors} store={store} />
      </section>
    </main>
  );
};

export default CategoriesPage;
