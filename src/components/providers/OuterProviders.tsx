// Hooks / Packages
import { ClerkProvider } from "@clerk/nextjs";

// Types
import { ChildrenProps } from "@/types/props";
import StoreProvider from "./StoreProvider";

const OuterProviders = ({ children }: ChildrenProps) => {
  return (
    <ClerkProvider>
      <StoreProvider>{children}</StoreProvider>
    </ClerkProvider>
  );
};

export default OuterProviders;
