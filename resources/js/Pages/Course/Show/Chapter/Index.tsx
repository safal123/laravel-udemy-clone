import { AppTooltip } from '@/Components/shared/AppTooltip'
import { Button } from '@/Components/ui/button'
import ChapterLayout from '@/Layouts/ChapterLayout'
import { cn } from '@/lib/utils'
import ChapterTabs from '@/Pages/Course/Show/Chapter/_components/ChapterTabs'
import VideoPlayer from '@/Pages/Course/Show/Chapter/_components/Videoplayer'
import { Chapter, Course } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { CheckCircle2Icon, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

const CourseChapter = () => {
  const { chapter, course } = usePage<{ chapter: Chapter; course: Course }>().props
  const [isMobile, setIsMobile] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [currentVideoQuality, setCurrentVideoQuality] = useState('Auto')

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoading(false)
    }, 500)

    return () => clearTimeout(timer)
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
    return <div>Chapter not found</div>
  }

  return (
    <div className="text-gray-900 w-full flex flex-col items-center relative bg-gray-100">
      <Head title={`Course Chapter: ${chapter.title}`} />

      <div className="w-full relative bg-gray-50 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 mx-auto px-4">
          <h1 className="text-lg sm:text-xl font-bold">
            <span className="text-gray-500">Chapter {chapter.order}:</span> {chapter.title}
          </h1>

          <Button
            size={'sm'}
            onClick={toggleCompletion}
            className={cn(
              'transition-colors px-3 py-1 rounded-md text-sm font-medium flex items-center',
              chapter.is_completed ? 'bg-emerald-600 text-white' : 'bg-primary text-white'
            )}
          >
            <CheckCircle2Icon className="h-4 w-4 mr-1.5" />
            {chapter.is_completed ? 'Completed' : 'Mark Complete'}
          </Button>
        </div>

        <div className="relative w-full mb-6 mx-auto px-4">
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden w-full aspect-video relative">
            {isVideoLoading && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full border-4 border-gray-600 border-t-gray-300 animate-spin"></div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0 pointer-events-none z-10">
            </div>

            <div className={cn(
              "relative w-full h-full transition-opacity duration-300",
              isVideoLoading ? "opacity-0" : "opacity-100"
            )}>
              <VideoPlayer
                src={chapter?.media[0].path}
                chapter={chapter}
                nextChapterId={chapter.next_chapter_id}
                previousChapterId={chapter.previous_chapter_id}
                isCompleted={chapter.is_completed}
                onQualityChange={(quality) => setCurrentVideoQuality(quality)}
              />
            </div>
          </div>

          <div className="absolute top-2 right-6 z-20 hidden md:flex items-center justify-between text-xs text-white bg-black/60 px-2 py-1 rounded">
            <span>Video quality: {currentVideoQuality}</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-800 text-white">
        <div className="flex items-center justify-between py-4 max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <AppTooltip message={chapter.previous_chapter_id ? 'Previous Chapter' : 'No Previous Chapter'}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!chapter.previous_chapter_id}
                  onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${chapter.previous_chapter_id}`)}
                  className={cn(
                    "border border-gray-700 rounded-md transition-all shadow-sm font-medium text-white bg-gray-700/50 hover:bg-gray-700",
                    !chapter.previous_chapter_id ? "opacity-50" : ""
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
              <span className="text-sm text-gray-300 font-medium px-3 py-1.5 bg-gray-700/70 rounded-full border border-gray-600">
                Chapter {chapter.order} of {course.chapters.length}
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
                    "border border-gray-700 rounded-md transition-all shadow-sm font-medium text-white bg-gray-700/50 hover:bg-gray-700",
                    !chapter.next_chapter_id ? "opacity-50" : ""
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
      </div>

      <div className="w-full mx-auto px-4 py-5">
        <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <ChapterTabs chapter={chapter} />
        </div>
      </div>
    </div>
  )
}

CourseChapter.layout = (page: React.ReactNode) => (
  <ChapterLayout>{page}</ChapterLayout>
)

export default CourseChapter
