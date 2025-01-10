import MainMenuItem from '@/Components/shared/menu/MenuItem'
import { cn } from '@/lib/utils'
import { BookAIcon, Layout, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({className}: MainMenuProps) {
  const [path, setPath] = useState<string>('students')
  useEffect(() => {
    // @ts-ignore
    const currentPath = route()?.current()
    if (!currentPath) {
      return
    }
    if (currentPath.startsWith('teachers')) {
      setPath('teachers')
    } else {
      setPath('students')
    }
  }, [path])
  return (
    <div className={cn(className, 'p-1')}>
      {path === 'students' ?
        <>
          <MainMenuItem
            text="Dashboard"
            link="dashboard"
            icon={<Layout size={20}/>}
          />
          <MainMenuItem
            text="Teacher Dashboard"
            link={`teachers.dashboard`}
            icon={<User size={20}/>}
          />
        </> :
        <>
          <MainMenuItem
            text="Dashboard"
            link="teachers.dashboard"
            icon={<Layout size={20}/>}
          />
          <MainMenuItem
            text="Courses"
            link="teachers.courses.index"
            icon={<BookAIcon size={20}/>}
          />
        </>
      }
    </div>
  );
}
