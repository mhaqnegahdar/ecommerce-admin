// Hooks / Packages
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";
import { currancyFormatter } from "@/lib/utils";

// Conponents
import ProductsClient from "./components/ProductsClient";

// Types
import { StoreIdProps } from "@/types/props";
import { ProductColumns } from "@/types/columns";
import { format } from "date-fns";

const Products = async ({ params }: StoreIdProps) => {
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

  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // if store did not exist
  if (!store) {
    redirect(`/`);
  }

  const formattedProducts: ProductColumns[] = products.map(product => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: currancyFormatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: format(product.createdAt, "MMMM,do,yyy"),
  }));

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient formattedProducts={formattedProducts} store={store} />
      </section>
    </main>
  );
};

export default Products;
