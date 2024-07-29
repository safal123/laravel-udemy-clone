import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import ApplicationLogo from "@/Components/ApplicationLogo";
import MainMenu from "@/Components/shared/menu/MainMenu";

export default () => {
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="flex items-center justify-between px-6 py-4 md:flex-shrink-0 md:w-56 md:justify-center">
      <Link className="mt-1" href="/">
        <ApplicationLogo className="text-white fill-current" width="120" height="28" />
      </Link>
      <div className="relative md:hidden">
        <Menu
          color="white"
          size={32}
          onClick={() => setMenuOpened(true)}
          className="cursor-pointer"
        />
        <div className={`${menuOpened ? '' : 'hidden'} absolute right-0 z-20`}>
          <MainMenu className="relative z-20 px-8 py-4 pb-2 mt-2 bg-gray-900 rounded shadow-lg" />
          <div
            onClick={() => {
              setMenuOpened(false);
            }}
            className="fixed inset-0 z-10 bg-black opacity-25"
          />
        </div>
      </div>
    </div>
  );
};
