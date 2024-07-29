import {Head} from '@inertiajs/react';
import MainMenu from "@/Components/shared/menu/MainMenu";
import React from "react";
import TopHeader from "@/Components/shared/header/TopHeader";
import BottomHeader from "@/Components/shared/header/BottomHeader";
import {Toaster} from "@/Components/ui/sonner";

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function DashboardLayout({title, children}: MainLayoutProps) {
  return (
    <>
      <Head title={'Dashbaord'}/>
      <div className="flex flex-col">
        <div className="flex flex-col h-screen">
          <div className="md:flex">
            <TopHeader />
            <BottomHeader />
          </div>
          <div className="flex flex-grow overflow-hidden">
            <MainMenu className="flex-shrink-0 hidden w-56 overflow-y-auto md:block"/>
            <div
              className="w-full px-4 py-8 overflow-hidden overflow-y-auto md:p-12 bg-gray-50"
              scroll-region="true"
            >
              {/*<FlashMessages />*/}
              {children}
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
