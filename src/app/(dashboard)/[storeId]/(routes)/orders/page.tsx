// Hooks / Packages
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";
import { currancyFormatter } from "@/lib/utils";

// Conponents
import OrdersClient from "./components/OrdersClient";

// Types
import { StoreIdProps } from "@/types/props";
import { OrderColumns } from "@/types/columns";
import { format } from "date-fns";

const Orders = async ({ params }: StoreIdProps) => {
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

  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // if store did not exist
  if (!store) {
    redirect(`/`);
  }

  const formattedOrders: OrderColumns[] = orders.map(order => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems
      .map(orderItem => orderItem.product.name)
      .join(", "),
    totalPrice: currancyFormatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(order.createdAt, "MMMM,do,yyy"),
  }));

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <OrdersClient formattedOrders={formattedOrders} store={store} />
      </section>
    </main>
  );
};

export default Orders;
