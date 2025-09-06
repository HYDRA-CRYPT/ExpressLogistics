import { Outlet, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavDocuments } from "@/components/nav-documents";
import { NavUser } from "@/components/nav-user";

import { data } from "./stores/api";
import { SiteHeader } from "@/components/site-header";
import { useEffect } from "react";

const AdminLayoutContent = () => {
  const { pathname } = useLocation();
  const { setOpenMobile, isMobile } = useSidebar();

  // Get user data from localStorage - using correct keys
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
  const userData = {
    name: adminUser.name || "Admin User",
    email: adminUser.email || "owner@example.com",
    avatar:
      adminUser.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        "Admin User"
      )}&size=128&background=0D8ABC&color=fff&rounded=true`,
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // Close mobile sidebar on route change
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <Sidebar
        variant="sidebar"
        collapsible="offcanvas"
        className="bg-zinc-800 text-zinc-900 dark:text-zinc-100"
      >
        <SidebarHeader className="py-3 bg-zinc-200 dark:bg-zinc-900">
          <h2 className="text-lg sm:text-xl font-bold dark:text-zinc-100">
            AegisExpress's Admin
          </h2>
        </SidebarHeader>
        <SidebarSeparator className="mx-1 border border-zinc-300 dark:border-zinc-700" />

        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavDocuments items={data.shipments} />
        </SidebarContent>

        <SidebarFooter>
          <NavUser user={userData} />
          <p className="text-xs text-zinc-500 dark:text-zinc-400 px-2">
            © 2025 AegisExpress
          </p>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <SiteHeader />
        <main className="flex-1 p-3 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminLayoutContent />
    </SidebarProvider>
  );
};

export default AdminLayout;
