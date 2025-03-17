import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Course } from '@/types'
import { Link } from '@inertiajs/react'
import { BookOpenIcon, ClockIcon, HeartIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react'

type CourseCardProps = {
  course: Course
  addToWishlist: (course: Course) => void
}

const CourseCard = ({course, addToWishlist}: CourseCardProps) => {
  const RATING = 4.5
  const TOTAL_RATINGS = 100
  const VIDEO_DURATION = '5 hours'

  const truncateTitle = (title: string, maxLength: number = 40) =>
    title.length > maxLength ? `${title.substring(0, maxLength)}...` : title

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`h-3.5 w-3.5 ${
            index < Math.round(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )

  const getFirstChapterLink = () =>
    `/courses/${course.slug}/chapters/${course.chapters[0].id}`

  return (
    <Card className="group overflow-hidden border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full rounded-lg bg-white">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <Link href={`/courses/${course.slug}`}>
          <div className="aspect-video relative">
            <img
              src={course.image_url}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <PlayCircleIcon className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Course Stats */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 text-white text-xs">
            <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <ClockIcon size={12} className="mr-1" />
              <span>{VIDEO_DURATION}</span>
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <UsersIcon size={12} className="mr-1" />
              <span>{TOTAL_RATINGS} students</span>
            </div>
          </div>
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={() => addToWishlist(course)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors"
          aria-label="Add to wishlist"
        >
          <HeartIcon size={16} className="text-white" />
        </button>
      </div>

      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          {renderStars(RATING)}
          <span className="text-xs font-medium text-gray-500">{RATING}/5</span>
        </div>

        <Link href={`/courses/${course.slug}`} className="group-hover:text-orange-600 transition-colors">
          <CardTitle className="text-base font-semibold leading-tight mb-2">
            {truncateTitle(course.title)}
          </CardTitle>
        </Link>

        <div className="text-xs text-gray-500 mb-4 flex items-center">
          <BookOpenIcon size={14} className="mr-1 text-gray-400" />
          <span>{course.chapters.length} lessons</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="font-bold text-slate-900">
              ${course.price}
            </div>

            {course.is_enrolled ? (
              <Link href={getFirstChapterLink()}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  Continue
                </Button>
              </Link>
            ) : (
              <>
                {course.is_author ? (
                  <Link href={`/teachers/courses/${course.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-medium border-slate-300 hover:border-slate-400"
                    >
                      Edit Course
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/courses/${course.slug}`}>
                    <Button
                      size="sm"
                      className="font-medium bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 border-0"
                    >
                      Enroll Now
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
