import MainMenuItem from '@/Components/shared/menu/MenuItem'
import { cn } from '@/lib/utils'
import { BookAIcon, Layout, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
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
    <div className={cn(className, 'py-2')}>
      {path === 'students' ? (
        <>
          <div className="px-4 mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Navigation
            </div>
            <MainMenuItem
              text="Dashboard"
              link="dashboard"
              icon={<Layout size={18} />}
              description="Overview of your learning journey"
            />
            <MainMenuItem
              text="Profile"
              link="profile.edit"
              icon={<User size={18} />}
              description="Manage your account"
            />
          </div>

          {/* Professional upgrade prompt */}
          <div className="px-4 mt-auto">
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 dark:from-indigo-900/20 dark:to-blue-900/20 dark:border-indigo-800/30">
              <h3 className="font-medium text-sm text-indigo-800 dark:text-indigo-300 mb-1">Upgrade your learning</h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-2">Get access to premium courses and mentorship.</p>
              <a href="#" className="text-xs font-medium bg-indigo-600 text-white py-1 px-2 rounded inline-block hover:bg-indigo-700 transition-colors">
                Explore Premium
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="px-4 mb-6">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Teacher Portal
            </div>
            <MainMenuItem
              text="Dashboard"
              link="teachers.dashboard"
              icon={<Layout size={18} />}
              description="Instructor overview"
            />
            <MainMenuItem
              text="Courses"
              link="teachers.courses.index"
              icon={<BookAIcon size={18} />}
              description="Manage your content"
            />
          </div>

          {/* Course creation prompt */}
          <div className="px-4 mt-auto">
            <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 dark:from-emerald-900/20 dark:to-teal-900/20 dark:border-emerald-800/30">
              <h3 className="font-medium text-sm text-emerald-800 dark:text-emerald-300 mb-1">Create a new course</h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-2">Share your knowledge and earn income.</p>
              <a href={route('teachers.courses.create')} className="text-xs font-medium bg-emerald-600 text-white py-1 px-2 rounded inline-block hover:bg-emerald-700 transition-colors">
                Get Started
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
