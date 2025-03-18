import EditorPreview from '@/Components/shared/EditorPreview'
import Footer from '@/Components/shared/Footer'
import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import PaymentModal from '@/Components/shared/PaymentModal'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Toaster } from '@/Components/ui/sonner'
import { useWishlist } from '@/hooks/useWishlist'
import { Course, PageProps } from '@/types'
import { Head, Link, router, usePage } from '@inertiajs/react'
import "react-quill/dist/quill.bubble.css";

import {
  AudioLines,
  BookAIcon,
  Clock,
  PlayCircle,
  SaveIcon,
  Star,
  User,
  VideoIcon
} from 'lucide-react'
import React from 'react'
import ChaptersPreview from './_component/ChaptersPreview'
import CourseReview from './_component/CourseReview'
import AuthorProfile from '@/Components/shared/AuthorProfile'
import CourseHeader from './_component/CourseHeader'
import CourseDescription from './_component/CourseDescription'

const CoursePreviewPage = ({ auth }: PageProps) => {
  const course = usePage().props.course as Course
  const hasPurchased = auth.user?.purchased_courses?.some((c: Course) => c.id === course.id)
  const { addToWishlist, removeFromWishlist } = useWishlist()
  const isOnWishlist = auth.user?.wishlists?.some((c) => c.course_id === course.id)

  const toggleWishlist = async (course: Course) => {
    if (!course || (course.is_author && !hasPurchased)) {
      return false
    }
    await isOnWishlist ? removeFromWishlist(course) : addToWishlist(course)
  }

  if (!course) {
    return null
  }

  return (
    <div className="min-h-screen relative">
      <Head title={course.title} />
      <Toaster />
      <HomePageNavbar auth={auth} />
      <div className="mt-16">
        <CourseHeader
          course={course}
          toggleWishlist={toggleWishlist}
          isOnWishlist={isOnWishlist}
        />
      </div>
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">

          <CourseDescription course={course} />
          <ChaptersPreview course={course} />
          <AuthorProfile author={course.author} />
          <div className="mt-8">
            <CourseReview />
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <Card className="bg-white shadow-lg sticky top-20">
            <CardHeader>
              <CardTitle className="text-2xl">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BookAIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-800">{course.chapters.length} Lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-800">{course.duration} hrs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AudioLines className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-800">Level: Intermediate</span>
                </div>
              </div>
              <div className={'mt-2'}>
                {!course.is_enrolled && !course.is_author ?
                  <PaymentModal course={course} />
                  :
                  <div className={'mt-6 flex flex-col space-y-4'}>
                    <span>
                      <Badge className={''} variant={'outline'}>
                        Purchased on: <span className="text-gray-800">12th July 2021</span>
                      </Badge>
                    </span>
                    <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                      <Button variant={'outline'} className="w-full">
                        {course.is_author ? 'Course Preview' : 'Continue Series'}
                      </Button>
                    </Link>
                  </div>
                }
              </div>
            </CardContent>
          </Card>
        </div>
        <div className={'lg:hidden bottom-4 inset-x-0 sticky'}>
          {course.is_enrolled || course.is_author ?
            <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
              <div className={'bg-gray-900 flex items-center justify-center py-2 rounded-md text-white'}>
                <BookAIcon size={16} className="mr-2" />
                {course.is_author ? 'Course Preview' : 'Continue Series'}
              </div>
            </Link>
            :
            <PaymentModal course={course} />
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CoursePreviewPage
