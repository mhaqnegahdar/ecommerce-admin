// Hooks / Packages
import Heading from "@/components/ui/Heading";
import { prisma } from "@/lib/prismadb";
import { currancyFormatter } from "@/lib/utils";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Overview from "@/components/ui/Overview";

// Actions
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
import { getGraphRevenue } from "@/actions/getGraphRevenue";

// Types
import { StoreIdProps } from "@/types/props";

// Icons
import { Box, CreditCardIcon, DollarSign } from "lucide-react";

const StoreDashboard = async ({ params }: StoreIdProps) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <main className="flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        {/* Cards */}
        <section className="md:grid gap-4 grid-cols-3 space-y-4 md:space-y-0">
          {/* Reveneue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currancyFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          {/* Sales */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Sales </CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount} </div>
            </CardContent>
          </Card>
          {/* Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Products In Stock{" "}
              </CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
          <Card className="col-span-3 w-full">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-scroll">
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default StoreDashboard;
