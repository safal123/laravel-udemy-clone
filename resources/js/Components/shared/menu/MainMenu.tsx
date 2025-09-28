import MainMenuItem from '@/Components/shared/menu/MenuItem'
import { cn } from '@/lib/utils'
import { BookAIcon, Layout, User, GraduationCap } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  const [path, setPath] = useState<string>('students')
  const [currentRoute, setCurrentRoute] = useState<string>('')

  useEffect(() => {
    const currentPath = route()?.current()
    if (!currentPath) return

    setCurrentRoute(currentPath)
    setPath(currentPath.startsWith('teachers') ? 'teachers' : 'students')
  }, [])

  const menuSections = {
    students: {
      title: 'Student Portal',
      icon: <GraduationCap size={16} className="text-blue-500" />,
      items: [
        {
          text: "Dashboard",
          link: "dashboard",
          icon: <Layout size={18} />,
          description: "View your learning summary"
        },
        {
          text: "Profile",
          link: "profile.edit",
          icon: <User size={18} />,
          description: "Manage your account"
        }
      ]
    },
    teachers: {
      title: 'Teacher Portal',
      icon: <BookAIcon size={16} className="text-blue-500" />,
      items: [
        {
          text: "Dashboard",
          link: "teachers.dashboard",
          icon: <Layout size={18} />,
          description: "Overview of your activity"
        },
        {
          text: "Courses",
          link: "teachers.courses.index",
          icon: <BookAIcon size={18} />,
          description: "Manage your content"
        },
        {
          text: "Resources",
          link: "teachers.resources.index",
          icon: <BookAIcon size={18} />,
          description: "Manage your resources"
        }
      ]
    }
  }

  const activeSection = menuSections[path as keyof typeof menuSections]

  return (
    <div className={cn('py-4 space-y-4 transition-all duration-200', className)}>
      <div className="px-4">
        <div className="px-2 mb-4">
          <div className="flex items-center gap-2 mb-2">
            {activeSection.icon}
            <h3 className="text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wide">
              {activeSection.title}
            </h3>
          </div>
          <div className="h-px bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent" />
        </div>

        <div className="space-y-0.5">
          {activeSection.items.map((item) => (
            <MainMenuItem
              key={item.link}
              {...item}
              className="transition-all duration-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
