import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data } = await userService.getSession();
  if (!data?.user) redirect("/login");

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
      <DashboardSidebar user={data.user} />
      <div className='lg:ml-64'>{children}</div>
    </div>
  )
}
