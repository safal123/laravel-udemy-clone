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
import React, { useEffect } from 'react'

type ChaptersTableProps = {
  chapters: Chapter[],
}

const ChaptersTable = ({chapters}: ChaptersTableProps) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [localChapters, setLocalChapters] = React.useState(chapters)

  useEffect(() => {
    setLocalChapters(chapters)
  }, [chapters])

  const handleDragEnd = (event: any) => {
    const {active, over} = event
    if (chapters.length < 2 || !active || !over) {
      return
    }
    setIsDragging(true)
    router.visit(route('teachers.courses.chapters.order', {course: chapters[0].course_id}), {
      method: 'put',
      data: {
        active_position: active.id,
        over_position: over.id
      },
      preserveScroll: true,
      // only re-render the chapters table
      preserveState: true
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
      onDragStart={() => setIsDragging(true)}
    >
      {isDragging}
      <Chapters chapters={localChapters}/>
    </DndContext>
  )
}

export default ChaptersTable

const Chapters = ({chapters}: ChaptersTableProps) => {
  if (!chapters.length) {
    return (
      <div className="border border-dotted border-gray-300 p-4 rounded-md">
        <p className="text-gray-500">No chapters yet</p>
      </div>
    )
  }
  return (
    <div className={'space-y-1'}>
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
      className="flex items-center border p-4 rounded-md bg-gray-50 w-full overflow-y-auto"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col md:flex-row md:items-center space-x-2">
            <GripVertical className="cursor-move"/>
            <span className={'text-[0.9rem] font-semibold mt-4 md:mt-0'}>
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
            {!chapter?.video_storage_id &&
              <p className={'text-red-500 bg-red-50 px-4 text-xs rounded-full tracking-wide border border-red-500'}>
                Upload a video to publish or set it as free.
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
