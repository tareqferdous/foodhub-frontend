import { Hamburger, Handbag, LayoutDashboard, User } from "lucide-react";

import { SidebarMenuItem } from "@/types/route.types";

export const providerMenu: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    href: "/provider/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/provider/orders",
    icon: Handbag,
  },
  {
    label: "Meal Management",
    href: "/provider/menu",
    icon: Hamburger,
  },
  {
    label: "Profile",
    href: "/provider/profile",
    icon: User,
  },
];
