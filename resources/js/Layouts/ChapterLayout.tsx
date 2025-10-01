import { AppTooltip } from '@/Components/shared/AppTooltip'
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { cn } from '@/lib/utils'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import { Chapter } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { ChevronLeft, Menu, CheckCircle2Icon } from 'lucide-react'
import Logo from '@/Components/shared/Logo'
import { Progress } from '@/Components/ui/progress'

interface PageProps {
  course: {
    id: string
    slug: string
    title: string
    chapters: Chapter[]
    progress_percentage: number
  }
  chapter: Chapter
  [key: string]: any
}

export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  const { course, chapter } = usePage<PageProps>().props
  const url = usePage().url
  const chapterId = chapter.id

  if (!course || !chapter) {
    return <div>Loading....</div>
  }

  const scrollToTop = () => {
    const element = document.getElementById('main-content')
    element?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToTop()
  }, [url])

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "22rem",
        "--sidebar-width-mobile": "20rem",
      } as any}
      className="flex h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          classNames: {
            toast: 'bg-gray-900 text-white shadow-lg rounded-lg',
            success: 'bg-emerald-600',
            error: 'bg-rose-600',
            warning: 'bg-amber-500',
          }
        }}
      />

      <AppSidebar variant="light">
        <div className="p-6 rounded-lg bg-white border-b border-gray-100 flex flex-col space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/courses/${course.id}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to course</span>
            </Link>
            <Logo className="h-6" />
          </div>
        </div>
        <SidebarMenu className="px-2">
          <SidebarGroup className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Courses
            <span className="text-sm text-gray-500">
              {course.title}
            </span>
          </SidebarGroup>
          <div className="px-2 py-3 flex items-center gap-2">
            <Progress
              value={course.progress_percentage}
              className="w-full [&>div]:bg-emerald-500 bg-gray-100 rounded-full h-2.5"
            />
            <span className="text-sm font-medium text-gray-600 min-w-[40px]">
              {course.progress_percentage}%
            </span>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {course.chapters.map((chapterItem, index) => (
                <AppTooltip message={chapterItem.title} key={chapterItem.id} side="right">
                  <SidebarMenuItem className="p-0 flex-1 flex">
                    <Link href={`/courses/${course.slug}/chapters/${chapterItem.id}`} className="w-full">
                      <div className={cn(
                        'border rounded-lg p-2.5 px-3 flex items-center transition-all duration-200',
                        chapterId === String(chapterItem.id)
                          ? 'bg-slate-50 shadow-sm border-green-500'
                          : 'border-transparent hover:bg-gray-50'
                      )}>
                        <div className="flex items-center flex-1">
                          <span className={cn(
                            'text-sm min-w-[24px] h-6 flex items-center font-medium',
                            chapterId === String(chapterItem.id)
                              ? 'text-slate-700'
                              : 'text-gray-900'
                          )}>
                            {index + 1}.
                            {chapterItem.order}
                          </span>
                          <span className={cn(
                            'text-sm font-medium',
                            chapterId === String(chapterItem.id) ? 'text-slate-900' : 'text-gray-700'
                          )}>
                            {chapterItem.title.slice(0, 30)}
                            {chapterItem.title.length > 30 && '...'}
                          </span>
                        </div>
                        <CheckCircle2Icon
                          className={cn(chapterItem.progress?.[0]?.is_completed ? 'text-emerald-500' : 'text-gray-500')}
                        />
                      </div>
                    </Link>
                  </SidebarMenuItem>
                </AppTooltip>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarMenu>
      </AppSidebar>

      <main className="w-full flex flex-col flex-1 bg-white" id="main-content">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </SidebarTrigger>
            <span className="text-sm text-gray-500 hidden md:inline">
              {course.title}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="w-full mx-auto py-8 px-6">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}
