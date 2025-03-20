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
import { Home, LogOut, Settings, Book, UserCircle, Star, ShieldCheck, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CourseReview {
  id: number;
  title: string;
  thumbnail?: string;
}

export function UserMenu() {
  // @ts-ignore
  const user = usePage().props.auth.user
  // @ts-ignore
  const pendingReviews: CourseReview[] = usePage().props.pendingReviews || []
  const isPremium = user?.is_premium;

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
        <button className={cn(
          "overflow-hidden rounded-full transition-all duration-200 outline-none shadow-sm hover:shadow focus:ring-2",
          isPremium
            ? "border-2 border-amber-200 ring-1 ring-amber-300 hover:ring-2 hover:ring-amber-400 focus:ring-amber-400"
            : "border-2 border-white ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-300 focus:ring-blue-300"
        )}>
          <UserAvatar
            src={user?.profile_photo_url || ''}
            fallback={getUserInitials()}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[280px] p-2 shadow-lg border border-gray-200 rounded-xl bg-white/95 backdrop-blur-sm animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
      >
        {/* User info section */}
        <div className={cn(
          "px-4 py-3 -mx-1 -mt-1 mb-2 border-b rounded-t-lg",
          isPremium
            ? "bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50"
            : "bg-gradient-to-r from-blue-50 to-indigo-50"
        )}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900 flex items-center">
              {user?.name}
              {isPremium && (
                <span className="ml-2 px-1.5 py-0.5 text-[10px] uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded font-bold flex items-center">
                  <ShieldCheck className="h-2.5 w-2.5 mr-0.5" />
                  PRO
                </span>
              )}
            </p>
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <div className="h-1 w-1 rounded-full bg-white animate-pulse"></div>
            </div>
          </div>
          <p className="text-xs text-gray-600 truncate">{user?.email}</p>
          <div className="flex justify-between items-center mt-2">
            <div className="text-[10px] text-gray-500">
              {isPremium ? "Premium Account" : "Free Account"}
            </div>
            <Link
              href="/profile"
              className={cn(
                "text-xs font-medium hover:underline transition-colors",
                isPremium ? "text-amber-600 hover:text-amber-700" : "text-blue-600 hover:text-blue-700"
              )}
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Pending reviews section */}
        {pendingReviews.length > 0 && (
          <>
            <div className="px-3 py-2 mb-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Waiting for your review
              </h4>
              <div className="space-y-2">
                {pendingReviews.slice(0, 2).map((course: any) => (
                  <Link
                    key={course.id}
                    href={route('courses.review', course.id)}
                    className="flex items-center p-2 rounded-md bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-colors"
                  >
                    <div className="h-8 w-8 bg-white rounded-md overflow-hidden shrink-0 mr-2 border border-amber-200">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-amber-100">
                          <Book className="h-4 w-4 text-amber-600" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-900 truncate">{course.title}</p>
                      <div className="flex items-center mt-0.5">
                        <Star className="h-3 w-3 text-amber-500" />
                        <Star className="h-3 w-3 text-amber-500" />
                        <Star className="h-3 w-3 text-amber-500" />
                        <Star className="h-3 w-3 text-amber-500" />
                        <Star className="h-3 w-3 text-amber-500" />
                      </div>
                    </div>
                  </Link>
                ))}
                {pendingReviews.length > 2 && (
                  <Link
                    href={route('user.reviews')}
                    className="block text-xs text-center font-medium text-amber-600 hover:text-amber-700 py-1"
                  >
                    + {pendingReviews.length - 2} more courses to review
                  </Link>
                )}
              </div>
            </div>
            <DropdownMenuSeparator className="my-1 bg-gray-200" />
          </>
        )}

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

        {!isPremium && (
          <>
            <DropdownMenuSeparator className="my-2 bg-gray-200" />
            <div className="px-3 py-2">
              <Link href="/pricing" className="flex items-center justify-between bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg p-3 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm hover:shadow">
                <div>
                  <p className="font-semibold">Upgrade to Premium</p>
                  <p className="text-xs text-emerald-100">Unlock all features and courses</p>
                </div>
                <Zap className="h-5 w-5 text-emerald-100" />
              </Link>
            </div>
          </>
        )}

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
