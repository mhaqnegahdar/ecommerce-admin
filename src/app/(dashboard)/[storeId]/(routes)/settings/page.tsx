// Hooks / Packages
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";

// Conponents
import SettingsForm from "./components/SettingsForm";

// Types
import { StoreIdProps } from "@/types/props";

const Settings = async ({ params }: StoreIdProps) => {
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

  // if store did not exist
  if (!store) {
    redirect(`/`);
  }

  return (
    <main className=" flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm store={store} />
      </section>
    </main>
  );
};

export default Settings;
