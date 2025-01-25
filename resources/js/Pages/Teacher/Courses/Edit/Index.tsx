import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import TeacherDashboardLayout from '@/Layouts/TeacherDashboardLayout'
import AddChapter from '@/Pages/Teacher/Courses/Edit/Partials/AddChapter'
import ChaptersTable from '@/Pages/Teacher/Courses/Edit/Partials/ChaptersTable'
import CourseForm from '@/Pages/Teacher/Courses/Edit/Partials/CourseForm'
import { CoursePageHeader } from '@/Pages/Teacher/Courses/Edit/Partials/CoursePageHeader'
import UploadCourseImage from '@/Pages/Teacher/Courses/Edit/Partials/UploadCourseImage'
import { Course } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import React from 'react'
import { Simulate } from 'react-dom/test-utils'

const Index = () => {
  const {course} = usePage<{ course: Course }>().props
  const {errors} = usePage().props
  return (
    <div>
      <Head title={'Edit Course'}/>
      <div className={'flex flex-col space-y-4'}>
        <CoursePageHeader course={course}/>
        <Card>
          <CardHeader className={'flex flex-row items-center justify-between'}>
            <h2 className={'text-xl font-semibold text-gray-700'}>Chapters</h2>
            <AddChapter course={course}/>
          </CardHeader>
          <CardContent>
            <ChaptersTable chapters={course.chapters}/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className={'text-xl font-semibold text-gray-700'}>Course Details</h2>
          </CardHeader>
          <CardContent>
            <CourseForm course={course}/>
          </CardContent>
        </Card>
        <div className="w-full lg:w-1/2 flex-1">
          <div className={'min-h-[400px]'}>
            <Card>
              <CardHeader>
                <h2 className={'text-xl font-semibold text-gray-700'}>Course Image</h2>
              </CardHeader>
              <CardContent>
                <UploadCourseImage
                  errors={errors}
                  course={course}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <Card>
          <CardHeader>
            <h2 className={'text-xl font-semibold text-gray-700'}>Course Settings</h2>
          </CardHeader>
        </Card>

        <Card className={'mt-6 border border-red-500'}>
          <CardHeader>
            <h2 className={'text-xl font-semibold text-gray-700'}>Danger Zone</h2>
          </CardHeader>
          <CardContent className={'flex flex-col space-y-4'}>
            <p>
              Deleting a course is irreversible. Are you sure you want to delete this course?
            </p>
            <Button variant={'destructive'} className={'w-fit'}>Delete Course</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>

export default Index
