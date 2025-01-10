import { Button } from '@/Components/ui/button'
import TeacherDashboardLayout from '@/Layouts/TeacherDashboardLayout'
import AddChapter from '@/Pages/Teacher/Courses/Edit/Partials/AddChapter'
import ChaptersTable from '@/Pages/Teacher/Courses/Edit/Partials/ChaptersTable'
import CourseForm from '@/Pages/Teacher/Courses/Edit/Partials/CourseForm'
import { Course } from '@/types'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { Loader, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import { toast } from 'sonner'
import reset = Simulate.reset

const Index = () => {
  const {course} = usePage<{ course: Course }>().props
  const {put, processing, errors} = useForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(route('teachers.courses.toggle-publish', {
      course: course.id
    }), {
      preserveScroll: true,
      onError: () => {
        toast.error('Failed to publish course')
      }
    })
  }
  return (
    <div>
      <Head title={'Edit Course'}/>
      <div className="flex items-center px-8 py-4 bg-white border-b border-gray-200 mb-2 rounded-md">
        <h1 className="text-xl lg:text-xl font-bold">
          <Link
            href={route('teachers.courses.index')}
            className="text-gray-600 hover:text-gray-700 underline"
          >
            Courses
          </Link>
          <span className="font-medium text-gray-600"> /</span> {course.title}
        </h1>
        <div className="ml-auto flex items-center">
          <form onSubmit={handleSubmit}>
            <Button
              type={'submit'}
              variant={course.is_published ? 'default' : 'outline'}
            >
              {processing && <Loader2 className={'animate-spin mr-2'} size={20}/>}
              {course.is_published ? 'Unpublish' : 'Publish'}
            </Button>
          </form>
          <Button
            className="ml-4"
            variant={'destructive'}
            onClick={() => console.log('clicked')}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="overflow-hidden bg-white rounded shadow">
        <CourseForm course={course}/>
      </div>
      <div className={'mt-6'}>
        <div className={'flex items-center justify-between py-4 mt-2 bg-white mb-2 px-8 rounded-md'}>
          <h2 className={'text-xl font-semibold text-gray-700'}>Chapters</h2>
          <AddChapter course={course}/>
        </div>
        <ChaptersTable chapters={course.chapters}/>
      </div>
    </div>
  )
}

Index.layout = (page: React.ReactNode) => <TeacherDashboardLayout>{page}</TeacherDashboardLayout>

export default Index
