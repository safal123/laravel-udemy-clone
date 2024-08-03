import React from "react";
import UpdateChapter from "@/Pages/Teacher/Courses/Edit/Partials/UpdateChapter";
import {Chapter} from "@/types";
import DeleteChapter from "@/Pages/Teacher/Courses/Edit/Partials/DeleteChapter";
import ChapterVideo from "@/Pages/Teacher/Courses/Edit/Partials/ChapterVideo";
import ChapterTogglePublish from "@/Pages/Teacher/Courses/Edit/Partials/ChapterTogglePublish";
import ToggleChapterFree from "@/Pages/Teacher/Courses/Edit/Partials/ToggleChapterFree";

type ChaptersTableProps = {
  chapters: Chapter
}

const ChaptersTable = ({chapters}: ChaptersTableProps) => {
  return (
    <div>
      <div className={'ml-auto flex items-center'}>
        I am ChaptersTable
      </div>
      {/*{chapters.map((chapter) => (*/}
      {/*  <div key={chapter.id} className={'flex items-center space-x-4 mb-4'}>*/}
      {/*    {chapter.title}*/}
      {/*    <div className={'ml-auto flex items-center'}>*/}
      {/*      <UpdateChapter chapter={chapter}/>*/}
      {/*      <DeleteChapter chapter={chapter}/>*/}
      {/*      <ChapterVideo chapter={chapter}/>*/}
      {/*      <ChapterTogglePublish chapter={chapter}/>*/}
      {/*      <ToggleChapterFree chapter={chapter}/>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  )
}

export default ChaptersTable;
