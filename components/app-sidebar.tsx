"use client"

import * as React from "react"
import {
  IconUsers,
  IconUserCheck,
  IconPackage,
  IconShoppingCart,
  IconListDetails,
  IconCategory,
  IconBuildingStore,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "User",
      url: "/dashboard/user",
      icon: IconUsers,
    },
    {
      title: "Customers",
      url: "/dashboard/customer",
      icon: IconUserCheck,
    },
    {
      title: "Product",
      url: "/dashboard/product",
      icon: IconPackage,
    },
    {
      title: "Orders",
      url: "/dashboard/order",
      icon: IconShoppingCart,
    },
    {
      title: "Order Items",
      url: "/dashboard/order-items",
      icon: IconListDetails,
    },
    {
      title: "Category",
      url: "/dashboard/categories",
      icon: IconCategory,
    },
  ],
  navClouds: [],
  navSecondary: [],
  documents: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="bg-[hsl(30.7,97.2%,72.4%)] text-white"
    >
      <SidebarHeader className="flex flex-col gap-2 pb-2 border-b border-white bg-[hsl(30.7,97.2%,72.4%)]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="flex items-center gap-2">
                <IconBuildingStore className="!size-5 text-white" />
                <span className="text-base font-semibold text-white">E Commerce</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-[hsl(31,96%,72%)]">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
