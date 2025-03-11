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
import { Head, Link, usePage } from '@inertiajs/react'
import "react-quill/dist/quill.bubble.css";

import {
  AudioLines,
  BookAIcon,
  CheckCircle2Icon,
  ChevronLeft,
  Clock,
  SaveIcon,
  Star,
  User,
  VideoIcon
} from 'lucide-react'
import React from 'react'

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

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Web Developer',
      comment: 'This platform helped me master React in just 3 months! Highly recommended.',
      avatar: 'https://via.placeholder.com/150',
      rating: 5
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Data Scientist',
      comment: 'The courses are well-structured and easy to follow. Great for beginners!',
      avatar: 'https://via.placeholder.com/150',
      rating: 4
    },
    {
      id: 3,
      name: 'Alice Johnson',
      role: 'UI/UX Designer',
      comment: 'I loved the design courses. They are practical and up-to-date.',
      avatar: 'https://via.placeholder.com/150',
      rating: 5
    },
  ]

  if (!course) {
    return null
  }

  return (
    <div className="min-h-screen relative">
      <Head title={course.title}/>
      <Toaster/>
      <HomePageNavbar auth={auth}/>
      <section
        className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-900 py-12 text-gray-800 md:pt-6 pb-20 mt-16">
        <div className="container flex flex-col mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <Button size={'sm'} variant={'outline'} className={'bg-gray-900 text-white'}>
              <ChevronLeft size={16} className="mr-2"/>
              Browse All Series
            </Button>
            <Badge className="bg-gray-800 text-white">
              Frameworks
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl mb-6 font-semibold">
            By <span className={'underline ml-2'}>{course.author.name}</span>
          </p>
          <div
            className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-8 space-y-2 md:space-y-0 md:bg-gray-900 w-fit md:rounded-full md:text-blue-100 md:px-3 py-0.5">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5"/>
              <span>{course.rating || 5} (1,200 reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5"/>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5"/>
              <span>{course.students_count || 500} students</span>
            </div>
          </div>
          {!course.is_author && (
            <div className="flex flex-col md:flex-row gap-4">
              {course.is_enrolled ? (
                <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                  <Button>
                    <VideoIcon size={16} className="mr-2"/>
                    Continue Series
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    variant={'outline'}
                    onClick={() => toggleWishlist(course)}
                    className="bg-white/10 hover:bg-white/20 text-white border-white"
                  >
                    <SaveIcon size={16} className="mr-2"/>
                    {isOnWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <EditorPreview value={course.description} />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Course Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg overflow-y-auto"
                  >
                    <div className="flex items-center space-x-4">
                      <CheckCircle2Icon className="w-5 h-5 text-blue-600"/>
                      <span className="text-gray-800">{chapter.title}</span>
                    </div>
                    <span className="text-gray-600">{Math.floor(Math.random() * 100)} mins</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructor Bio */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{course.author.name}</p>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testimonials?.map((review) => (
                  <Card key={review.id} className="p-4 overflow-y-auto">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500"/>
                        <span className="text-gray-800">{review.rating}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
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
                  <BookAIcon className="w-5 h-5 text-blue-600"/>
                  <span className="text-gray-800">{course.chapters.length} Lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600"/>
                  <span className="text-gray-800">{course.duration} hrs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AudioLines className="w-5 h-5 text-blue-600"/>
                  <span className="text-gray-800">Level: Intermediate</span>
                </div>
              </div>
              <div className={'mt-2'}>
                {!course.is_enrolled && !course.is_author ?
                  <PaymentModal course={course}/>
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
                <BookAIcon size={16} className="mr-2"/>
                {course.is_author ? 'Course Preview' : 'Continue Series'}
              </div>
            </Link>
            :
            <PaymentModal course={course}/>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CoursePreviewPage
