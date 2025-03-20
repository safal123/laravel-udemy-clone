import { Link, usePage } from '@inertiajs/react'
import { cn } from "@/lib/utils";
import React from 'react'

export interface MainMenuItemProps {
  icon?: React.ReactNode;
  link: string;
  text: string;
  description?: string;
  isActive?: boolean;
}

export default function MainMenuItem({ icon, link, text, description, isActive: propIsActive }: MainMenuItemProps) {
  const isActive = propIsActive !== undefined ? propIsActive : route().current(link + '*');

  return (
    <div className="relative mb-1.5">
      <Link
        href={route(link)}
        className={cn(
          "flex items-start p-2.5 rounded-md group transition-colors duration-200 outline-offset-2 focus-visible:outline-emerald-500 focus-visible:outline-2",
          isActive
            ? "bg-emerald-50 dark:bg-emerald-900/20 shadow-sm"
            : "hover:bg-gray-100/60 dark:hover:bg-gray-800/30"
        )}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[70%] bg-emerald-500 dark:bg-emerald-400 rounded-r-full"></div>
        )}

        <div className={cn(
          "flex-shrink-0 w-6 h-6 flex items-center justify-center mr-3",
          isActive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-gray-500 dark:text-gray-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors"
        )}>
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className={cn(
            "font-medium text-sm truncate",
            isActive
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
          )}>
            {text}
          </div>

          {description && (
            <div className={cn(
              "text-xs mt-0.5 truncate opacity-90",
              isActive
                ? "text-emerald-600/70 dark:text-emerald-400/70"
                : "text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
            )}>
              {description}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
