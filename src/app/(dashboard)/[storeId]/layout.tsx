// Hooks / Packages
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismadb";

// Components
import Header from "@/components/layout/header/Header";

// Types
import { DashboardLayoutProps } from "@/types/props";

const layout = async ({ children, params }: DashboardLayoutProps) => {
  const { userId } = auth();

  //   User is not authenticated
  if (!userId) {
    redirect(`/sign-in`);
  }

  //   Getting store base on id
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  //   Store does not exist
  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default layout;
