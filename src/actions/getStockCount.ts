import { prisma } from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  // Get  All Available Products Count
  const stockCount = await prisma.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
