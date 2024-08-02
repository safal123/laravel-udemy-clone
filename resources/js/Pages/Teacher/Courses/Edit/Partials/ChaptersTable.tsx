import Table from "@/Components/shared/table/Table";
import React from "react";
import UpdateChapter from "@/Pages/Teacher/Courses/Edit/Partials/UpdateChapter";
import {Chapter} from "@/types";
import DeleteChapter from "@/Pages/Teacher/Courses/Edit/Partials/DeleteChapter";
import ChapterVideo from "@/Pages/Teacher/Courses/Edit/Partials/ChapterVideo";
import ChapterTogglePublish from "@/Pages/Teacher/Courses/Edit/Partials/ChapterTogglePublish";
import ToggleChapterFree from "@/Pages/Teacher/Courses/Edit/Partials/ToggleChapterFree";

type ChaptersTableProps = {
  chapters: Chapter[]
}

const ChaptersTable = ({chapters}: ChaptersTableProps) => {
  return (
    <Table
      columns={[
        {
          label: 'Title',
          name: 'title',
          renderCell: (row: any) => (
            <div className={'text-gray-800'}>
              {row.title}
            </div>
          )
        },
        {
          label: 'Preview',
          name: 'is_free',
          renderCell: (row: any) => (
            <div className={'text-gray-800'}>
              {row.is_free ?
                <div className={'text-green-500 bg-green-50 text-xs border px-4 py-1 rounded-3xl border-green-500'}>
                  Free
                </div> :
                <div className={'text-red-500 bg-red-50 text-xs border px-4 py-1 rounded-3xl border-red-500'}>
                  Paid
                </div>
              }
            </div>
          )
        },
        {
          label: 'Actions',
          name: 'actions',
          colSpan: 2,
          renderCell: (row: any) => (
            <div className={'flex items-center space-x-4'}>
              {/*<UpdateChapter chapter={row}/>*/}
              {/*<DeleteChapter chapter={row}/>*/}
              {/*<ChapterVideo chapter={row}/>*/}
              {/*<ChapterTogglePublish chapter={row}/>*/}
              {/*<ToggleChapterFree chapter={row}/>*/}
            </div>
          )
        }
      ]}
      rows={chapters}
    />
  )
}

export default ChaptersTable;
