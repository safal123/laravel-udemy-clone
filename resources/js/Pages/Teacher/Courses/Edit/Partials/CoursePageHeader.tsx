import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from '@/Components/ui/breadcrumb'
import { Button } from '@/Components/ui/button'
import { Link, useForm } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface CoursePageHeaderProps {
  course: {
    id: string;
    title: string;
    is_published: boolean;
  },
}

export const CoursePageHeader = ({course}: CoursePageHeaderProps) => {
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
    <div className="flex items-center border px-8 py-4 border-gray-200 rounded-md">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={route('teachers.courses.index')}>
                Courses
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <p className={'text-pink-950'}>
                {course.title}
              </p>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
      </div>
    </div>
  )
}
