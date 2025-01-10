import Table from '@/Components/shared/table/Table'
import ChapterTogglePublish from '@/Pages/Teacher/Courses/Edit/Partials/ChapterTogglePublish'
import ChapterVideo from '@/Pages/Teacher/Courses/Edit/Partials/ChapterVideo'
import DeleteChapter from '@/Pages/Teacher/Courses/Edit/Partials/DeleteChapter'
import ToggleChapterFree from '@/Pages/Teacher/Courses/Edit/Partials/ToggleChapterFree'
import UpdateChapter from '@/Pages/Teacher/Courses/Edit/Partials/UpdateChapter'
import { Chapter } from '@/types'
import React from 'react'

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
          label: 'Actions',
          name: 'actions',
          colSpan: 2,
          renderCell: (chapter: any) => (
            <div className={'flex-1 flex items-center space-x-4'}>
              <UpdateChapter chapter={chapter}/>
              <DeleteChapter chapter={chapter}/>
              <ChapterVideo chapter={chapter}/>
              {chapter?.video_storage_id ? <>
                  <ChapterTogglePublish chapter={chapter}/>
                  <ToggleChapterFree chapter={chapter}/>
                </> :
                <p className={'text-red-500 bg-red-50 px-2 text-xs rounded-xl font-bold'}>
                  Please upload a video first to publish or make it free.
                </p>
              }
            </div>
          )
        }
      ]}
      rows={chapters}
    />

  )
}

export default ChaptersTable;
