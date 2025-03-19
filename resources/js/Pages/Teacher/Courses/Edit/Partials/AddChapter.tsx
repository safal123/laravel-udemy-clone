import Modal from '@/Components/Modal'
import { AppTooltip } from '@/Components/shared/AppTooltip'
import { Button } from '@/Components/ui/button'
import ChapterForm from '@/Pages/Teacher/Courses/Edit/Partials/ChapterForm'
import { Course } from '@/types'
import { PlusIcon, BookOpen } from 'lucide-react'
import React from 'react'

type AddNewChapterProps = {
  course: Course,
}

const AddChapter = ({ course }: AddNewChapterProps) => {
  const [show, setShow] = React.useState(false)
  return (
    <div>
      <Button
        onClick={() => setShow(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
      >
        <PlusIcon size={16} />
        <span>Add Chapter</span>
      </Button>

      <Modal show={show} onClose={() => setShow(false)} maxWidth="2xl">
        <ChapterForm course={course} setShow={setShow} />
      </Modal>
    </div>
  )
}

export default AddChapter;
