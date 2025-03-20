import MainMenuItem from '@/Components/shared/menu/MenuItem'
import { cn } from '@/lib/utils'
import { BookAIcon, Layout, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  const [path, setPath] = useState<string>('students')
  const [currentRoute, setCurrentRoute] = useState<string>('')

  useEffect(() => {
    // @ts-ignore
    const currentPath = route()?.current()
    if (!currentPath) return

    setCurrentRoute(currentPath)
    if (currentPath.startsWith('teachers')) {
      setPath('teachers')
    } else {
      setPath('students')
    }
  }, [])

  return (
    <div className={cn('py-3 space-y-4', className)}>
      {path === 'students' ? (
        <div className="px-4">
          <div className="px-2 mb-2.5">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Navigation
            </h3>
          </div>
          <div className="space-y-0.5">
            <MainMenuItem
              text="Dashboard"
              link="dashboard"
              icon={<Layout size={18} />}
              description="View your learning summary"
            />
            <MainMenuItem
              text="Profile"
              link="profile.edit"
              icon={<User size={18} />}
              description="Manage your account"
            />
          </div>
        </div>
      ) : (
        <div className="px-4">
          <div className="px-2 mb-2.5">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Teacher Portal
            </h3>
          </div>
          <div className="space-y-0.5">
            <MainMenuItem
              text="Dashboard"
              link="teachers.dashboard"
              icon={<Layout size={18} />}
              description="Overview of your activity"
            />
            <MainMenuItem
              text="Courses"
              link="teachers.courses.index"
              icon={<BookAIcon size={18} />}
              description="Manage your content"
            />
          </div>
        </div>
      )}
    </div>
  );
}
