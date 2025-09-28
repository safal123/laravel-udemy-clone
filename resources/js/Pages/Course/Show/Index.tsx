import AuthorProfile from '@/Components/shared/AuthorProfile'
import Footer from '@/Components/shared/Footer'
import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import PaymentModal from '@/Components/shared/PaymentModal'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Toaster } from '@/Components/ui/sonner'
import { useWishlist } from '@/hooks/useWishlist'
import { Course, PageProps } from '@/types'
import { Head, Link, usePage } from '@inertiajs/react'
import { format } from 'date-fns'

import { AudioLines, BookAIcon, Clock, Calendar, BookOpen, PlayCircle } from 'lucide-react'
import 'react-quill/dist/quill.bubble.css'
import ChaptersPreview from './_component/ChaptersPreview'
import CourseDescription from './_component/CourseDescription'
import CourseHeader from './_component/CourseHeader'
import CourseReview from './_component/CourseReview'
import CourseInfoTabs from './_component/CourseInfoTabs'

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
    <div className="min-h-screen relative bg-slate-50/50">
      <Head title={course.title} />
      <Toaster />
      <HomePageNavbar auth={auth} />
      <div className="mt-16">
        <CourseHeader
          course={course}
          toggleWishlist={toggleWishlist}
        />
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div>
            <CourseInfoTabs course={course} />
          </div>

          <div>
            <CourseDescription course={course} />
          </div>

          <div className="">
            <ChaptersPreview course={course} />
          </div>

          <div className="">
            <AuthorProfile author={course.author} />
          </div>

          <div className="mt-8">
            <CourseReview
              course={course}
              isEnrolled={course.is_enrolled && !course.is_author}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <Card className="bg-white border-0 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl sticky top-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-white to-slate-50/80 opacity-70"></div>

            <CardContent className="relative p-6">
              {/* Course Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-2 bg-gradient-to-br from-slate-100/80 to-white rounded-xl p-4 hover:bg-slate-50 transition-all duration-200 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-lg shadow-sm">
                      <BookAIcon className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-slate-900 text-lg font-semibold">{course.chapters.length}</p>
                      <p className="text-slate-600 text-sm">Total Lessons</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-100/80 to-white rounded-xl p-4 hover:bg-slate-50 transition-all duration-200 border border-slate-100">
                  <div className="flex flex-col gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm w-min">
                      <Clock className="w-4 h-4 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold">{course.duration}</p>
                      <p className="text-slate-600 text-sm">Hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-100/80 to-white rounded-xl p-4 hover:bg-slate-50 transition-all duration-200 border border-slate-100">
                  <div className="flex flex-col gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm w-min">
                      <AudioLines className="w-4 h-4 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold">
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </p>
                      <p className="text-slate-600 text-sm">Level</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Section */}
              <div className="space-y-5">
                {!course.is_enrolled && !course.is_author ? (
                  <PaymentModal course={course} />
                ) : (
                  <>
                    {course.students.length > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50/80 rounded-xl p-4 border border-blue-100/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/80 rounded-lg shadow-sm">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-blue-600 text-sm font-medium">Enrolled on</p>
                            <p className="text-blue-900 font-semibold">
                              {/* @ts-ignore */}
                              {format(new Date(course.students[0].purchase_details.created_at), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`} className="block">
                      <Button
                        variant="default"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                        text-white shadow-sm hover:shadow-md transition-all duration-300 h-12 text-base rounded-xl
                        flex items-center justify-center gap-2.5 font-medium"
                      >
                        {course.is_author ? (
                          <>
                            <BookOpen className="w-5 h-5" />
                            Preview Course
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-5 h-5" />
                            Start Learning
                          </>
                        )}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className={'lg:hidden bottom-4 inset-x-0 sticky'}>
          {course.is_enrolled || course.is_author || course.price > 0 ?
            <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
              <div className={'bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center py-3 rounded-xl text-white shadow-lg'}>
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
