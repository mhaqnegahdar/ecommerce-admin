// Hooks / Packages
import { prisma } from "@/lib/prismadb";

// Types
import { BillboardIdProps } from "@/types/props";

// Components
import BillboardForm from "./components/BillboardForm";

const BillboardId = async ({ params }: BillboardIdProps) => {
  const billboard = await prisma.billboard.findFirst({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm billboard={billboard} />
      </section>
    </main>
  );
};

export default BillboardId;
