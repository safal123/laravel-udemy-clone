import DangerButton from '@/Components/DangerButton'
import Modal from '@/Components/Modal'
import SecondaryButton from '@/Components/SecondaryButton'
import { AppTooltip } from '@/Components/shared/AppTooltip'
import { Chapter } from '@/types'
import { useForm } from '@inertiajs/react'
import { CircleX, Trash2 } from 'lucide-react'
import React from 'react'

type DeleteChapterProps = {
  chapter: Chapter;
}

const DeleteChapter = ({chapter}: DeleteChapterProps) => {
  const [show, setShow] = React.useState(false)
  const {delete: destroy, processing, reset} = useForm()

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
      <AppTooltip message={'Delete chapter'}>
        <Trash2
          onClick={() => setShow(true)}
          className={'w-6 h-6 cursor-pointer text-red-600'}
        />
      </AppTooltip>
      <Modal show={show} onClose={() => setShow(false)}>
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Are you sure you want to delete this chapter?
              </h2>
              <CircleX
                onClick={() => setShow(false)}
                className="w-8 h-8 text-gray-600 cursor-pointer"
              />
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Once chapter is deleted, all of its resources and data will be permanently deleted. Before
              deleting your chapter, please download any data or information that you wish to retain.
              <br/>
            </p>
            <p className={'text-red-600 mt-6 bg-red-50 text-lg border border-red-200 p-6 rounded'}>
              This action is irreversible.
            </p>
          </div>
          <div className="m-4 flex justify-end">
            <SecondaryButton onClick={() => setShow(false)}>Cancel</SecondaryButton>

            <DangerButton className="ms-3" disabled={processing}>
              Delete Chapter
            </DangerButton>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default DeleteChapter;
