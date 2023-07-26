// Hooks / Packages
import { prisma } from "@/lib/prismadb";

// Types
import { ColorIdProps } from "@/types/props";

// Components
import ColorForm from "./components/ColorForm";

const ColorIdPage = async ({ params }: ColorIdProps) => {
  const color = await prisma.color.findFirst({
    where: {
      id: params.colorId,
    },
  });

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm color={color} />
      </section>
    </main>
  );
};

export default ColorIdPage;
