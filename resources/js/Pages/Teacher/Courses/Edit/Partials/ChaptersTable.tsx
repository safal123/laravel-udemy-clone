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

const ChaptersTable = ({ chapters }: ChaptersTableProps) => {
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const [localChapters, setLocalChapters] = React.useState(chapters)

  useEffect(() => {
    setLocalChapters(chapters)
  }, [chapters])

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (chapters.length < 2 || !active || !over || (active.id === over.id)) {
      setIsDragging(false)
      return false
    }
    setIsDragging(true)
    router.visit(route('teachers.courses.chapters.order', { course: chapters[0].course_id }), {
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
    <div className="relative">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Course Curriculum</h3>
        <div className="text-sm text-gray-500">
          {localChapters.length} {localChapters.length === 1 ? 'Chapter' : 'Chapters'}
        </div>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            onDragCancel={() => setIsDragging(false)}
            onDragAbort={() => setIsDragging(false)}
          >
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 rounded-md backdrop-blur-sm transition-all duration-300">
                <div className="flex flex-col items-center">
                  <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Reordering chapters...</p>
                </div>
              </div>
            )}
            <Chapters chapters={localChapters} />
          </DndContext>
        </div>
      </div>
    </div>
  )
};

export default ChaptersTable

const Chapters = ({ chapters }: ChaptersTableProps) => {
  if (!chapters.length) {
    return (
      <div className="border border-dashed border-gray-300 p-8 rounded-lg bg-gray-50 text-center">
        <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No chapters yet</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-4">
          Add chapters to your course to start organizing your curriculum. Chapters can be reordered by dragging them.
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Your First Chapter
        </button>
      </div>
    )
  }
  return (
    <div className="min-w-[800px] bg-white">
      <div className="hidden md:grid md:grid-cols-10 md:gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
        <div className="col-span-7">Chapter</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>
      <div className="space-y-3 p-3">
        <SortableContext items={chapters} strategy={verticalListSortingStrategy}>
          {chapters?.map((chapter, index) => (
            <SingleChapter key={chapter.id} {...chapter} index={index} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

const SingleChapter = (props: Chapter & { index: number }) => {
  const { index } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: props.id.toString()
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  // Calculate estimated duration from chapters
  const getChapterDuration = () => {
    // This is a placeholder - in reality, you'd calculate from video length
    return `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
  }

  const isPremium = !props.is_free;
  const hasVideo = !!props.video_storage_id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-1 md:grid-cols-10 md:gap-4 border rounded-md w-full overflow-hidden transition-all ${isDragging ? 'shadow-lg' : 'shadow-sm'} ${isDragging ? 'opacity-75 bg-blue-50' : 'bg-white'}`}
    >
      {/* Chapter Information */}
      <div className="md:col-span-7 flex items-center p-4">
        {/* Chapter Number */}
        <div className="flex-shrink-0 mr-4">
          <div className={`h-12 w-12 flex items-center justify-center rounded-full ${isDragging ? 'bg-blue-100' : 'bg-gray-50'} ${isDragging ? 'text-blue-600' : 'text-gray-700'} border ${isDragging ? 'border-blue-200' : 'border-gray-200'}`}>
            <span className="text-lg font-bold">{index + 1}</span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center mb-2">
            <h4 className="text-base font-semibold text-gray-900 mr-2">
              {props.title}
            </h4>
            <div className="flex space-x-2">
              {isPremium && (
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                  Premium
                </span>
              )}
              {!hasVideo && (
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  Missing Video
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{getChapterDuration()}</span>

            <div
              className="ml-3 flex cursor-move items-center text-gray-400 hover:text-gray-600"
              {...listeners}
              {...attributes}
            >
              <GripVertical className="h-4 w-4" />
              <span className="text-xs ml-1">Drag to reorder</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="md:col-span-3 flex items-center justify-end p-4"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="inline-flex items-center gap-2">
          {props?.video_storage_id && (
            <>
              <div className="px-1">
                <ChapterTogglePublish chapter={props} />
              </div>
              <div className="px-1">
                <ToggleChapterFree chapter={props} />
              </div>
            </>
          )}
          <div className="px-1">
            <UpdateChapter chapter={props} />
          </div>
          <div className="px-1">
            <ChapterVideo chapter={props} />
          </div>
          <div className="px-1">
            <DeleteChapter chapter={props} />
          </div>
        </div>
      </div>
    </div>
  );
};
