import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Pages/Course/Show/Chapter/_components/AppSidebar";
import {MenuIcon} from "lucide-react";

export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-gray-900 flex h-screen">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-auto">
        <SidebarTrigger className="bg-gray-100 m-2">
          <MenuIcon size={24} />
        </SidebarTrigger>
        <div className="flex-1 p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
