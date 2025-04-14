import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import TeacherDashboardLayout from '@/Layouts/TeacherDashboardLayout'
import AddChapter from '@/Pages/Teacher/Courses/Edit/Partials/AddChapter'
import ChaptersTable from '@/Pages/Teacher/Courses/Edit/Partials/ChaptersTable'
import { CourseDeleteCard } from '@/Pages/Teacher/Courses/Edit/Partials/CourseDeleteCard'
import CourseForm from '@/Pages/Teacher/Courses/Edit/Partials/CourseForm'
import { CoursePageHeader } from '@/Pages/Teacher/Courses/Edit/Partials/CoursePageHeader'
import CourseSettings from '@/Pages/Teacher/Courses/Edit/Partials/CourseSettings'
import UploadCourseImage from '@/Pages/Teacher/Courses/Edit/Partials/UploadCourseImage'
import { Course, Category } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import React from 'react'

const Index = () => {
  const { course, categories } = usePage<{ course: Course, categories: Category[] }>().props
  const { errors } = usePage().props
  return (
    <>
      <Head title={'Edit Course'} />
      <div className="flex flex-col space-y-6 pb-8">
        <CoursePageHeader course={course} />

        <Card>
          <CardHeader className={'flex flex-row items-center justify-between'}>
            <h2 className={'text-xl font-semibold text-gray-700'}>Chapters</h2>
            <AddChapter course={course} />
          </CardHeader>
          <CardContent>
            <ChaptersTable chapters={course.chapters} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-700">Course Details</h2>
          </CardHeader>
          <CardContent>
            <CourseForm course={course} mode="edit" categories={categories} />
          </CardContent>
        </Card>

        <div className="w-full xl:w-1/2">
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-700">Course Image</h2>
            </CardHeader>
            <CardContent>
              <UploadCourseImage
                errors={errors}
                course={course}
              />
            </CardContent>
          </Card>
        </div>

        <CourseDeleteCard />
      </div>
    </>
  )
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>

export default Index
