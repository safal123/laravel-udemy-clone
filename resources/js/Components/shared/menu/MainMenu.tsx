
import {BookAIcon, Layout, User} from 'lucide-react';
import MainMenuItem from "@/Components/shared/menu/MenuItem";
import {cn} from "@/lib/utils";

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  // @ts-ignore
  const path = route()?.current().startsWith('teachers') ? 'teachers' : 'students';
  return (
    <div className={cn(className, '')}>
      {path === 'students' ? <>
        <MainMenuItem
          text="Dashboard"
          link="dashboard"
          icon={<Layout size={20} />}
        />
        <MainMenuItem
          text="Teacher Dashboard"
          link={`teachers.dashboard`}
          icon={<User size={20} />}
        />
      </>: <>
        <MainMenuItem
          text="Dashboard"
          link="teachers.dashboard"
          icon={<Layout size={20} />}
        />
        <MainMenuItem
          text="Courses"
          link="teachers.courses"
          icon={<BookAIcon size={20} />}
        />
      </>}
    </div>
  );
}
