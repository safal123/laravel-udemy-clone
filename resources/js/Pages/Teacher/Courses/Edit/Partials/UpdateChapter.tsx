import Modal from "@/Components/Modal";
import { AppTooltip } from '@/Components/shared/AppTooltip'
import React from "react";
import {Chapter} from "@/types";
import ChapterForm from "@/Pages/Teacher/Courses/Edit/Partials/ChapterForm";
import {Edit} from "lucide-react";

type UpdateChapterProps = {
  chapter: Chapter
}

const UpdateChapter = ({chapter}: UpdateChapterProps) => {
  const [show, setShow] = React.useState(false);
  return (
    <AppTooltip message={'Edit chapter'}>
      <Edit className={'w-6 h-6 cursor-pointer text-blue-500'} onClick={() => setShow(true)}/>
      <Modal
        maxWidth={'4xl'}
        show={show}
        onClose={() => setShow(false)}
      >
        <ChapterForm
          setShow={setShow}
          chapter={chapter}
          action={'update'}
        />
      </Modal>
    </AppTooltip>
  )
}

export default UpdateChapter;
