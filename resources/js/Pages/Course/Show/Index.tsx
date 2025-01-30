import HomePageNavbar from '@/Components/shared/HomePageNavbar'
import PaymentModal from '@/Components/shared/PaymentModal'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Toaster } from '@/Components/ui/sonner'
import { useWishlist } from '@/hooks/useWishlist'
import { Course, PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
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

const stripePromise = loadStripe('pk_test_51PY3wiCKzGstGhEeysB3zOfMD1Wuv76IwA2xjkXvj9rZD69KIH0P17d731dvSYm6mxwgmEpU10iM0wbhZaLpo6z800uhwx77KX')

const CoursePreviewPage = ({auth}: PageProps) => {
  const course = usePage().props.course as Course
  const clientSecret = usePage().props.clientSecret as string
  const hasPurchased = auth.user?.purchased_courses?.some((c: Course) => c.id === course.id)
  const isOwner = auth.user.id === course.user_id
  const {addToWishlist, removeFromWishlist} = useWishlist()

  const isOnWishlist = auth.user?.wishlists?.some((c) => c.course_id === course.id)

  const toggleWishlist = async (course: Course) => {
    if (!course || (isOwner && !hasPurchased)) {
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
    <div className="min-h-screen">
      <Toaster/>
      <HomePageNavbar auth={auth}/>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 py-12 text-white md:py-20 mt-16">
        <div className="container flex flex-col mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              size={'sm'}
              variant={'outline'}
              className="bg-white/10 hover:bg-white/20 text-white border-white"
            >
              <ChevronLeft size={16} className="mr-2"/>
              Browse All Series
            </Button>
            <Badge
              className="border border-blue-900 bg-blue-900 text-white hidden sm:block">
              Frameworks
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl mb-6">
            By
            <span className={'underline ml-2'}>{course.author.name}</span>
          </p>
          <div
            className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-8 space-y-2 md:space-y-0 md:bg-blue-900 w-fit md:rounded-full md:text-blue-100 md:px-3 py-0.5">
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
              <span>{course.students || 500} students</span>
            </div>
          </div>
          {!isOwner && (
            <div className="flex flex-col md:flex-row gap-4">
              {hasPurchased ? (
                <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg w-full">
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Details */}
        <div className="lg:col-span-2">
          {/* Course Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{course.description}</p>
            </CardContent>
          </Card>

          {/* Chapters */}
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
        <div className="lg:col-span-1">
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
              {!hasPurchased ?
                <div>
                  <Elements stripe={stripePromise} options={{clientSecret}}>
                    <PaymentModal course={course}/>
                  </Elements>
                </div>
                :
                <div className={'mt-6 space-y-4'}>
                  <p>
                    Purchased on: <span className="text-gray-800">12th July 2021</span>
                  </p>
                  <Button variant={'outline'} className="w-full">
                    Continue Series
                  </Button>
                </div>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CoursePreviewPage
