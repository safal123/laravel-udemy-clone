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
import { BookOpen, Clock, GripVertical, Layers, Loader2, LockIcon, Play, PlusCircle, UnlockIcon, Video, VideoOff } from 'lucide-react'
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

  const getTotalDuration = () => {
    // In a real app, this would calculate the true duration
    return localChapters.length * 10 + Math.floor(Math.random() * 20);
  }

  return (
    <div className="relative">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Course Curriculum</h3>
          <p className="text-xs text-gray-500">Organize your course content</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700 flex items-center gap-1">
            <Layers className="w-3 h-3 text-gray-500" />
            <span>{localChapters.length} {localChapters.length === 1 ? 'Chapter' : 'Chapters'}</span>
          </div>
          <div className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700 flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span>~{getTotalDuration()} min</span>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-gray-200 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
            onDragCancel={() => setIsDragging(false)}
            onDragAbort={() => setIsDragging(false)}
          >
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 rounded-md backdrop-blur-sm">
                <div className="flex items-center bg-white p-3 rounded shadow border border-blue-100">
                  <Loader2 className="animate-spin h-4 w-4 text-blue-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">Reordering...</p>
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
      <div className="border border-dashed border-gray-200 p-4 sm:p-6 rounded-md bg-gray-50 text-center">
        <div className="mx-auto w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-gray-800 mb-2">No chapters yet</h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto mb-4">
          Add chapters to your course to start organizing your curriculum.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="grid grid-cols-8 px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100 bg-gray-50">
        <div className="col-span-5">Chapter</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>
      <div className="divide-y divide-gray-100">
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
      className={`grid grid-cols-8 w-full overflow-hidden transition-all ${isDragging
        ? 'shadow-md bg-blue-50'
        : 'hover:bg-gray-50'
        }`}
    >
      {/* Chapter Information */}
      <div className="col-span-5 flex items-center p-2.5">
        {/* Chapter Number */}
        <div className="flex-shrink-0 mr-2.5">
          <div className={`h-7 w-7 flex items-center justify-center rounded-full text-xs ${isDragging ? 'bg-blue-100 text-blue-700' :
            isPremium ? 'bg-indigo-50 text-indigo-700' : 'bg-green-50 text-green-700'}`}>
            {index + 1}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
            <h4 className="text-sm font-medium text-gray-800 mr-1">
              {props.title}
            </h4>
            <div className="flex flex-wrap gap-1">
              {isPremium ? (
                <span className="inline-flex items-center rounded-sm bg-indigo-50 px-1.5 py-0.5 text-[10px] text-indigo-700">
                  <LockIcon className="h-2.5 w-2.5 mr-0.5" />
                  Premium
                </span>
              ) : (
                <span className="inline-flex items-center rounded-sm bg-green-50 px-1.5 py-0.5 text-[10px] text-green-700">
                  <UnlockIcon className="h-2.5 w-2.5 mr-0.5" />
                  Free
                </span>
              )}
              {hasVideo && (
                <span className="inline-flex items-center rounded-sm bg-blue-50 px-1.5 py-0.5 text-[10px] text-blue-700">
                  <Video className="h-2.5 w-2.5 mr-0.5" />
                  Video
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center text-[10px] text-gray-500">
            <div className="flex items-center mr-2 bg-gray-50 px-1.5 py-0.5 rounded-sm border border-gray-100">
              <Play className="w-2.5 h-2.5 mr-0.5 text-gray-600" />
              <span className="font-medium">{getChapterDuration()}</span>
            </div>

            <div
              className="flex cursor-move items-center text-gray-400"
              {...listeners}
              {...attributes}
            >
              <GripVertical className="h-3 w-3" />
              <span className="text-[10px] ml-0.5 hidden xs:inline-block">Drag</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="col-span-3 flex items-center justify-end p-2.5"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-1">
          {props?.video_storage_id && (
            <>
              <ChapterTogglePublish chapter={props} />
              <ToggleChapterFree chapter={props} />
            </>
          )}
          <UpdateChapter chapter={props} />
          <ChapterVideo chapter={props} />
          <DeleteChapter chapter={props} />
        </div>
      </div>
    </div>
  );
};
