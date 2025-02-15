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
import { GripVertical, Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'

type ChaptersTableProps = {
  chapters: Chapter[];
};

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
      preserveState: true
    })
    const getChapterIndex = (id: string) => localChapters.findIndex((chapter) => chapter.id === id)

    setLocalChapters((localChapters) => {
      const oldIndex = getChapterIndex(active.id)
      const newIndex = getChapterIndex(over.id)
      return arrayMove(localChapters, oldIndex, newIndex)
    })
    setIsDragging(false)
  }

  return (
    <div className={'relative'}>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        onDragStart={() => setIsDragging(true)}

      >
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 rounded-md">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600"/>
          </div>
        )}
        <Chapters chapters={localChapters}/>
      </DndContext>
    </div>
  )
};

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
    <div className="space-y-1">
      <SortableContext items={chapters} strategy={verticalListSortingStrategy}>
        {chapters?.map((chapter) => (
          <SingleChapter key={chapter.id} {...chapter} />
        ))}
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
      style={style}
      className="flex items-center border p-4 rounded-md bg-gray-50 w-full overflow-y-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full space-y-4 sm:space-y-0">
        {/* Drag Handle */}
        <div
          className="flex items-center space-x-2 bg-blue-600 p-2 rounded-lg shadow-sm cursor-move"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="text-white"/>
          <span className="text-[0.9rem] font-semibold text-white">
            {chapter.title}
          </span>
        </div>

        {/* Buttons and Error Message */}
        <div
          className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Buttons Container */}
          <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-lg shadow-sm">
            {chapter?.video_storage_id && (
              <>
                <ChapterTogglePublish chapter={chapter}/>
                <ToggleChapterFree chapter={chapter}/>
              </>
            )}
            <UpdateChapter chapter={chapter}/>
            <DeleteChapter chapter={chapter}/>
            <ChapterVideo chapter={chapter}/>
          </div>

          {/* Error Message */}
          {!chapter?.video_storage_id && (
            <p className="text-red-600 bg-red-50 px-4 py-1 text-xs rounded-full tracking-wide border border-red-200">
              Cannot publish without video.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
