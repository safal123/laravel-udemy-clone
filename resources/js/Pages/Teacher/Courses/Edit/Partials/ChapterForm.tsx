import Editor from '@/Components/shared/Editor'
import FieldGroup from '@/Components/shared/form/FieldGroup'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { cn } from '@/lib/utils'
import { Chapter, Course } from '@/types'
import { useForm } from '@inertiajs/react'
import { Loader, BookOpen, X } from 'lucide-react'
import React from 'react'

type ChapterFormProps = {
  course?: Course
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  chapter?: Chapter
  action?: string
}

const ChapterForm = ({ course, setShow, chapter, action = 'create' }: ChapterFormProps) => {
  const { data, setData, errors, post, put, processing, reset } = useForm({
    'title': chapter?.title || '',
    'description': chapter?.description || '',
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === 'update') {
      put(route('teachers.courses.chapters.update', {
        course: chapter?.course_id,
        chapter: chapter?.id
      }), {
        preserveScroll: true,
        onSuccess: () => {
          reset()
          setShow(false)
        }
      })
    } else {
      post(route('teachers.courses.chapters.store', course?.id), {
        preserveScroll: true,
        onSuccess: () => {
          reset()
          setShow(false)
        }
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className="px-8 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            {action === 'update' ? 'Update Chapter' : 'Add New Chapter'}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setShow(false)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Informational Note */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            {action === 'update' ? 'Update the chapter details.' : 'Add a new chapter to the course.'}{' '}
            You can add video and other resources to the chapter after creating it.
          </p>
        </div>

        {/* Error Summary */}
        {Object.keys(errors).length > 0 &&
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-800 mb-1">Please fix the following errors:</h3>
            <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key}>{error as string}</li>
              ))}
            </ul>
          </div>
        }

        {/* Form Fields */}
        <div className="space-y-5">
          <FieldGroup label="Chapter Title" name="title" error={errors.title}>
            <Input
              type="text"
              name="title"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              placeholder="Enter a descriptive title for this chapter"
              className="w-full"
              autoFocus
            />
          </FieldGroup>

          <FieldGroup label="Chapter Description" name="description" error={errors.description}>
            <Editor
              value={data.description}
              onChange={(value) => setData('description', value)}
            />
            <p className="mt-2 text-xs text-gray-500">
              Describe what students will learn in this chapter. Rich formatting supported.
            </p>
          </FieldGroup>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShow(false)}
          className="px-4"
        >
          Cancel
        </Button>
        <Button
          className={cn('bg-blue-600 hover:bg-blue-700 text-white', processing && 'opacity-70 cursor-wait')}
          type="submit"
          disabled={processing}
        >
          {processing && <Loader className="w-4 h-4 animate-spin mr-2" />}
          {action === 'update' ? 'Update Chapter' : 'Create Chapter'}
        </Button>
      </div>
    </form>
  )
}

export default ChapterForm;
