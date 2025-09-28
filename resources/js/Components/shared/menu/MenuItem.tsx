import { Link } from '@inertiajs/react'
import { cn } from "@/lib/utils"
import React from 'react'
import { ChevronRight } from 'lucide-react'

export interface MainMenuItemProps {
  icon?: React.ReactNode;
  link: string;
  text: string;
  description?: string;
  isActive?: boolean;
  className?: string;
}

export default function MainMenuItem({
  icon,
  link,
  text,
  description,
  isActive: propIsActive,
  className
}: MainMenuItemProps) {
  const isActive = propIsActive !== undefined ? propIsActive : route().current(link + '*');

  return (
    <div className={cn("relative", className)}>
      <Link
        href={route(link)}
        className={cn(
          "flex items-start px-3 py-2 rounded-md group transition-all duration-200",
          "outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20",
          isActive
            ? "bg-blue-50/50 dark:bg-blue-900/10"
            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
        )}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-[60%] bg-blue-500 dark:bg-blue-400 rounded-full" />
        )}

        <div className={cn(
          "flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3 rounded-md transition-all duration-200",
          isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-slate-600 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
        )}>
          {icon}
        </div>

        <div className="min-w-0 flex-1 py-0.5">
          <div className={cn(
            "font-medium text-[13px] truncate transition-colors duration-200",
            isActive
              ? "text-blue-900 dark:text-blue-300"
              : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-200"
          )}>
            {text}
          </div>

          {description && (
            <div className={cn(
              "text-[11px] mt-0.5 truncate transition-colors duration-200",
              isActive
                ? "text-blue-600/60 dark:text-blue-300/60"
                : "text-slate-500 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400"
            )}>
              {description}
            </div>
          )}
        </div>

        <div className={cn(
          "ml-3 flex-shrink-0 opacity-0 -translate-x-2 transition-all duration-200 self-center",
          "group-hover:opacity-100 group-hover:translate-x-0",
          isActive && "opacity-100 translate-x-0"
        )}>
          <ChevronRight size={14} className={cn(
            "text-slate-400",
            isActive && "text-blue-500"
          )} />
        </div>
      </Link>
    </div>
  );
}
