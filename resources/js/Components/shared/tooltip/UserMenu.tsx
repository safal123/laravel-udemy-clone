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
import {Button} from "@/Components/ui/button";

export function UserMenu() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={'cursor-pointer'}>
          <UserAvatar src={''} fallback={'SP'}/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-60 mr-20 bg-gray-800 text-white border-none">
        <DropdownMenuLabel className={'text-center border-none'}>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className={'bg-gray-700'}/>
        <DropdownMenuGroup className={'flex flex-col gap-y-3'}>
          <DropdownMenuItem asChild={true} className={'cursor-pointer'}>
            <Link href={'/dashboard'}>
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild={true} className={'bg-gray-800 hover:bg-gray-700'}>
            <Link href={'/profile'} className={'cursor-pointer'}>
              Profile
            </Link>
          </DropdownMenuItem>
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
