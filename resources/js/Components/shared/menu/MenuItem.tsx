import { Link } from '@inertiajs/react';
import {cn} from "@/lib/utils";
import React from 'react'

interface MainMenuItemProps {
  icon?: React.ReactNode;
  link: string;
  text: string;
}

export default function MainMenuItem({ icon, link, text }: MainMenuItemProps) {
  const isActive = route().current(link + '*')

  const iconClasses = cn({
    'text-gray-900 group-hover:text-gray-700': !isActive
  });

  const textClasses = cn({
    'text-gray-900 group-hover:text-gray-700': !isActive
  });

  return (
    <div className={cn('mb-2', isActive && 'bg-gray-800 rounded-md')}>
      <Link
        href={route(link)}
        className="flex items-center group py-3 space-x-3 px-2"
      >
        <div className={iconClasses}>{icon}</div>
        <div className={textClasses}>{text}</div>
      </Link>
    </div>
  );
}
