// Hooks / Packages
import { prisma } from "@/lib/prismadb";

// Types
import { CategoryIdProps } from "@/types/props";

// Components
import CategoryForm from "./components/CategoryForm";

const CategoryIdPage = async ({ params }: CategoryIdProps) => {
  const category = await prisma.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm category={category} billboards={billboards} />
      </section>
    </main>
  );
};

export default CategoryIdPage;
