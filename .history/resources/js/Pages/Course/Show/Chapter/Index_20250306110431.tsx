import { Chapter } from '@/types'
import { Button } from '@/Components/ui/button'
import { CheckCircle2Icon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'
import ReactVideoPlayer from './_components/ReactVideoPlayer'

interface ChapterPageProps {
  chapter: Chapter & { course: { slug: string } }
  nextChapterId: string
  previousChapterId: string
  isCompleted: boolean
}

const ChapterPage = ({ chapter, nextChapterId, previousChapterId, isCompleted }: ChapterPageProps) => {
  const markAsCompleted = () => {
    if (isCompleted) return

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
          src={chapter.videoUrl}
          chapter={chapter}
          nextChapterId={nextChapterId}
          previousChapterId={previousChapterId}
          isCompleted={isCompleted}
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
          disabled={isCompleted}
          className={cn(
            "transition-all",
            isCompleted ?
              "bg-green-600 hover:bg-green-700" :
              "bg-primary hover:bg-primary/90"
          )}
        >
          <CheckCircle2Icon className="h-5 w-5 mr-2" />
          {isCompleted ? "Completed" : "Mark as Complete"}
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

export default ChapterPage
