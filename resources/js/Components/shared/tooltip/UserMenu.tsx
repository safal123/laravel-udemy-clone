import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {UserAvatar} from "@/Components/shared/UserAvatar";
import {Link} from "@inertiajs/react";

export function UserMenu() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={'cursor-pointer'}>
          <UserAvatar src={''} fallback={'SP'}/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-6">
        <DropdownMenuLabel className={'text-center'}>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild={true} className={'cursor-pointer'}>
            <Link href={'/dashboard'}>
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild={true} className={'cursor-pointer'}>
            <Link href={'/profile'}>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={'py-2'}>
            <Link
              method="post"
              href={route('logout')}
              as="button"
              className="block w-full px-6 py-2 text-left focus:outline-none bg-indigo-700 rounded-md hover:bg-indigo-600 text-white"
            >
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
