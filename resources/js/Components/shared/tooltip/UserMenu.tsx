import { UserAvatar } from '@/Components/shared/UserAvatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu'
import { Link, usePage } from '@inertiajs/react'
import * as React from 'react'
import { Home, LogOut, Settings, Book, UserCircle } from 'lucide-react'

export function UserMenu() {
  // @ts-ignore
  const user = usePage().props.auth.user

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name.split(' ')
      .map((part: string) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="overflow-hidden rounded-full border-2 border-white ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-300 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-300 shadow-sm hover:shadow">
          <UserAvatar
            src={user?.profile_photo_url || ''}
            fallback={getUserInitials()}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 p-2 shadow-lg border border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
      >
        {/* User info section */}
        <div className="px-4 py-3 -mx-1 -mt-1 mb-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b rounded-t-lg">
          <p className="text-sm font-semibold text-gray-900 flex items-center">
            {user?.name}
            {user?.is_premium && (
              <span className="ml-2 px-1.5 py-0.5 text-[10px] uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded font-bold">PRO</span>
            )}
          </p>
          <p className="text-xs text-gray-600 truncate">{user?.email}</p>
        </div>

        <DropdownMenuGroup className="space-y-0.5 px-1">
          <DropdownMenuItem asChild>
            <Link href={'/dashboard'} className="flex cursor-pointer items-center gap-2.5 text-gray-700 py-2.5 px-3 rounded-md transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900">
              <div className="h-8 w-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-md">
                <Home className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium">Dashboard</span>
                <p className="text-xs text-gray-500 -mt-0.5">View your dashboard</p>
              </div>
            </Link>
          </DropdownMenuItem>

          {user.is_teacher &&
            <DropdownMenuItem asChild>
              <Link href={route('teachers.dashboard')} className="flex cursor-pointer items-center gap-2.5 text-gray-700 py-2.5 px-3 rounded-md transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900">
                <div className="h-8 w-8 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-md">
                  <Book className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium">Teacher Portal</span>
                  <p className="text-xs text-gray-500 -mt-0.5">Manage your courses</p>
                </div>
              </Link>
            </DropdownMenuItem>
          }

          <DropdownMenuItem asChild>
            <Link href={'/profile'} className="flex cursor-pointer items-center gap-2.5 text-gray-700 py-2.5 px-3 rounded-md transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900">
              <div className="h-8 w-8 flex items-center justify-center bg-green-50 text-green-600 rounded-md">
                <UserCircle className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium">Profile</span>
                <p className="text-xs text-gray-500 -mt-0.5">Edit your information</p>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={'/settings'} className="flex cursor-pointer items-center gap-2.5 text-gray-700 py-2.5 px-3 rounded-md transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900">
              <div className="h-8 w-8 flex items-center justify-center bg-orange-50 text-orange-600 rounded-md">
                <Settings className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium">Settings</span>
                <p className="text-xs text-gray-500 -mt-0.5">Configure your account</p>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-gray-200" />

        <div className="px-1">
          <DropdownMenuItem asChild>
            <Link
              method="post"
              href={route('logout')}
              as="button"
              className="flex w-full cursor-pointer items-center gap-2.5 text-gray-700 py-2.5 px-3 rounded-md hover:bg-red-50 hover:text-red-700"
            >
              <div className="h-8 w-8 flex items-center justify-center bg-red-50 text-red-600 rounded-md">
                <LogOut className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium">Sign out</span>
                <p className="text-xs text-gray-500 -mt-0.5">End your session</p>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
