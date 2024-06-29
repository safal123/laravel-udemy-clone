import {Chapter} from "@/types";
import {Trash2} from "lucide-react";
import ChapterForm from "@/Pages/Teacher/Courses/Edit/Partials/ChapterForm";
import Modal from "@/Components/Modal";
import React from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import {useForm} from "@inertiajs/react";

type DeleteChapterProps = {
  chapter: Chapter;
}

const DeleteChapter = ({ chapter }: DeleteChapterProps) => {
  const [show, setShow] = React.useState(false);
  const { errors, delete: destroy, processing, reset } = useForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    destroy(route('teachers.courses.chapters.destroy', [chapter.course_id, chapter.id]), {
      preserveScroll: true,
      onSuccess: () => setShow(false),
      onError: () => setShow(true),
      onFinish: () => reset(),
    })
  }

  return (
    <div>
      <Trash2
        onClick={() => setShow(true)}
        className={'w-4 h-4 cursor-pointer text-red-600'}
      />
      <Modal show={show} onClose={() => setShow(false)}>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Are you sure you want to delete this chapter?
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Once chapter is deleted, all of its resources and data will be permanently deleted. Before
              deleting your chapter, please download any data or information that you wish to retain.
              <br/>
              <span className={'text-red-600'}>
                Note: This action is irreversible.
              </span>
            </p>
          </div>
          <div className="m-6 flex justify-end">
            <SecondaryButton onClick={() => setShow(false)}>Cancel</SecondaryButton>

            <DangerButton className="ms-3" disabled={processing}>
              Delete Chapter
            </DangerButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default DeleteChapter;
