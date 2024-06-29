// @ts-ignore
import {truncate} from "lodash";
import Table from "@/Components/shared/table/Table";
import React from "react";
import UpdateChapter from "@/Pages/Teacher/Courses/Edit/Partials/UpdateChapter";
import {Chapter} from "@/types";
import DeleteChapter from "@/Pages/Teacher/Courses/Edit/Partials/DeleteChapter";
import ChapterVideo from "@/Pages/Teacher/Courses/Edit/Partials/ChapterVideo";

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
              {truncate(row.title, {length: 20})}
            </div>
          )
        },
        {
          label: 'Order',
          name: 'order',
          renderCell: (row: any) => (
            <div className={'text-gray-800'}>
              {row.order}
            </div>
          )
        },
        {
          label: 'Actions',
          name: 'actions',
          renderCell: (row: any) => (
            <div className={'flex items-center space-x-4'}>
              <UpdateChapter chapter={row}/>
              <DeleteChapter chapter={row}/>
              <ChapterVideo chapter={row}/>
            </div>
          )
        }
      ]}
      rows={chapters}
      getRowDetailsUrl={(row: any) => route('teachers.courses.edit', row.id)}
    />
  )
}

export default ChaptersTable;
