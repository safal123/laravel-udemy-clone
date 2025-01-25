import MainMenu from '@/Components/shared/menu/MainMenu'
import FlashedMessages from '@/Components/shared/messages/FlashMessage'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import { Users2Icon } from 'lucide-react'
import React from 'react'

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function TeacherDashboardLayout({title, children}: MainLayoutProps) {
  return (
    <SidebarProvider className="flex h-screen">
      <AppSidebar>
        <MainMenu/>
      </AppSidebar>
      <main className="flex-1 flex flex-col overflow-auto">
        <div className="flex items-center p-4 justify-between border-b">
          <SidebarTrigger />
          <UserMenu/>
        </div>
        <FlashedMessages/>
        <div className="flex-1 p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
