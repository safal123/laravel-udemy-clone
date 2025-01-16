import ChapterTogglePublish from '@/Pages/Teacher/Courses/Edit/Partials/ChapterTogglePublish'
import ChapterVideo from '@/Pages/Teacher/Courses/Edit/Partials/ChapterVideo'
import DeleteChapter from '@/Pages/Teacher/Courses/Edit/Partials/DeleteChapter'
import ToggleChapterFree from '@/Pages/Teacher/Courses/Edit/Partials/ToggleChapterFree'
import UpdateChapter from '@/Pages/Teacher/Courses/Edit/Partials/UpdateChapter'
import { Chapter } from '@/types'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { router } from '@inertiajs/react'
import { GripVertical } from 'lucide-react'
import React from 'react'

type ChaptersTableProps = {
  chapters: Chapter[],
}

const ChaptersTable = ({chapters}: ChaptersTableProps) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [localChapters, setLocalChapters] = React.useState(chapters)

  const handleDragEnd = (event: any) => {
    setIsDragging(true)
    const {active, over} = event
    setIsDragging(true)
    router.visit(route('teachers.courses.chapters.order', {course: chapters[0].course_id}), {
      method: 'put',
      data: {
        active_position: active.id,
        over_position: over.id
      },
      preserveScroll: true,
      onSuccess: () => {
        setIsDragging(false)
      }
    })
    const getChapterIndex = (id: string) => localChapters.findIndex(chapter => chapter.id === id)

    setLocalChapters(localChapters => {
      const oldIndex = getChapterIndex(active.id)
      const newIndex = getChapterIndex(over.id)
      return arrayMove(localChapters, oldIndex, newIndex)
    })
    setIsDragging(false)
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <Chapters chapters={localChapters}/>
    </DndContext>
  )
}

export default ChaptersTable

const Chapters = ({chapters}: ChaptersTableProps) => {
  return (
    <div className={'space-y-1 bg-gray-100 p-4 rounded-md'}>
      <SortableContext
        items={chapters}
        strategy={verticalListSortingStrategy}
      >
        {
          chapters?.map((chapter) => (
            <SingleChapter key={chapter.id} {...chapter}/>
          ))
        }
      </SortableContext>
    </div>
  )
}

const SingleChapter = (chapter: Chapter) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: chapter.id.toString()
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex items-center border p-4 rounded-md bg-gray-50 w-full"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <GripVertical className="cursor-move"/>
            <span className={'text-[0.9rem] font-semibold'}>
            {chapter.title}
          </span>
          </div>
          <div
            className="flex flex-col items-center space-y-2 ml-auto"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-4">
              <UpdateChapter chapter={chapter}/>
              <DeleteChapter chapter={chapter}/>
              <ChapterVideo chapter={chapter}/>
              {chapter?.video_storage_id &&
                <>
                  <ChapterTogglePublish chapter={chapter}/>
                  <ToggleChapterFree chapter={chapter}/>
                </>
              }
            </div>
            <p className={'text-red-500 bg-red-100 px-2 text-xs rounded-full font-bold'}>
              Please upload a video first to publish or make it free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
