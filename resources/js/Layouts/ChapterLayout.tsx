import { AppTooltip } from '@/Components/shared/AppTooltip'
import { SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'
import { cn } from '@/lib/utils'
import { AppSidebar } from '@/Pages/Course/Show/Chapter/_components/AppSidebar'
import { Chapter } from '@/types'
import { Link, usePage, router } from '@inertiajs/react'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { BookOpen, ChevronLeft, ChevronRight, Menu, CheckCircle2 } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import Logo from '@/Components/shared/Logo'
import { Checkbox } from '@/Components/ui/checkbox'

export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  const { course } = usePage<{ course: { slug: string; title: string; chapters: Chapter[]; user_progress: any[] } }>().props
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

  const toggleChapterCompletion = (chapterId: string, isCompleted: boolean) => {
    router.put(route('progress.update', Number(chapterId)), {
      is_completed: !isCompleted,
      completed_at: isCompleted ? null : new Date().toISOString()
    }, {
      onSuccess: () => {
        router.reload()
      }
    })
  }

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

          {/* Course Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm font-semibold text-blue-600">
                {Math.round((currentChapterIndex + 1) / course.chapters.length * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentChapterIndex + 1) / course.chapters.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Chapter Completion */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="chapter-completion"
              checked={chapter.is_completed}
              onCheckedChange={() => toggleChapterCompletion(chapter.progress[0].id, chapter.is_completed)}
              className="border-gray-300"
            />
            <label
              htmlFor="chapter-completion"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Mark as completed
            </label>
          </div>
        </div>

        {/* Chapters list */}
        {course.chapters.map((chapterItem, index) => (
          <AppTooltip message={chapterItem.title} key={chapterItem.id}>
            <SidebarMenuItem className="p-1">
              <div className="flex items-center">
                <div className="flex-1">
                  <Link href={`/courses/${course.slug}/chapters/${chapterItem.id}`}>
                    <div
                      className={cn(
                        'flex items-center gap-2 hover:bg-gray-100 p-3 rounded-md',
                        chapterId === String(chapterItem.id) ? 'bg-blue-50 border border-blue-200' : ''
                      )}
                    >
                      <div className={cn(
                        'h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0',
                        chapterId === String(chapterItem.id) ? 'bg-blue-600 text-white' :
                          chapterItem.is_completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-700'
                      )}>
                        {chapterItem.is_completed ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                      </div>
                      <div className="min-w-0">
                        <p className={cn(
                          'text-sm font-medium truncate',
                          chapterId === String(chapterItem.id) ? 'text-blue-800' :
                            chapterItem.is_completed ? 'text-green-700' : 'text-gray-700'
                        )}>
                          {chapterItem.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div
                  className="px-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (chapterItem.progress && chapterItem.progress.length > 0) {
                      toggleChapterCompletion(chapterItem?.progress[0].id, chapterItem.is_completed);
                    }
                  }}
                >
                  <Checkbox
                    id={`chapter-${chapterItem.id}-completion`}
                    checked={chapterItem.is_completed}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </SidebarMenuItem>
          </AppTooltip>
        ))}
      </AppSidebar>

      <main className="w-full flex flex-col flex-1" id="main-content">
        {/* Header with chapter navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Menu className="w-5 h-5 text-blue-600" />
            </SidebarTrigger>
          </div>
        </div>

        {/* Chapter progress indicator */}
        <div className="h-0.5 bg-gray-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentChapterIndex + 1) / course.chapters.length) * 100}%` }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-2">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
