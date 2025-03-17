import { AppTooltip } from '@/Components/shared/AppTooltip'
import { Button } from '@/Components/ui/button'
import ChapterLayout from '@/Layouts/ChapterLayout'
import { cn } from '@/lib/utils'
import ChapterTabs from '@/Pages/Course/Show/Chapter/_components/ChapterTabs'
import VideoPlayer from '@/Pages/Course/Show/Chapter/_components/Videoplayer'
import { Chapter } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { CheckCircle2Icon, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

const CourseChapter = () => {
  const { chapter } = usePage<{ chapter: Chapter; }>().props
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile screens
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const toggleCompletion = () => {
    router.put(route('progress.update', chapter.progress[0].id), {
      is_completed: !chapter.is_completed,
      completed_at: chapter.is_completed ? null : new Date().toISOString()
    }, {
      onSuccess: () => {
        toast.success(`Chapter ${chapter.is_completed ? 'marked as incomplete' : 'completed'}`)
        router.reload()
      }
    })
  }

  if (!chapter) {
    return null
  }

  return (
    <div className="text-gray-900 w-full flex flex-col items-center relative">
      <Head title={`Course Chapter: ${chapter.title}`} />

      <div className="w-full relative">
        {/* Chapter Title Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 gap-3">
          <h1 className="text-xl md:text-2xl font-bold flex items-center">
            <span className="mr-2 text-gray-500">Chapter {chapter.order}:</span>
            {chapter.title}
          </h1>

          <Button
            onClick={toggleCompletion}
            className={cn(
              'transition-all px-3 py-1 h-9 rounded-md text-sm font-medium flex items-center',
              chapter.is_completed ?
                'bg-green-600 hover:bg-green-700 text-white' :
                'bg-primary hover:bg-primary/90 text-white'
            )}
          >
            <CheckCircle2Icon className="h-4 w-4 mr-2" />
            {chapter.is_completed ? 'Completed' : 'Mark as Complete'}
          </Button>
        </div>

        {/* Video Player Container with Shadow and Rounded Corners */}
        <div className="relative rounded-lg shadow-lg overflow-hidden mx-auto w-full object-cover aspect-video mb-4">
          <VideoPlayer
            src={chapter.video_url}
            chapter={chapter}
            nextChapterId={chapter.next_chapter_id}
            previousChapterId={chapter.previous_chapter_id}
            isCompleted={chapter.is_completed}
          />
        </div>
      </div>

      {/* Navigation and Completion Controls - Responsive Design */}
      <div className="w-full flex items-center justify-between py-3 border-b border-gray-200 mb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <AppTooltip message={chapter.previous_chapter_id ? 'Previous Chapter' : 'No Previous Chapter'}>
              <Button
                variant="outline"
                size="sm"
                disabled={!chapter.previous_chapter_id}
                onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${chapter.previous_chapter_id}`)}
                className={cn(
                  "border border-gray-200 rounded-md transition-all",
                  !chapter.previous_chapter_id ? "opacity-50" : "hover:bg-gray-100"
                )}
              >
                {isMobile ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : (
                  <div className="flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>Previous</span>
                  </div>
                )}
              </Button>
            </AppTooltip>
          </div>

          <div className="hidden md:block text-center">
            <span className="text-sm text-gray-500">
              Chapter {chapter.position} of {chapter.course.chapters_count}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AppTooltip message={chapter.next_chapter_id ? 'Next Chapter' : 'No Next Chapter'}>
              <Button
                variant="outline"
                size="sm"
                disabled={!chapter.next_chapter_id}
                onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${chapter.next_chapter_id}`)}
                className={cn(
                  "border border-gray-200 rounded-md transition-all",
                  !chapter.next_chapter_id ? "opacity-50" : "hover:bg-gray-100"
                )}
              >
                {isMobile ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <div className="flex items-center">
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                )}
              </Button>
            </AppTooltip>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Container */}
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
        <ChapterTabs chapter={chapter} />
      </div>
    </div>
  )
}

CourseChapter.layout = (page: React.ReactNode) => (
  <ChapterLayout>{page}</ChapterLayout>
)

export default CourseChapter
