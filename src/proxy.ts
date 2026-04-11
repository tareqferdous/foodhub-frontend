import { NextRequest, NextResponse } from "next/server";

import { advancedRoles, Roles } from "./constants/roles";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const publicRoutes = ["/", "/login", "/register", "/meals", "/providers"];

  const isPublic =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/meals/") ||
    pathname.startsWith("/providers/");

  const { data } = await userService.getSession();
  const role = data?.user?.role ?? null;

  // Not logged in
  if (!role && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    role === Roles.admin ||
    role === Roles.manager ||
    role === Roles.organizer
  ) {
    if (
      pathname.startsWith("/provider") ||
      pathname.startsWith("/cart") ||
      pathname.startsWith("/checkout") ||
      pathname === "/profile" ||
      pathname.startsWith("/orders")
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (role === Roles.provider) {
    const customerOnlyRoutes = ["/cart", "/checkout"];

    if (
      pathname.startsWith("/admin") ||
      customerOnlyRoutes.includes(pathname) ||
      pathname.startsWith("/orders")
    ) {
      return NextResponse.redirect(new URL("/provider/dashboard", request.url));
    }
  }

  if (role === Roles.customer) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/provider")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (role === Roles.vendor) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/orders")) {
      return NextResponse.redirect(new URL("/provider/dashboard", request.url));
    }
  }

  if (
    pathname === "/dashboard" &&
    role &&
    advancedRoles.includes(role) &&
    role !== Roles.customer
  ) {
    if (role === Roles.provider || role === Roles.vendor) {
      return NextResponse.redirect(new URL("/provider/dashboard", request.url));
    }

    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/checkout",
    "/orders/:path*",
    "/profile",
    "/dashboard",
    "/provider/:path*",
    "/admin/:path*",
  ],
};
