import { UserAvatar } from '@/Components/shared/UserAvatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu'
import { Link, usePage } from '@inertiajs/react'
import { LogOut, User, Settings, LayoutDashboard, BookOpen, ShieldCheck } from 'lucide-react'
import { PageProps, User as UserType } from '@/types'


export function UserMenu() {
  const { auth } = usePage<PageProps>().props
  const user = auth.user as UserType

  const getUserInitials = () => {
    if (!user?.name) return 'U'
    return user.name.split(' ')
      .map((part: string) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  const isTeacher = user?.role

  console.log(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative overflow-hidden rounded-full transition-all hover:ring-2 hover:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <UserAvatar
            src={user.image_url || ''}
            fallback={getUserInitials()}
            className="h-9 w-9"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 p-2 animate-in slide-in-from-top-2"
      >
        {/* User Info */}
        <div className="px-3 py-2 mb-2">
          <p className="font-medium text-sm text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2 py-2">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {user.is_teacher && (
          <DropdownMenuItem asChild>
            <Link href={route('teachers.dashboard')} className="flex items-center gap-2 py-2">
              <BookOpen className="h-4 w-4" />
              <span>Teacher Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        {user.is_admin && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center gap-2 py-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2 py-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2 py-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            method="post"
            href={route('logout')}
            className="flex items-center gap-2 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
