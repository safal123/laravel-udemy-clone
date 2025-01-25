import { UserAvatar } from '@/Components/shared/UserAvatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu'
import { Link, usePage } from '@inertiajs/react'
import * as React from 'react'

export function UserMenu() {
  // @ts-ignore
  const user = usePage().props.auth.user
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={'cursor-pointer'}>
          <UserAvatar src={''} fallback={'SP'}/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-60 mr-20 bg-gray-50 dark:bg-gray-800 text-white border-none">
        <DropdownMenuLabel className={'text-center border-none text-gray-900'}>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={'bg-gray-700'}/>
        <DropdownMenuGroup className={'flex flex-col gap-y-3 p-2'}>
          <DropdownMenuItem asChild={true} className={'dark:bg-gray-800 bg-gray-100 hover:bg-gray-700'}>
            <Link href={'/dashboard'} className={'text-gray-900 cursor-pointer'}>
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild={true} className={'dark:bg-gray-800 bg-gray-100 hover:bg-gray-700'}>
            <Link href={'/profile'} className={'cursor-pointer text-gray-900'}>
              Profile
            </Link>
          </DropdownMenuItem>
          {user.is_teacher && <DropdownMenuItem asChild={true} className={'dark:bg-gray-800 bg-gray-100 hover:bg-gray-700'}>
            <Link href={route('teachers.dashboard')} className={'cursor-pointer text-gray-900'}>
              Teacher Dashboard
            </Link>
          </DropdownMenuItem>}
          <DropdownMenuItem
            className={'cursor-pointer p-0 bg-gray-800'}>
            <Link
              method="post"
              href={route('logout')}
              as="button"
              className={'w-full p-2 text-left'}
            >
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
