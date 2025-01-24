import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from '@/Components/ui/breadcrumb'
import { Button } from '@/Components/ui/button'
import { Separator } from '@/Components/ui/separator'
import TeacherDashboardLayout from '@/Layouts/TeacherDashboardLayout'
import AddChapter from '@/Pages/Teacher/Courses/Edit/Partials/AddChapter'
import ChaptersTable from '@/Pages/Teacher/Courses/Edit/Partials/ChaptersTable'
import CourseForm from '@/Pages/Teacher/Courses/Edit/Partials/CourseForm'
import { CoursePageHeader } from '@/Pages/Teacher/Courses/Edit/Partials/CoursePageHeader'
import { Course } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { Loader, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import { toast } from 'sonner'
import reset = Simulate.reset

const Index = () => {
  const {course} = usePage<{ course: Course }>().props
  return (
    <div>
      <Head title={'Edit Course'}/>
      <div className={'flex flex-col space-y-4'}>
        <CoursePageHeader course={course}/>
        <div>
          <div className={'flex items-center bg-gray-200 justify-between py-4 mb-2 px-8 rounded-md'}>
            <h2 className={'text-xl font-semibold text-gray-700'}>Chapters</h2>
            <AddChapter course={course}/>
          </div>
          <ChaptersTable chapters={course.chapters}/>
        </div>
        <Separator/>
        <div className="overflow-hidden rounded shadow mt-4 bg-gray-100">
          <CourseForm course={course}/>
        </div>
      </div>
    </div>
  )
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>

export default Index
