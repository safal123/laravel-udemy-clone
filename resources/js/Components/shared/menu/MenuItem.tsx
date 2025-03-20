import { Link, usePage } from '@inertiajs/react'
import { cn } from "@/lib/utils";
import React from 'react'

export interface MainMenuItemProps {
  icon?: React.ReactNode;
  link: string;
  text: string;
  description?: string;
}

export default function MainMenuItem({ icon, link, text, description }: MainMenuItemProps) {
  const isActive = route().current(link + '*');

  return (
    <div className="mb-1.5">
      <Link
        href={route(link)}
        className={cn(
          "flex items-start py-2.5 px-3 rounded-md group transition-all duration-200",
          isActive
            ? "bg-emerald-50 dark:bg-emerald-900/20 shadow-sm"
            : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
        )}
      >
        <div className={cn(
          "mr-3 flex-shrink-0 w-5 h-5 flex items-center justify-center",
          isActive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-gray-500 dark:text-gray-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400"
        )}>
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className={cn(
            "font-medium text-sm truncate",
            isActive
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
          )}>
            {text}
          </div>

          {description && (
            <div className={cn(
              "text-xs mt-0.5 truncate",
              isActive
                ? "text-emerald-600/80 dark:text-emerald-400/70"
                : "text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
            )}>
              {description}
            </div>
          )}
        </div>

        {isActive && (
          <div className="ml-2 w-1 self-stretch bg-emerald-500 rounded-full my-1"></div>
        )}
      </Link>
    </div>
  );
}
