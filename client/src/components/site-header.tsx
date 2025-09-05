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
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./theme-toggle";
import { useAuthStore } from "@/stores/authStore";

export function SiteHeader() {
  const isMobile = useIsMobile();

  // Zustand state
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // If user is not logged in, optionally show a default avatar or nothing
  const displayName = user?.name || "Admin";
  const displayEmail = user?.email || "admin@example.com";
  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&size=128&background=0D8ABC&color=fff&rounded=true`;

  return (
    <header
      className="flex w-full h-12 sm:h-14 shrink-0 items-center gap-2 sm:gap-4
    border-b transition-[width,height] ease-linear
    sticky top-0 z-50 bg-gray-100/95 dark:bg-zinc-900/95 backdrop-blur-sm 
    border-gray-200 dark:border-gray-800 px-3 sm:px-4"
    >
      <SidebarTrigger className="shrink-0" />
      <Separator orientation="vertical" className="h-6 sm:h-8" />

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-1 rounded-full transition-colors shrink-0"
            >
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-transparent hover:ring-gray-300 transition-all">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt="User avatar" />
                ) : (
                  <AvatarImage src={avatarUrl} alt="User avatar" />
                )}
                <AvatarFallback className="rounded-full bg-gray-200 text-gray-600 font-semibold text-xs sm:text-sm">
                  {displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-40 sm:min-w-44 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 p-2"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={6}
          >
            <div className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
              Signed in as
              <div className="font-medium text-gray-900 dark:text-white truncate">
                {displayEmail}
              </div>
            </div>

            <DropdownMenuItem className="flex items-center gap-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors cursor-pointer text-sm">
              <IconUserCircle className="h-4 w-4 text-gray-600 dark:text-gray-300 shrink-0" />
              <span>Account</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors cursor-pointer text-sm"
              onClick={logout}
            >
              <IconLogout className="h-4 w-4 shrink-0" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
