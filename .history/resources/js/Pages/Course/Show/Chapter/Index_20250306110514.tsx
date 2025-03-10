import { Chapter } from '@/types'
import { Button } from '@/Components/ui/button'
import { CheckCircle2Icon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'
import ReactVideoPlayer from './_components/ReactVideoPlayer'
import ChapterLayout from '@/Layouts/ChapterLayout'
import { toast } from 'sonner'
import React from 'react'

interface ChapterPageProps {
  chapter: Chapter & {
    course: { slug: string },
    video_url: string,
    is_completed: boolean,
    course_id: string
  }
  nextChapterId: string
  previousChapterId: string
}

const ChapterPage = ({ chapter, nextChapterId, previousChapterId }: ChapterPageProps) => {
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

  return (
    <div className="flex flex-col h-full">
      {/* Video Player */}
      <div className="relative aspect-video">
        <ReactVideoPlayer
          src={chapter.video_url}
          chapter={chapter}
          nextChapterId={nextChapterId}
          previousChapterId={previousChapterId}
          isCompleted={chapter.is_completed}
        />
      </div>

      {/* Navigation and Completion Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            disabled={!previousChapterId}
            onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${previousChapterId}`)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous Chapter
          </Button>

          <Button
            variant="ghost"
            size="sm"
            disabled={!nextChapterId}
            onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${nextChapterId}`)}
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

      {/* Chapter Content */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">
          {chapter.title}
        </h1>
        <div className="prose prose-sm max-w-none">
          {chapter.description}
        </div>
      </div>
    </div>
  )
}

ChapterPage.layout = (page: React.ReactNode) => (
  <ChapterLayout>{page}</ChapterLayout>
)

export default ChapterPage
