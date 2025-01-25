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
import {UserMenu} from "@/Components/shared/tooltip/UserMenu";

interface MainMenuItemProps {
  variant?: 'dark' | 'light';
  children: React.ReactNode;
}


export function AppSidebar({ children, variant = 'light' }: MainMenuItemProps) {
  return (
    <Sidebar>
      <SidebarHeader className={cn( variant === 'light' ? '' : 'bg-gray-900')}>
        <Link href="/">
          <div className="flex items-center justify-center p-4 rounded-md">
            <Logo />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className={cn('text-gray-200', variant === 'light' ? '' : 'bg-gray-900')}>
        <SidebarGroupContent>
          <SidebarMenu>
            {children}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>

      <SidebarFooter className={cn(variant === 'light' ? '' : 'bg-gray-900')}>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
