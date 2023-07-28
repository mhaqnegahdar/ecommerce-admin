// Hooks / Packages
import { prisma } from "@/lib/prismadb";

// Types
import { ProductIdProps } from "@/types/props";

// Components
import ProductForm from "./components/ProductForm";

const ProductId = async ({ params }: ProductIdProps) => {
  const product = await prisma.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          product={product}
          sizes={sizes}
          colors={colors}
          categories={categories}
        />
      </section>
    </main>
  );
};

export default ProductId;
