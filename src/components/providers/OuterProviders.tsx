// Hooks / Packages
import { ClerkProvider } from "@clerk/nextjs";

// Types
import { ContainerProps } from "@/types/props";
import StoreProvider from "./StoreProvider";

const OuterProviders = ({ children }: ContainerProps) => {
  return (
    <ClerkProvider>
      <StoreProvider>{children}</StoreProvider>
    </ClerkProvider>
  );
};

export default OuterProviders;
