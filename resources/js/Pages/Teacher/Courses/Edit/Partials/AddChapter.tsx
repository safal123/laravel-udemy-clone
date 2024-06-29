import {Button} from "@/Components/ui/button";
import Modal from "@/Components/Modal";
import React from "react";
import {Course} from "@/types";
import ChapterForm from "@/Pages/Teacher/Courses/Edit/Partials/ChapterForm";

type AddNewChapterProps = {
  course: Course,
}

const AddChapter = ({course}: AddNewChapterProps) => {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <Button
        className="btn-indigo"
        onClick={() => setShow(true)}
      >
        {'Add New Chapter'}
      </Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <ChapterForm course={course} setShow={setShow}/>
      </Modal>
    </div>
  )
}

export default AddChapter;
