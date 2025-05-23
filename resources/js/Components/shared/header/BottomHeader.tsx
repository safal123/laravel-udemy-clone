import { UserMenu } from '@/Components/shared/tooltip/UserMenu'
import {useState} from 'react';
import {Link, usePage} from '@inertiajs/react';
import { PageProps, User } from '@/types'
import {ChevronDown} from 'lucide-react';

export default () => {
  const {auth} = usePage<PageProps>().props;
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-end w-full p-4 text-sm bg-white md:py-0 md:px-12 d:text-md">
      <div className="relative">
        <div
          className="flex items-center cursor-pointer select-none group ml-auto"
          onClick={() => setMenuOpened(true)}
        >
          <UserMenu />
        </div>
        <div className={menuOpened ? '' : 'hidden'}>
          <div
            className="absolute top-0 right-0 left-auto z-20 py-2 mt-8 text-sm whitespace-nowrap bg-white rounded shadow-xl">
            <Link
              href={route('profile.edit')}
              className="block px-6 py-2 hover:bg-indigo-600 hover:text-white"
              onClick={() => setMenuOpened(false)}
            >
              My Profile
            </Link>
            <Link
              method="post"
              href={route('logout')}
              as="button"
              className="block w-full px-6 py-2 text-left focus:outline-none hover:bg-indigo-600 hover:text-white"
            >
              Logout
            </Link>
          </div>
          <div
            onClick={() => {
              setMenuOpened(false);
            }}
            className="fixed inset-0 z-10 bg-black opacity-25"
          ></div>
        </div>
      </div>
    </div>
  );
};
