import ChapterLayout from '@/Layouts/ChapterLayout'
import ChapterTabs from '@/Pages/Course/Show/Chapter/_components/ChapterTabs'
import VideoPlayer from '@/Pages/Course/Show/Chapter/_components/Videoplayer'
import { Chapter } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'

const CourseChapter = () => {
  const { chapter, nextChapter, previousChapter } = usePage<{
    chapter: Chapter;
    nextChapter: Chapter;
    previousChapter: Chapter
  }>().props

  if (!chapter) {
    return null
  }

  return (
    <div className="text-gray-50 w-full flex flex-col items-center">
      <Head title={`Course Chapter: ${chapter.title}`} />
      <div className="relative rounded-md shadow-lg overflow-hidden mx-auto w-full object-cover aspect-video-16/9">
        <VideoPlayer
          src={chapter.video_url}
          chapter={chapter}
          nextChapter={nextChapter}
          previousChapter={previousChapter}
        />
      </div>
      <ChapterTabs chapter={chapter}/>
    </div>
  )
}

CourseChapter.layout = (page: React.ReactNode) => (
  <ChapterLayout>{page}</ChapterLayout>
)

export default CourseChapter
