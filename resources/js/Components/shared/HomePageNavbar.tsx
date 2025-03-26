import Logo from '@/Components/shared/Logo'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { Button } from '@/Components/ui/button'
import { PageProps } from '@/types'
import { Link, router } from '@inertiajs/react'
import { BookOpen, GraduationCap, Home, Layers, MenuIcon, Search, Settings, User, XIcon } from 'lucide-react'
import React, { useState } from "react";

type HomePageNavbarProps = {
  auth?: PageProps['auth'];
};

const HomePageNavbar = ({ auth }: HomePageNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handler to redirect to courses page with search focus
  const handleSearchRedirect = () => {
    router.visit(route('courses.index', { search: '' }));
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full border-b border-slate-700/40 z-40 bg-slate-900/90 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-slate-300 hover:text-white focus:outline-none
              border border-slate-700 bg-slate-800/50 p-1.5 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XIcon size={20} />
              ) : (
                <MenuIcon size={20} />
              )}
            </button>
            <Logo />
          </div>

          {/* Right Section - User Menu or Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <button
              className="p-2 text-slate-300 hover:text-white focus:outline-none border border-slate-700 bg-slate-800/50 rounded-md transition-colors"
              onClick={handleSearchRedirect}
              aria-label="Search courses"
            >
              <Search size={18} />
            </button>

            {auth?.user ? (
              <div className="flex items-center space-x-4">
                <UserMenu />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="hidden sm:block">
                  <Button
                    className="text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500
                    hover:from-orange-600 hover:to-pink-600 text-white border-0"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Sidebar */}
          <div
            className={`md:hidden fixed top-0 left-0 w-[85%] max-w-sm h-screen bg-slate-900
                 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out
                 border-r border-slate-800/50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{
              boxShadow: '8px 0 25px -15px rgba(0,0,0,0.3)'
            }}
          >
            <div className="flex flex-col h-full">
              {/* Logo and close button */}
              <div className="px-5 py-5 border-b border-slate-800/60">
                <div className="flex justify-between items-center mb-5">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Logo />
                  </Link>
                  <button
                    className="text-slate-300 hover:text-white focus:outline-none transition-colors p-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <XIcon size={24} />
                  </button>
                </div>

                {/* Mobile search button */}
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 text-slate-300 bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSearchRedirect();
                  }}
                >
                  <Search className="h-4 w-4" />
                  <span>Search courses</span>
                </Button>
              </div>

              {/* Main menu items */}
              <div className="flex-1 overflow-y-auto py-4 px-5">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="flex items-center space-x-3 text-slate-200 hover:text-white
                            hover:bg-slate-800/70 rounded-lg py-3 px-4 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium">Home</span>
                  </Link>

                  <Link
                    href="/courses"
                    className="flex items-center space-x-3 text-slate-200 hover:text-white
                            hover:bg-slate-800/70 rounded-lg py-3 px-4 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium">Courses</span>
                  </Link>

                  <Link
                    href="/categories"
                    className="flex items-center space-x-3 text-slate-200 hover:text-white
                            hover:bg-slate-800/70 rounded-lg py-3 px-4 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Layers className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-medium">Categories</span>
                  </Link>

                  {auth?.user && (
                    <>
                      <div className="h-px bg-slate-800/70 my-3" />

                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 text-slate-200 hover:text-white
                                hover:bg-slate-800/70 rounded-lg py-3 px-4 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <GraduationCap className="h-5 w-5 text-slate-400" />
                        <span className="text-sm font-medium">Dashboard</span>
                      </Link>

                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 text-slate-200 hover:text-white
                                hover:bg-slate-800/70 rounded-lg py-3 px-4 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5 text-slate-400" />
                        <span className="text-sm font-medium">Profile</span>
                      </Link>

                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 text-slate-200 hover:text-white
                                hover:bg-slate-800/70 rounded-lg py-3 px-4 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5 text-slate-400" />
                        <span className="text-sm font-medium">Settings</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Auth buttons section */}
              {!auth?.user && (
                <div className="px-5 py-5 border-t border-slate-800/60">
                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/login"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full py-5 text-sm font-medium border-slate-700 text-slate-200
                                hover:bg-slate-800 hover:text-white"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        className="w-full py-5 text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500
                                hover:from-orange-600 hover:to-pink-600 text-white border-0"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HomePageNavbar;
