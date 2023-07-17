// Hooks / Packages
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismadb";

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
      <nav>This will be a navbar</nav>
      {children}
    </>
  );
};

export default layout;
