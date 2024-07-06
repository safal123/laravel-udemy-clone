import Modal from "@/Components/Modal";
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
    <div>
      <Edit className={'w-6 h-6 cursor-pointer text-blue-500'} onClick={() => setShow(true)}/>
      <Modal show={show} onClose={() => setShow(false)}>
        <ChapterForm
          setShow={setShow}
          chapter={chapter}
          action={'update'}
        />
      </Modal>
    </div>
  )
}

export default UpdateChapter;
