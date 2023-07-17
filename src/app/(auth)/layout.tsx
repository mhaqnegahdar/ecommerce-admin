import { ContainerProps } from "@/types/props";
import React from "react";

const RootLayout = ({ children }: ContainerProps) => {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      {children}
    </main>
  );
};

export default RootLayout;
