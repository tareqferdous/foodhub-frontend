import { SidebarMenuItem } from "@/types/route.types";
import { Hamburger, Handbag, LayoutDashboard, Users } from "lucide-react";

export const adminMenu: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: Handbag,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Hamburger,
  },
];
