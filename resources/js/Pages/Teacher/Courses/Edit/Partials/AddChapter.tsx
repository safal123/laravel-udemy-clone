import Modal from '@/Components/Modal'
import { AppTooltip } from '@/Components/shared/AppTooltip'
import { Button } from '@/Components/ui/button'
import ChapterForm from '@/Pages/Teacher/Courses/Edit/Partials/ChapterForm'
import { Course } from '@/types'
import { PlusIcon } from 'lucide-react'
import React from 'react'

type AddNewChapterProps = {
  course: Course,
}

const AddChapter = ({course}: AddNewChapterProps) => {
  const [show, setShow] = React.useState(false)
  return (
    <div>
      <AppTooltip message={'Add a new chapter'}>
        <Button
          size={'sm'}
          onClick={() => setShow(true)}>
          <PlusIcon size={20}/>
        </Button>
      </AppTooltip>
      <Modal show={show} onClose={() => setShow(false)}>
        <ChapterForm course={course} setShow={setShow}/>
      </Modal>
    </div>
  )
}

export default AddChapter;
