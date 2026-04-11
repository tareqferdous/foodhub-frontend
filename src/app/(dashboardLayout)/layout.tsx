import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  if (!data?.user) redirect("/login");

  return (
    <div className='min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-rose-50'>
      <DashboardSidebar user={data.user} />
      <div className='lg:ml-64'>
        <DashboardTopbar />
        <main className='mx-auto w-full max-w-screen-2xl'>{children}</main>
      </div>
    </div>
  );
}
