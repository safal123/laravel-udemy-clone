// TODO: Refactor this layout to be used for both teacher and student dashboard
import MainMenu from '@/Components/shared/menu/MainMenu'
import FlashedMessages from '@/Components/shared/messages/FlashMessage'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { Toaster } from '@/Components/ui/sonner'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import React from 'react'
import { Home, ChevronRight, Search, Bell } from 'lucide-react'
import { Head, Link } from '@inertiajs/react'
import Logo from '@/Components/shared/Logo';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface DashboardLayoutProps {
  title?: string;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  variant?: 'student' | 'teacher';
}

export default function DashboardLayout({
  title,
  children,
  breadcrumbs = [],
  variant = 'student'
}: DashboardLayoutProps) {
  const defaultBreadcrumbs = [{
    label: variant === 'teacher' ? 'Teacher Dashboard' : 'Dashboard',
    href: variant === 'teacher' ? '/teachers/dashboard' : '/dashboard'
  }];
  const activeBreadcrumbs = breadcrumbs.length ? breadcrumbs : defaultBreadcrumbs;

  return (
    <>
      <Head title={title || (variant === 'teacher' ? 'Teacher Dashboard' : 'Dashboard')} />
      <div className="h-screen flex overflow-hidden">
        <SidebarProvider className="flex flex-1 h-full">
          <Toaster position="top-right" />

          {/* Sidebar */}
          <div className="border-r border-gray-200 dark:border-gray-800 shadow-sm">
            <AppSidebar>
              <div className="flex flex-col items-center justify-center py-6 border-b border-gray-200 dark:border-gray-800">
                <Logo size='7' />
                <h1 className="mt-2 text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent tracking-tight">LearnHub</h1>
              </div>
              <MainMenu />
            </AppSidebar>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Simplified Top Navigation Bar */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
              <div className="px-4 h-14 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <SidebarTrigger className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" />
                </div>
              </div>

              {/* Page title for mobile */}
              {title && (
                <div className="px-4 py-2 md:hidden bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
                </div>
              )}
            </header>

            <FlashedMessages />

            <div className="flex-1 p-4 sm:p-6">
              <div className="mx-auto w-full max-w-7xl">
                {/* Page title for desktop */}
                {title && variant === 'student' && (
                  <div className="hidden md:block mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
                  </div>
                )}

                {children}
              </div>
            </div>

            {variant === 'student' && (
              <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
              </footer>
            )}
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
