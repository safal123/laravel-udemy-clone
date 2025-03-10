import { Chapter } from '@/types'
import { Button } from '@/Components/ui/button'
import { CheckCircle2Icon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'
import ReactVideoPlayer from './_components/ReactVideoPlayer'
import ChapterLayout from '@/Layouts/ChapterLayout'
import { toast } from 'sonner'
import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import ChapterTabs from '@/Pages/Course/Show/Chapter/_components/ChapterTabs'
import VideoPlayer from '@/Pages/Course/Show/Chapter/_components/Videoplayer'

const CourseChapter = () => {
  const { chapter, nextChapter, previousChapter } = usePage<{
    chapter: Chapter;
    nextChapter: Chapter;
    previousChapter: Chapter
  }>().props

  const markAsCompleted = () => {
    if (chapter.is_completed) return

    router.post(route('progress.store'), {
      chapter_id: chapter.id,
      course_id: chapter.course_id
    }, {
      onSuccess: () => toast.success('Chapter marked as completed'),
      onError: () => toast.error('Failed to mark chapter as completed')
    })
  }

  if (!chapter) {
    return null
  }

  return (
    <div className="text-gray-900 w-full flex flex-col items-center">
      <Head title={`Course Chapter: ${chapter.title}`} />
      <div className="relative rounded-md shadow-lg overflow-hidden mx-auto w-full object-cover aspect-video-16/9">
        <VideoPlayer
          src={chapter.video_url}
          chapter={chapter}
          nextChapterId={chapter.next_chapter_id}
          previousChapterId={chapter.previous_chapter_id}
          isCompleted={chapter.is_completed}
        />
      </div>

      {/* Navigation and Completion Controls */}
      <div className="w-full flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            disabled={!previousChapterpreviousChapter}
            onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${previousChapter?.id}`)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous Chapter
          </Button>

          <Button
            variant="ghost"
            size="sm"
            disabled={!nextChapter}
            onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${nextChapter?.id}`)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Next Chapter
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        <Button
          onClick={markAsCompleted}
          disabled={chapter.is_completed}
          className={cn(
            "transition-all",
            chapter.is_completed ?
              "bg-green-600 hover:bg-green-700" :
              "bg-primary hover:bg-primary/90"
          )}
        >
          <CheckCircle2Icon className="h-5 w-5 mr-2" />
          {chapter.is_completed ? "Completed" : "Mark as Complete"}
        </Button>
      </div>

      <ChapterTabs chapter={chapter} />
    </div>
  )
}

CourseChapter.layout = (page: React.ReactNode) => (
  <ChapterLayout>{page}</ChapterLayout>
)

export default CourseChapter
