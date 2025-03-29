import AuthorProfile from '@/Components/shared/AuthorProfile'
import Footer from '@/Components/shared/Footer'
import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import PaymentModal from '@/Components/shared/PaymentModal'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Toaster } from '@/Components/ui/sonner'
import { useWishlist } from '@/hooks/useWishlist'
import { Course, PageProps } from '@/types'
import { Head, Link, usePage } from '@inertiajs/react'
import { format } from 'date-fns'

import { AudioLines, BookAIcon, Clock } from 'lucide-react'
import React from 'react'
import 'react-quill/dist/quill.bubble.css'
import ChaptersPreview from './_component/ChaptersPreview'
import CourseDescription from './_component/CourseDescription'
import CourseHeader from './_component/CourseHeader'
import CourseReview from './_component/CourseReview'

const CoursePreviewPage = ({auth}: PageProps) => {
  const course = usePage().props.course as Course
  const hasPurchased = auth.user?.purchased_courses?.some((c: Course) => c.id === course.id)
  const {addToWishlist, removeFromWishlist} = useWishlist()
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
            <CourseReview
              course={course}
              isEnrolled={course.is_enrolled && !course.is_author}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <Card className="bg-white shadow-md sticky top-20 border border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold text-gray-900">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <BookAIcon className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700 font-medium">{course.chapters.length} Lessons</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-emerald-600"/>
                  <span className="text-gray-700 font-medium">{course.duration} hrs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AudioLines className="w-5 h-5 text-emerald-600"/>
                  <span className="text-gray-700 font-medium">Level: Intermediate</span>
                </div>
              </div>
              <div>
                {!course.is_enrolled && !course.is_author ?
                  <PaymentModal course={course}/>
                  :
                  <div className="mt-4 flex flex-col space-y-4">
                    {course.students.length > 0 &&
                      <Badge variant="outline" className="py-1.5 px-3 justify-center text-sm font-normal">
                        Enrolled on: <span className="ml-1 font-medium">
                        {/* @ts-ignore */}
                        {format(new Date(course.students[0].purchase_details.created_at), 'MMM d, yyyy')}
                      </span>
                      </Badge>}
                    <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                      <Button variant="default" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        {course.is_author ? 'Course Preview' : 'Continue Learning'}
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
