// TODO: Refactor this layout to be used for both teacher and student dashboard
import MainMenu from '@/Components/shared/menu/MainMenu'
import FlashedMessages from '@/Components/shared/messages/FlashMessage'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { Toaster } from '@/Components/ui/sonner'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import React, { useEffect, useState } from 'react'
import { Search, Bell, HelpCircle, Home, ChevronRight } from 'lucide-react'
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
  const [scrolled, setScrolled] = useState(false);
  const defaultBreadcrumbs = [{
    label: variant === 'teacher' ? 'Teacher Dashboard' : 'Dashboard',
    href: variant === 'teacher' ? '/teachers/dashboard' : '/dashboard'
  }];
  const activeBreadcrumbs = breadcrumbs.length ? breadcrumbs : defaultBreadcrumbs;

  // Handle scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head title={title || (variant === 'teacher' ? 'Teacher Dashboard' : 'Dashboard')} />
      <SidebarProvider className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Toaster position="top-right" />
        <div className="border-r border-gray-200 dark:border-gray-800 shadow-sm">
          <AppSidebar>
            <div className="flex flex-col items-center justify-center py-6 border-b border-gray-200 dark:border-gray-800">
              <Logo size='7' />
              <h1 className="mt-2 text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent tracking-tight">LearnHub</h1>
            </div>
            <MainMenu />
          </AppSidebar>
        </div>

        <main className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className={`sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${scrolled ? 'shadow-md' : ''} transition-shadow duration-200`}>
            <div className="px-4 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" />

                {/* Breadcrumbs */}
                {variant === 'student' && (
                  <nav className="hidden md:flex items-center text-sm">
                    {activeBreadcrumbs.map((item, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
                        {item.href ? (
                          <a href={item.href} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            {index === 0 && <Home className="h-3.5 w-3.5 inline mr-1" />}
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-gray-900 dark:text-white font-medium">
                            {item.label}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </nav>
                )}
              </div>

              {variant === 'student' && (
                <div className="flex-1 max-w-md mx-4 hidden md:block">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-full py-1.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                      placeholder="Search..."
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                {variant === 'student' && (
                  <>
                    <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                      <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="absolute top-1 right-1.5 h-2 w-2 bg-emerald-500 rounded-full"></span>
                    </button>
                    <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <HelpCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </button>
                    <div className="h-8 border-r border-gray-200 dark:border-gray-700 mx-1"></div>
                  </>
                )}
                <UserMenu />
              </div>
            </div>

            {title && variant === 'student' && (
              <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
              </div>
            )}
          </header>

          <FlashedMessages />

          <div className="flex-1 p-4">
            <div className="mx-auto w-full">
              {variant === 'teacher' && title && (
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h1>
              )}
              {children}
            </div>
          </div>

          {variant === 'student' && (
            <footer className="border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
            </footer>
          )}
        </main>
      </SidebarProvider>
    </>
  );
}
