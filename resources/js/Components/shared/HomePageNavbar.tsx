import {Link} from "@inertiajs/react";
import Logo from "@/Components/shared/Logo";
import {PageProps} from "@/types";
import {Button} from "@/Components/ui/button";
import {UserMenu} from "@/Components/shared/tooltip/UserMenu";

type HomePageNavbarProps = {
  auth?: PageProps['auth']
}

const HomePageNavbar = ({auth}: HomePageNavbarProps) => {
  return (
    <nav className="border-b border-gray-800 py-6 bg-gray-900">
      <div className="container flex items-center justify-between">
        <div className={'flex items-center space-x-6'}>
          <Link href={'/'}>
            <Logo/>
          </Link>
          <div className={'hidden md:flex items-center space-x-4'}>
            <Link href={'/courses'} className={'text-white'}>
              Courses
            </Link>
            <Link href={'/categories'} className={'text-white'}>
              Categories
            </Link>
          </div>
        </div>
        <div>
          {auth?.user ?
            <div className={'flex items-center space-x-2'}>
              <UserMenu/>
            </div>
            :
            <div className={'flex items-center space-x-1'}>
              <Link href={'/login'}>
                <Button>
                  Login
                </Button>
              </Link>
              <Link href={'/register'}>
                <Button variant={'outline'}>
                  Register
                </Button>
              </Link>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default HomePageNavbar;
