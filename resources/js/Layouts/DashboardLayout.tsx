import MainMenu from '@/Components/shared/menu/MainMenu'
import FlashedMessages from '@/Components/shared/messages/FlashMessage'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { Toaster } from '@/Components/ui/sonner'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import React, { useEffect, useState } from 'react'
import { Search, Bell, HelpCircle, Home, ChevronRight } from 'lucide-react'
import { Head, Link } from '@inertiajs/react'

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function DashboardLayout({ title, children, breadcrumbs = [] }: MainLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const defaultBreadcrumbs = [{ label: 'Dashboard', href: '/dashboard' }];
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
      <Head title={title || 'Dashboard'} />
      <SidebarProvider className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Toaster position="top-right" />

        <div className="border-r border-gray-200 dark:border-gray-800 shadow-sm">
          <AppSidebar>
            <div className="p-4 mb-2">
              <div className="flex items-center space-x-2 py-2">
                <Link href={'/'} className="flex items-center space-x-2">
                  <svg className="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">LearnHub</h1>
                </Link>
              </div>
            </div>
            <MainMenu />
          </AppSidebar>
        </div>

        <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {/* Top Navigation Bar */}
          <header className={`sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${scrolled ? 'shadow-md' : ''} transition-shadow duration-200`}>
            <div className="px-4 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" />
                {/* Breadcrumbs */}
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
              </div>

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

              <div className="flex items-center space-x-3">
                <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                  <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="absolute top-1 right-1.5 h-2 w-2 bg-emerald-500 rounded-full"></span>
                </button>
                <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <HelpCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
                <div className="h-8 border-r border-gray-200 dark:border-gray-700 mx-1"></div>
                <UserMenu />
              </div>
            </div>

            {title && (
              <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
              </div>
            )}
          </header>

          <FlashedMessages />

          <div className="flex-1 p-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </div>

          <footer className="border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
          </footer>
        </main>
      </SidebarProvider>
    </>
  );
}
