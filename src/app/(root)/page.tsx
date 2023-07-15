// Hooks / Packages
import Image from "next/image";

// Components
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <div className="p-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </main>
  );
}
