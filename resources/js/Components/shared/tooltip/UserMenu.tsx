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
      <DropdownMenuContent className="w-full min-w-56 mr-6 bg-gray-800 text-white border-none">
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
          <DropdownMenuItem asChild={true} className={'cursor-pointer'}>
            <Link href={'/profile'}>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild={true}
            className={'cursor-pointer bg-red-900 hover:bg-red-800'}>
            <Link
              method="post"
              href={route('logout')}
              as="button"
              className={'w-full'}
            >
              <Button className={'w-full'}>
                  Logout
              </Button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
