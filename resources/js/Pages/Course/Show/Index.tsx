import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { useWishlist } from '@/hooks/useWishlist'
import CourseLayout from '@/Layouts/CourseLayout'
import { Course, PageProps } from '@/types'
import { Link, router, usePage } from '@inertiajs/react'
import {
  AudioLines,
  BookAIcon,
  CheckCircle2Icon,
  ChevronLeft,
  CircleDollarSign,
  Clock, Loader2,
  LockIcon,
  SaveIcon,
  VideoIcon
} from 'lucide-react'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const Index = ({auth}: PageProps) => {
  const course = usePage().props.course as Course
  const hasPurchased = auth.user?.purchased_courses?.some((c: Course) => c.id === course.id)
  const isOwner = auth.user.id === course.user_id
  const { addToWishlist } = useWishlist()

  const addCourseToWishlist = async (course: Course) => {
    if (!course || isOwner && !hasPurchased) {
      return false
    }
    await addToWishlist(course)
  }

  return (
    <div className={'border border-gray-700 rounded-md p-4'}>
      <div className={'flex-1 space-y-4'}>
        <div className="w-full mx-auto p-6 rounded-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <Button
              size={'sm'}
              variant={'outline'}
              className="bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
            >
              <ChevronLeft size={16} className="mr-2"/>
              Browse All Series
            </Button>
            <Badge
              className="border border-red-900 bg-red-900 text-red-100 cursor-pointer hover:bg-red-100 hover:text-red-900">
              Frameworks
            </Badge>
          </div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-400">
              {course.title}
            </h1>
            <p className="text-sm text-gray-400 mb-4">
              Last Updated:
              <Badge
                variant={'outline'}
                className="ml-2 text-gray-400"
              >
                {course.updated_at}
              </Badge>
            </p>
            <p className="text-gray-300">
              {course.description}
            </p>
          </div>
          {!isOwner &&
            <div className="flex flex-col md:flex-row gap-4">
              {hasPurchased &&
                <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                  <Button
                    variant={'outline'}
                    className="bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
                  >
                    <VideoIcon size={16} className="mr-2"/>
                    <span className="flex items-center gap-2">
                    Continue Series
                  </span>
                  </Button>
                </Link>
              }
              {!hasPurchased &&
                <Button
                  variant={'outline'}
                  onClick={() => addCourseToWishlist(course)}
                  className="bg-gray-700 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700"
                >
                  <SaveIcon size={16} className="mr-2"/>
                  Add to wishlist
                </Button>
              }
              {!hasPurchased && (
                <Link href={`/payment?course=${course.id}&price=${course.price}`} className={'md:ml-auto w-full'}>
                  <Button
                    className="bg-gradient">
                    <CircleDollarSign size={16} className="mr-2"/>
                    <span className={'font-semibold'}>
                    Enroll Now
                  </span>
                  </Button>
                </Link>
              )}
            </div>}
        </div>
        <div className={"px-6"}>
          <div className="w-full mb-2 mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex items-center w-full justify-between md:justify-start gap-2 text-gray-400">
                <div className={'flex items-center gap-1'}>
                  <BookAIcon size={12}/>
                  <span className="text-sm">
                  {course.chapters.length} Lessons
                </span>
                </div>
                <div className={'flex items-center gap-1'}>
                  <Clock size={12}/>
                  <span className="text-sm">
                  2 hours 30 minutes
                </span>
                </div>
                <div className={'xl:flex gap-1 items-center hidden'}>
                  <AudioLines size={12}/>
                  <span className="text-sm">
                  Level: Intermediate
                </span>
                </div>
              </div>
              {!isOwner && hasPurchased &&
                <div className={'flex justify-between md:justify-end gap-2 items-center w-full'}>
                  <Button className={'text-gray-400 hover:text-white'}>
                    <Clock size={16} className="mr-2"/>
                    Reset Progress
                  </Button>
                  <Button className={'text-gray-400 hover:text-white'}>
                    <CheckCircle2Icon size={16} className="mr-2"/>
                    Mark as Complete
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="w-full mx-auto px-6">
          <div className={'flex flex-col gap-2'}>
            {course.chapters.map((chapter, index) =>
              <div
                className={'flex bg-gray-800 p-6 items-center gap-4 rounded-lg shadow-md text-white'}
                key={index}
              >
                <div className={'bg-gray-900 flex items-center justify-center w-12 h-12 rounded-full'}>
                  <span className="text-lg text-gray-400">
                    {index + 1}
                  </span>
                </div>
                <div className={'flex flex-col'}>
                  <Link href={`/courses/${course.slug}/chapters/${chapter.id}`}>
                    <h1 className="text-lg font-semibold text-gray-400 hover:text-white">
                      {chapter.title}
                    </h1>
                  </Link>
                </div>
                <div className={'ml-auto'}>
                  <div className={'flex items-center gap-2 bg-gray-900 p-2 rounded-full'}>
                    <LockIcon size={16} className="text-red-500"/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Index.layout = (page: React.ReactNode) => <CourseLayout>{page}</CourseLayout>

export default Index
