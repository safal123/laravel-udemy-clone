import { AppTooltip } from '@/Components/shared/AppTooltip'
import { SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { cn } from '@/lib/utils'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import { Chapter } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

export default function ChapterLayout({children}: { children: React.ReactNode }) {
  const {course} = usePage<{ course: { slug: string; chapters: Chapter[] } }>().props
  const {chapter} = usePage<{ chapter: Chapter }>().props
  const url = usePage().url
  const chapterId = url.split('/').pop()

  // Ensure we have the required data
  if (!course || !course.chapters || !chapter) {
    return null
  }
  const scrollToTop = () => {
    const element = document.getElementById('main-content')
    if (element) {
      element.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
  useEffect(() => {
    scrollToTop()
  }, [url])

  return (
    <SidebarProvider className="flex h-screen">
      <Toaster
        toastOptions={{
          duration: 2000,
          classNames: {
            toast: 'bg-gray-800 text-white',
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
          }
        }}
      />
      <AppSidebar
        variant="dark"

      >
        {course.chapters.map((chapterItem, index) => (
          <AppTooltip message={chapterItem.title} key={chapterItem.id}>
            <SidebarMenuItem key={chapterItem.id} className="p-1">
              <Link
                href={`/courses/${course.slug}/chapters/${chapterItem.id}`}>
                <div
                  className={cn(
                    'flex items-center gap-2 hover:bg-gray-200 p-3 rounded-md font-normal text-sm',
                    chapterId === String(chapterItem.id) ? 'bg-gray-100 border border-gray-300' : ''
                  )}
                >
                  <span className={'h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0'}>
                    {index + 1}
                  </span>
                  <span className="text-gray-700 truncate">
                    {chapterItem.title}
                  </span>
                </div>
              </Link>
            </SidebarMenuItem>
          </AppTooltip>
        ))}
      </AppSidebar>
      <main className="flex-1 flex flex-col overflow-auto" id={'main-content'}>
        <SidebarTrigger className="m-2"/>
        <div className="flex-1 p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
