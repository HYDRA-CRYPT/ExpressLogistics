import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavDocuments } from "@/components/nav-documents";

import { data } from "./stores/api";
import { SiteHeader } from "@/components/site-header";
const AdminLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar
          variant="sidebar"
          collapsible="offcanvas"
          className="bg-zinc-800 text-zinc-900 dark:text-zinc-100"
        >
          <SidebarHeader className="py-3 bg-zinc-200 dark:bg-zinc-900">
            <h2 className="text-xl font-bold dark:text-zinc-100">
              AegisExpress's Admin
            </h2>
          </SidebarHeader>
          <SidebarSeparator className="mx-1 border border-zinc-300 dark:border-zinc-700" />

          <SidebarContent>
            <NavMain items={data.navMain} />
            <NavDocuments items={data.shipments} />
          </SidebarContent>

          <SidebarFooter>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              © 2025 AegisExpress
            </p>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 w-full h-full">
          <SiteHeader />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
