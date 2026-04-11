import { SidebarMenuItem } from "@/types/route.types";
import { LayoutDashboard, ShoppingBag, User } from "lucide-react";

export const customerMenu: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];
