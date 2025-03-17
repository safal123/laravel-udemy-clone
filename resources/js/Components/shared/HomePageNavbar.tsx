import Logo from '@/Components/shared/Logo'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { PageProps } from '@/types'
import { Link } from '@inertiajs/react'
import { MenuIcon, Search, XIcon } from 'lucide-react'
import { useState } from "react";

type HomePageNavbarProps = {
  auth?: PageProps['auth'];
};

const HomePageNavbar = ({ auth }: HomePageNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <Link href="/register">
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-xl">
            <div className="flex flex-col space-y-4 p-5">
              <Link href="/" className="flex justify-center pb-4 border-b border-slate-800">
                <Logo />
              </Link>

              {/* Mobile search */}
              <div className="relative w-full mb-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                </div>
                <Input
                  placeholder="Search for courses"
                  className="w-full pl-9 bg-slate-800/50 border-slate-700 text-slate-200
                  placeholder-slate-400 rounded-full text-xs py-1.5 h-8"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 pt-3 border-t border-slate-800">
                <Link
                  href="/courses"
                  className="flex items-center text-sm font-medium text-slate-300 hover:text-white
                  hover:bg-slate-800/50 transition-colors py-2 px-3 rounded-md"
                >
                  Courses
                </Link>
                <Link
                  href="/categories"
                  className="flex items-center text-sm font-medium text-slate-300 hover:text-white
                  hover:bg-slate-800/50 transition-colors py-2 px-3 rounded-md"
                >
                  Categories
                </Link>

                {!auth?.user && (
                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800">
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full text-sm font-medium border-slate-700 text-slate-200
                        hover:bg-slate-800 hover:text-white"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        className="w-full text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500
                        hover:from-orange-600 hover:to-pink-600 text-white border-0"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomePageNavbar;
