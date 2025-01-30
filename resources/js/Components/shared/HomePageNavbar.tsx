import Logo from '@/Components/shared/Logo'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { Button } from '@/Components/ui/button'
import { PageProps } from '@/types'
import { Link } from '@inertiajs/react'
import { MenuIcon } from 'lucide-react'
import { useState } from "react";

type HomePageNavbarProps = {
  auth?: PageProps['auth'];
};

const HomePageNavbar = ({ auth }: HomePageNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-gray-800 bg-blue-900 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-6">
            <Link href="/">
              <Logo />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/courses"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                href="/courses"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Categories
              </Link>
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {auth?.user ? (
            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button className="text-sm font-medium">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="text-sm font-medium">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HomePageNavbar;
