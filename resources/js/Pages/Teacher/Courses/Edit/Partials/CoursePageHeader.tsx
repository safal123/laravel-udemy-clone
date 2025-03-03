import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/Components/ui/breadcrumb'
import { Button } from '@/Components/ui/button'
import { Link, router } from '@inertiajs/react'
import { BookCheck, BookPlusIcon, Loader2 } from 'lucide-react'
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.visit(route('teachers.courses.update', {
      course: course.id}), {
      method: 'put',
      data: {
        is_published: !course.is_published
      },
      preserveScroll: true,
      preserveState: true,
      onError: () => {
        toast.error('Failed to update course')
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
            {course.is_published ? <BookCheck className={'mr-2 w-4 h-4'}/> : <BookPlusIcon className={'mr-2 w-4 h-4'}/>}
            {/*{processing && <Loader2 className={'animate-spin mr-2'} size={20}/>}*/}
            {course.is_published ? 'Unpublish' : 'Publish'}
          </Button>
        </form>
      </div>
    </div>
  )
}
