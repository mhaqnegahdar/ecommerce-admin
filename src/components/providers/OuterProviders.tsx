// Hooks / Packages
import { ClerkProvider } from "@clerk/nextjs";

// Types
import { ChildrenProps } from "@/types/props";

const OuterProviders = ({ children }: ChildrenProps) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default OuterProviders;
