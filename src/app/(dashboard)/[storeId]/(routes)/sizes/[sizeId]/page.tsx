// Hooks / Packages
import { prisma } from "@/lib/prismadb";

// Types
import { SizeIdProps } from "@/types/props";

// Components
import SizeForm from "./components/SizeForm";

const SizeIdPage = async ({ params }: SizeIdProps) => {
  const size = await prisma.size.findFirst({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm size={size} />
      </section>
    </main>
  );
};

export default SizeIdPage;
