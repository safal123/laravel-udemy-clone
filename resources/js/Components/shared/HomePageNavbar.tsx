import {Link} from "@inertiajs/react";
import {Menu} from "lucide-react";
import {UserAvatar} from "@/Components/shared/UserAvatar";
import Logo from "@/Components/shared/Logo";
import {PageProps} from "@/types";
import {Button} from "@/Components/ui/button";

type HomePageNavbarProps = {
  auth?: PageProps['auth']
}

const HomePageNavbar = ({auth}: HomePageNavbarProps) => {
  return (
    <nav className="px-4 md:px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <Link href={'/'}>
            <Logo/>
          </Link>
        </div>
        <div>
          {
            auth && auth.user
              ?
              <div className={'flex items-center space-x-2'}>
                <Link href={'/dashboard'}>
                  <Button variant={'outline'}>
                    Dashboard
                  </Button>
                </Link>
                <UserAvatar src={''} fallback={'SP'}/>
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
