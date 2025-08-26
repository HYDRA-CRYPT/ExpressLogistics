import { Separator } from "@/components/ui/separator";
import { SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { data } from "@/Admin/stores/api";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const isMobile = useIsMobile();

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 
      border-b transition-[width,height] ease-linear 
      sticky top-0 z-50 bg-gray-100 dark:bg-zinc-900 border-gray-200 dark:border-gray-800"
    >
      <SidebarTrigger className="ml-2" />
      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-13"
      />

      {/* Push everything to the right */}
      <div className="ml-auto flex items-center gap-4 pr-4">
        {/* Theme Toggle on the left */}
        <ThemeToggle />

        {/* Profile Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-1 rounded-full transition-colors"
            >
              <Avatar className="h-8 w-8 rounded-full ring-2 ring-transparent hover:ring-gray-300 transition-all">
                <AvatarImage src={data.user.avatar} alt="User avatar" />
                <AvatarFallback className="rounded-full bg-gray-200 text-gray-600 font-semibold">
                  {data.user.email?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-44 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 p-2"
            side={isMobile ? "right" : "bottom"}
            align="center"
            sideOffset={6}
          >
            <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
              Signed in as
              <div className="font-medium text-gray-900 dark:text-white">
                {data.user.name}
              </div>
            </div>
            <DropdownMenuItem className="flex items-center gap-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer">
              <IconUserCircle className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors cursor-pointer">
              <IconLogout className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
