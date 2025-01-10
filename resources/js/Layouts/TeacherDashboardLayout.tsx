import BottomHeader from '@/Components/shared/header/BottomHeader'
import TopHeader from '@/Components/shared/header/TopHeader'
import MainMenu from '@/Components/shared/menu/MainMenu'
import FlashedMessages from '@/Components/shared/messages/FlashMessage'
import { Toaster } from '@/Components/ui/sonner'
import React from 'react'

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function TeacherDashboardLayout({title, children}: MainLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex">
        <TopHeader/>
        <BottomHeader/>
      </div>
      <div className="flex flex-grow overflow-hidden">
        <MainMenu className="flex-shrink-0 hidden w-56 overflow-y-auto md:block"/>
        <div className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-2 bg-gray-50">
          <FlashedMessages />
          <Toaster
            position={'top-right'}
          />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
