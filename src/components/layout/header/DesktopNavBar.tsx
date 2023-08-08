"use client";

// Hooks / Packages
import * as React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Components
import { ListItem } from "@/components/ui/ListItem";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const DesktopNavBar = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
      description: "Store overview.",
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
      description: "Billboards for diffrent occasions.",
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
      description: "Organize your products in different categories.",
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
      description: "Sizes your store provide.",
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
      description: "Colors your store provide.",
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
      description: "Manage your stores products",
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
      description: "Your store's orders",
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
      description: "Manage your store.",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Deskop Menu */}
        {routes.map(({ href, label, active }) => (
          <NavigationMenuItem key={href} className="hidden lg:block">
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  active
                    ? "text-black dark:text-white"
                    : "text-muted-foreground",
                  navigationMenuTriggerStyle()
                )}
              >
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavBar;
