// Hooks / Packages
import "./globals.css";
import type { Metadata } from "next";

// Components
import OuterProviders from "@/components/providers/OuterProviders";
import InnerProviders from "@/components/providers/InnerProviders";

// Types
import { ContainerProps } from "@/types/props";

// Fonts
import { Inter } from "next/font/google";
import { prisma } from "@/lib/prismadb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Admin",
  description: "E-commerce Admin",
};

export default function RootLayout({ children }: ContainerProps) {
  return (
    <OuterProviders>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          {children}

          <InnerProviders />
        </body>
      </html>
    </OuterProviders>
  );
}
