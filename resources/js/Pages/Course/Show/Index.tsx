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

import { AudioLines, BookAIcon, Clock, Calendar } from 'lucide-react'
import React from 'react'
import 'react-quill/dist/quill.bubble.css'
import ChaptersPreview from './_component/ChaptersPreview'
import CourseDescription from './_component/CourseDescription'
import CourseHeader from './_component/CourseHeader'
import CourseReview from './_component/CourseReview'

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
            <CourseReview
              course={course}
              isEnrolled={course.is_enrolled && !course.is_author}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <Card className="bg-white shadow-lg sticky top-20 border border-slate-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-80"></div>
            <CardContent className="relative pt-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50/80 transition-colors duration-200">
                  <div className="p-2.5 bg-slate-100 rounded-lg mt-0.5">
                    <BookAIcon className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-500 text-sm font-medium">Total Lessons</span>
                    <p className="text-slate-900 text-base font-semibold mt-0.5">{course.chapters.length} Lessons</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50/80 transition-colors duration-200">
                  <div className="p-2.5 bg-slate-100 rounded-lg mt-0.5">
                    <Clock className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-500 text-sm font-medium">Duration</span>
                    <p className="text-slate-900 text-base font-semibold mt-0.5">{course.duration} hrs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50/80 transition-colors duration-200">
                  <div className="p-2.5 bg-slate-100 rounded-lg mt-0.5">
                    <AudioLines className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <span className="text-slate-500 text-sm font-medium">Level</span>
                    <p className="text-slate-900 text-base font-semibold mt-0.5">Intermediate</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                {!course.is_enrolled && !course.is_author ? (
                  <PaymentModal course={course} />
                ) : (
                  <div className="mt-4 flex flex-col space-y-4">
                    {course.students.length > 0 && (
                      <div className="bg-slate-50/80 rounded-lg p-3.5 border border-slate-100">
                        <div className="flex items-center gap-2.5 text-sm">
                          <Calendar className="w-4 h-4 text-slate-700" />
                          <span className="text-slate-500 font-medium">Enrolled on:</span>
                          <span className="text-slate-900 font-semibold">
                            {/* @ts-ignore */}
                            {format(new Date(course.students[0].purchase_details.created_at), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    )}
                    <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                      <Button
                        variant="default"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all duration-200 h-11 font-medium text-base"
                      >
                        {course.is_author ? 'Course Preview' : 'Continue Learning'}
                      </Button>
                    </Link>
                  </div>
                )}
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
