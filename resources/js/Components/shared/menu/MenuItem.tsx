import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import {cn} from "@/lib/utils";

interface MainMenuItemProps {
  icon?: React.ReactNode;
  link: string;
  text: string;
}

export default function MainMenuItem({ icon, link, text }: MainMenuItemProps) {
  const isActive = route().current(link + '*');

  const iconClasses = classNames({
    'text-white': isActive,
    'text-indigo-400 group-hover:text-white': !isActive
  });

  const textClasses = classNames({
    'text-white': isActive,
    'text-indigo-200 group-hover:text-white': !isActive
  });

  return (
    <div className={cn('mb-2', isActive && 'bg-black')}>
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
