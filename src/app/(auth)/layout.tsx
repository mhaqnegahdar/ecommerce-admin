import { ChildrenProps } from "@/types/props";
import React from "react";

const RootLayout = ({ children }: ChildrenProps) => {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      {children}
    </main>
  );
};

export default RootLayout;
