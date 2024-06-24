import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link, usePage} from '@inertiajs/react';
import {PropsWithChildren} from 'react';
import HomePageNavbar from "@/Components/shared/HomePageNavbar";

export default function Guest({children}: PropsWithChildren) {
  const auth = usePage().props.auth
  return (
    <>
      <HomePageNavbar />
      <div
        className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
        <div>
          <Link href="/">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500"/>
          </Link>
        </div>

        <div
          className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
}
