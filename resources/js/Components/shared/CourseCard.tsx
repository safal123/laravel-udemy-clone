import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardTitle } from '@/Components/ui/card'
import { Course } from '@/types'
import { Link } from '@inertiajs/react'
import {
  BookOpenIcon,
  ClockIcon,
  GraduationCapIcon,
  HeartIcon,
  PlayCircleIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon
} from 'lucide-react'

type CourseCardProps = {
  course: Course
  addToWishlist: (courseId: string) => void
}

const CourseCard = ({ course, addToWishlist }: CourseCardProps) => {
  const VIDEO_DURATION = '5 hours'

  const renderStars = (rating: number) => {
    if (rating < 1) {
      return ''
    }
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <StarIcon
            key={index}
            className={`h-3.5 w-3.5 ${index < Math.round(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const getFirstChapterLink = () =>
    // TODO: Fix this
    `/courses/${course.slug}`

  // Get a random badge for some courses
  const getRandomBadge = () => {
    const badges = [
      { text: 'Best Seller', bgColor: 'bg-yellow-500', textColor: 'text-yellow-900' },
      { text: 'New', bgColor: 'bg-emerald-500', textColor: 'text-emerald-900' },
      { text: 'Hot', bgColor: 'bg-red-500', textColor: 'text-red-50' },
      { text: 'Featured', bgColor: 'bg-blue-500', textColor: 'text-blue-50' },
    ];

    // Return a badge for 50% of cards, null for the rest
    return Math.random() > 0.5 ? badges[Math.floor(Math.random() * badges.length)] : null;
  }

  const badge = getRandomBadge();

  return (
    <Card className="group overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:shadow-orange-100/30 transition-all duration-300 flex flex-col h-full rounded-xl bg-white relative">
      {/* Badge (if any) */}
      {badge && (
        <div className={`absolute top-3 left-3 z-20 ${badge.bgColor} ${badge.textColor} text-xs font-bold px-2.5 py-1 rounded-md shadow-md`}>
          {badge.text}
        </div>
      )}

      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <Link href={`/courses/${course.slug}`}>
          <div className="aspect-video relative">
            <img
              src={course.image_url}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-95">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <PlayCircleIcon className="h-9 w-9 text-white drop-shadow-md" />
            </div>
          </div>

          {/* Course level tag */}
          <div
            className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md flex items-center">
            <GraduationCapIcon size={12} className="mr-1.5"/>
            <span>{course.level}</span>
          </div>

          {/* Course Stats */}
          <div className="absolute bottom-3 right-3 flex space-x-2 text-white text-xs">
            <div className="flex items-center bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
              <ClockIcon size={12} className="mr-1.5"/>
              <span>{VIDEO_DURATION}</span>
            </div>
            <div className="flex items-center bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
              <UsersIcon size={12} className="mr-1.5"/>
              <span>{course.rating}</span>
            </div>
          </div>
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={() => addToWishlist(course.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-300 hover:scale-110 z-10 shadow-md"
          aria-label="Add to wishlist"
        >
          <HeartIcon size={18} className="text-white drop-shadow-md" />
        </button>
      </div>
      <CardContent className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50">
        <div className="flex items-center justify-between mb-2">
          {course.rating > 0 && <div className="flex items-center">
            {renderStars(course.rating)}
            <span className="text-xs font-medium text-slate-600 ml-2">{course.rating} <span
              className="text-slate-400">({course.reviews_count})</span></span>
          </div>}

          <span
            className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600 flex items-center">
            <BookOpenIcon size={12} className="mr-1 text-orange-500"/>
            {course.chapters_count} lessons
          </span>
        </div>

        <Link href={`/courses/${course.slug}`} className="group-hover:text-orange-600 transition-colors block">
          <CardTitle className="text-base md:text-lg font-semibold leading-tight mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 h-[50px] overflow-hidden">
            {course.title}
          </CardTitle>
        </Link>

        {/* Course highlights */}
        <div className="my-2 flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">React</span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Frontend</span>
          <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">UX/UI</span>
        </div>

        <div className="my-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <TrendingUpIcon size={14} className="text-emerald-500"/>
            <span className="text-xs text-slate-600">
              {Math.floor(Math.random() * (98 - 90 + 1)) + 90} completion rate
            </span>
          </div>
        </div>

        {/* Author profile */}
        <div className="flex items-center space-x-3 py-3 border-t border-gray-100">
          <img
            src={course.author.image_url || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`}
            alt={course.author.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
          />
          <div>
            <p className="text-sm font-medium text-slate-900 leading-tight">{course.author.name}</p>
            <p className="text-xs text-slate-500">{course.author.role || 'Instructor'}</p>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900 text-lg">
              ${course.price}
            </div>
            {course.price > 0 && (
              <div className="text-xs text-slate-500 line-through">${(course.price * 1.3).toFixed(2)}</div>
            )}
          </div>

          {course.is_enrolled ? (
            <Link href={getFirstChapterLink()}>
              <Button
                variant="default"
                size="sm"
                className="rounded-full font-medium bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-md shadow-orange-500/20 px-5"
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
                    className="rounded-full font-medium border-slate-300 hover:border-slate-400 hover:bg-slate-50 px-5"
                  >
                    Edit Course
                  </Button>
                </Link>
              ) : (
                <Link href={`/courses/${course.slug}?enroll=true`}>
                  <Button
                    size="sm"
                    className="rounded-full font-medium bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-md shadow-orange-500/20 px-5"
                  >
                    Enroll Now
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
