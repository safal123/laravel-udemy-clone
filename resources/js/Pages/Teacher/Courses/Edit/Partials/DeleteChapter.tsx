import { Button } from '@/Components/ui/button'
import Modal from '@/Components/Modal'
import { Chapter } from '@/types'
import { useForm } from '@inertiajs/react'
import { AlertCircle, Loader, Trash2, X } from 'lucide-react'
import React from 'react'

type DeleteChapterProps = {
  chapter: Chapter;
}

const DeleteChapter = ({ chapter }: DeleteChapterProps) => {
  const [show, setShow] = React.useState(false)
  const { delete: destroy, processing, reset } = useForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    destroy(route('teachers.courses.chapters.destroy', [chapter.course_id, chapter.id]), {
      preserveScroll: true,
      onSuccess: () => setShow(false),
      onError: () => setShow(true),
      onFinish: () => reset()
    })
  }

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="text-red-500 hover:text-red-700 transition-colors"
        title="Delete chapter"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <Modal show={show} onClose={() => setShow(false)} maxWidth="2xl">
        <form onSubmit={handleSubmit} className="overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Delete Chapter</h2>
            </div>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  You're about to delete <span className="font-semibold text-red-600">"{chapter.title}"</span>
                </h3>
                <p className="text-gray-600">
                  This chapter will be permanently removed from your course curriculum, along with all associated content and student progress data.
                </p>
              </div>

              {/* Detailed Impact Information */}
              <div className="bg-gray-50 border rounded-lg p-5">
                <h4 className="text-md font-medium text-gray-800 mb-3">Deletion will remove:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Chapter content:</strong> All text, descriptions, and structured content</span>
                  </li>
                  {chapter.video_storage_id && (
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Video content:</strong> The uploaded video will be permanently deleted from storage</span>
                    </li>
                  )}
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Student data:</strong> All progress tracking, completion status, and analytics</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Course structure:</strong> Chapters will be renumbered automatically</span>
                  </li>
                </ul>
              </div>

              {/* Alternatives */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Alternatives to consider:</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Make the chapter unavailable to students by unpublishing it</li>
                  <li>• Move this chapter to a different section or position in your curriculum</li>
                  <li>• Replace the content while preserving student progress</li>
                </ul>
              </div>

              {/* Warning */}
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800 mb-1">Warning: This action cannot be undone</h3>
                  <p className="text-sm text-red-700">
                    Once deleted, you cannot recover this chapter or any associated data. This action will
                    be logged and may impact student experience if they are currently enrolled.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShow(false)}
              className="px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4"
              disabled={processing}
            >
              {processing && <Loader className="w-4 h-4 animate-spin mr-2" />}
              Delete Chapter
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default DeleteChapter;
