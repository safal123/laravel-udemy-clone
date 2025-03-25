import { AppTooltip } from '@/Components/shared/AppTooltip'
import { SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { cn } from '@/lib/utils'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import { Chapter } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import Logo from '@/Components/shared/Logo'

export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  const { course } = usePage<{ course: { slug: string; title: string; chapters: Chapter[] } }>().props
  const { chapter } = usePage<{ chapter: Chapter }>().props
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

  // Find current chapter index for navigation
  const currentChapterIndex = course.chapters.findIndex(c => String(c.id) === chapterId)
  const nextChapter = currentChapterIndex < course.chapters.length - 1
    ? course.chapters[currentChapterIndex + 1]
    : null
  const prevChapter = currentChapterIndex > 0
    ? course.chapters[currentChapterIndex - 1]
    : null

  return (
    <SidebarProvider className="flex h-screen">
      <Toaster
        position="top-right"
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

      <AppSidebar variant="dark">
        {/* Course title header */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col space-y-3">
          <Logo />
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to course</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-900 truncate">
            {course.title}
          </h1>
        </div>

        {/* Chapters list */}
        {course.chapters.map((chapterItem, index) => (
          <AppTooltip message={chapterItem.title} key={chapterItem.id}>
            <SidebarMenuItem className="p-1">
              <Link href={`/courses/${course.slug}/chapters/${chapterItem.id}`}>
                <div
                  className={cn(
                    'flex items-center gap-2 hover:bg-gray-100 p-3 rounded-md',
                    chapterId === String(chapterItem.id) ? 'bg-blue-50 border border-blue-200' : ''
                  )}
                >
                  <div className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0',
                    chapterId === String(chapterItem.id) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  )}>
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className={cn(
                      'text-sm font-medium truncate',
                      chapterId === String(chapterItem.id) ? 'text-blue-800' : 'text-gray-700'
                    )}>
                      {chapterItem.title}
                    </p>
                  </div>

                </div>
              </Link>
            </SidebarMenuItem>
          </AppTooltip>
        ))}
      </AppSidebar>

      <main className="flex-1 flex flex-col overflow-auto" id="main-content">
        {/* Header with chapter navigation */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <SidebarTrigger className="p-2 mr-2 rounded-md hover:bg-gray-100">
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H17M1 6H17M1 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </SidebarTrigger>
              <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
              <h1 className="text-lg font-medium text-gray-800 truncate">
                {chapter.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {prevChapter && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href={`/courses/${course.slug}/chapters/${prevChapter.id}`} className="flex items-center">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Link>
                </Button>
              )}

              {nextChapter && (
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Link href={`/courses/${course.slug}/chapters/${nextChapter.id}`} className="flex items-center">
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Chapter progress indicator */}
          <div className="h-0.5 bg-gray-100">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentChapterIndex + 1) / course.chapters.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-2">
          <div className="w-full h-full">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
