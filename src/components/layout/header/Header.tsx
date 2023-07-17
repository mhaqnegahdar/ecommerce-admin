// Hooks / Packages
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";
import { redirect } from "next/navigation";

// Components
import { UserButton } from "@clerk/nextjs";
import NavBar from "./NavBar";
import StoreSwitcher from "./StoreSwitcher";

const Header = async () => {
  const { userId } = auth();

  // user is not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  // Get All user's stores
  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className="border-b ">
      <div className="flex gap-4 h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <NavBar />
        <div className="ms-auto flex gap-4 items-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Header;
