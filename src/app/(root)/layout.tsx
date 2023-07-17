// Hooks / Packages
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismadb";

// Types
import { ContainerProps } from "@/types/props";

const layout = async ({ children }: ContainerProps) => {
  const { userId } = auth();

  //   User is not authenticated
  if (!userId) {
    redirect(`/sign-in`);
  }

  //   Getting store base on id
  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  });

  // redirect to the first store
  if (store) {
    redirect(`/${store.id}`);
  }
  return <main>{children}</main>;
};

export default layout;
