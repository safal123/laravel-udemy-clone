import { Button } from '@/Components/ui/button'
import ChapterLayout from '@/Layouts/ChapterLayout'
import { cn } from '@/lib/utils'
import ChapterTabs from '@/Pages/Course/Show/Chapter/_components/ChapterTabs'
import VideoPlayer from '@/Pages/Course/Show/Chapter/_components/Videoplayer'
import { Chapter } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { CheckCircle2Icon, ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const CourseChapter = () => {
  const {chapter} = usePage<{ chapter: Chapter; }>().props

  const toggleCompletion = () => {
    console.log(chapter.is_completed)
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
      <Head title={`Course Chapter: ${chapter.title}`}/>
      <Button
        onClick={toggleCompletion}
        className={cn(
          'transition-all absolute right-0 top-[-50px] z-10',
          chapter.is_completed ?
            'bg-green-600 hover:bg-red-600' :
            'bg-primary hover:bg-green-600'
        )}
      >
        <CheckCircle2Icon className="h-5 w-5 mr-2"/>
        {chapter.is_completed ? 'Completed' : 'Mark as Complete'}
      </Button>
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
      <div className="w-full flex items-center justify-between py-3 border-b overflow-y-auto">
        <div className="flex items-center gap-4 justify-between w-full">
          <Button
            size="sm"
            disabled={!chapter.previous_chapter_id}
            onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${chapter.previous_chapter_id}`)}
          >
            <ChevronLeft className="h-5 w-5 md:mr-2"/>
            <span className={'hidden md:inline'}>
              Previous Chapter
            </span>
          </Button>

          <Button
            size="sm"
            disabled={!chapter.next_chapter_id}
            onClick={() => router.visit(`/courses/${chapter.course.slug}/chapters/${chapter.next_chapter_id}`)}
          >
            <span className={'hidden md:inline'}>
              Next Chapter
            </span>
            <ChevronRight className="h-5 w-5 md:ml-2"/>
          </Button>
        </div>
      </div>
      <ChapterTabs chapter={chapter}/>
    </div>
  )
}

CourseChapter.layout = (page: React.ReactNode) => (
  <ChapterLayout>{page}</ChapterLayout>
)

export default CourseChapter
