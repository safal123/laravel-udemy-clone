import Logo from '@/Components/shared/Logo'
import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { PageProps } from '@/types'
import { Link } from '@inertiajs/react'
import { MenuIcon, XIcon } from 'lucide-react'
import { useState } from "react";

type HomePageNavbarProps = {
  auth?: PageProps['auth'];
};

const HomePageNavbar = ({ auth }: HomePageNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-gray-100 z-50 bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-gray-600 hover:text-gray-700 focus:outline-none border
            border-gray-200 p-2 rounded-md transition duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XIcon size={24} />
            ) : (
              <MenuIcon size={24} />
            )}
          </button>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <Logo />
            </Link>
            <div className="items-center space-x-6">
            {/*  Search Input */}
              <Input
                placeholder="Search for courses"
                className="outline-none ring-0 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
            <div className="flex flex-col space-y-4 p-4">
              <Link href="/">
                <Logo />
              </Link>
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
