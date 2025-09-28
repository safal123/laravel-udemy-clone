import Modal from "@/Components/Modal";
import { AppTooltip } from '@/Components/shared/AppTooltip'
import React from "react";
import { Chapter } from "@/types";
import ChapterForm from "@/Pages/Teacher/Courses/Edit/Partials/ChapterForm";
import { Edit } from "lucide-react";
import ChapterTogglePublish from "./ChapterTogglePublish";
import ToggleChapterFree from '@/Pages/Teacher/Courses/Edit/Partials/ToggleChapterFree';

type UpdateChapterProps = {
  chapter: Chapter
}

const UpdateChapter = ({ chapter }: UpdateChapterProps) => {
  const [show, setShow] = React.useState(false);
  return (
    <AppTooltip message={'Edit chapter'}>
      <button
        onClick={() => setShow(true)}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Edit className="w-5 h-5 text-blue-500" />
      </button>
      <Modal
        maxWidth={'2xl'}
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
