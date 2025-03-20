import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Chapter } from "@/types";
import Logo from "@/Components/shared/Logo";
import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/Components/shared/tooltip/UserMenu";
import { ShieldCheck, Activity, Zap } from "lucide-react";

interface MainMenuItemProps {
  variant?: 'dark' | 'light';
  children: React.ReactNode;
}

export function AppSidebar({ children, variant = 'light' }: MainMenuItemProps) {
  // @ts-ignore
  const user = usePage().props?.auth?.user;
  const isPremium = user?.is_premium;

  return (
    <Sidebar variant={'floating'}>
      <SidebarContent className={cn('text-gray-200', variant === 'light' ? '' : '')}>
        <SidebarGroupContent>
          <SidebarMenu>
            {children}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>

      <SidebarFooter
        className={cn(
          'border-t border-gray-200 dark:border-gray-700',
          isPremium
            ? 'bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800'
            : 'bg-white dark:bg-gray-800'
        )}
      >
        <div className="p-2 w-full flex flex-row items-start space-x-2">
        <UserMenu />
          <div className="mt-2 px-2">
            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
