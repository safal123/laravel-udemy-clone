import Logo from '@/Components/shared/Logo'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { PageProps } from '@/types'
import { Link } from '@inertiajs/react'
import { BookOpen, GraduationCap, Home, Layers, MenuIcon, Search, Settings, User, XIcon } from 'lucide-react'
import { useEffect, useState } from "react";

type HomePageNavbarProps = {
  auth?: PageProps['auth'];
};

const HomePageNavbar = ({ auth }: HomePageNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-slate-700/40 z-50 bg-slate-900/90 backdrop-blur-md shadow-md">
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
          <Link href="/" className="hidden md:block">
            <Logo />
          </Link>
          <Link href="/" className="md:hidden">
            <Logo />
          </Link>
        </div>

        {/* Center Section - Search Bar */}
        <div className="hidden md:flex flex-1 justify-center mx-4">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <Input
              placeholder="Search for courses"
              className="w-full pl-9 bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-400
              focus:ring-orange-500/30 focus:border-orange-500/50 rounded-full text-xs py-1.5 h-8"
            />
          </div>
        </div>

        {/* Right Section - User Menu or Auth Buttons */}
        <div className="flex items-center space-x-4">
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
            {/* Logo and search section */}
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

              {/* Mobile search */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <Input
                  placeholder="Search for courses"
                  className="w-full pl-10 bg-slate-800/70 border-slate-700/70 text-slate-200
                            placeholder-slate-400 rounded-lg text-sm py-2 h-10 focus:border-orange-500"
                />
              </div>
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
  );
};

export default HomePageNavbar;
