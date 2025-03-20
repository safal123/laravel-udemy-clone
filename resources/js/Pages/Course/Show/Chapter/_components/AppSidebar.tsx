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
        <div className="p-2 w-full">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-2 mb-2">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mr-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Active Now</span>
            </div>

            {isPremium ? (
              <div className="flex items-center py-0.5 pl-1.5 pr-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full">
                <ShieldCheck className="h-3 w-3 mr-1 text-white" />
                <span className="text-[10px] uppercase tracking-wider text-white font-semibold">Premium</span>
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Zap className="h-3 w-3 mr-1 text-emerald-500" />
                <span>Upgrade</span>
              </div>
            )}
          </div>

          {/* System Status */}
          <div className="mb-2 px-2">
            <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-gray-500">
              <div className="flex items-center space-x-1">
                <Activity className="h-2.5 w-2.5" />
                <span>System: Normal</span>
              </div>
              <span>v2.4.1</span>
            </div>
          </div>

          {/* User Menu */}
          <div className={cn(
            "rounded-lg shadow-sm overflow-hidden",
            isPremium
              ? "bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-800/30"
              : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          )}>
            <UserMenu />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
