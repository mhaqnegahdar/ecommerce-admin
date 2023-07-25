// Hooks / Packages
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";

// Conponents
import CategoriesClient from "./components/CategoriesClient";

// Types
import { StoreIdProps } from "@/types/props";
import { CategoryColumns } from "@/types/columns";
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

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // if store did not exist
  if (!store) {
    redirect(`/`);
  }

  const formattedCategories: CategoryColumns[] = categories.map(category => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM,do,yyy"),
  }));

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient
          formattedCategories={formattedCategories}
          store={store}
        />
      </section>
    </main>
  );
};

export default CategoriesPage;
