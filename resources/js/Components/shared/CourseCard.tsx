import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardTitle } from '@/Components/ui/card'
import { useWishlist } from '@/hooks/useWishlist'
import { Course, PageProps, User } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import {
  BookOpenIcon,
  ClockIcon,
  GraduationCapIcon,
  HeartIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
  Calendar
} from 'lucide-react'

type CourseCardProps = {
  course: Course
  addToWishlist?: (courseId: string) => void
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { addToWishlist, removeFromWishlist } = useWishlist()

  // Generate unique random purchase date within last 1-2 days
  const getRandomPurchaseDate = () => {
    const now = new Date('2025-01-15') // Set base date to 2025
    const twoDaysAgo = new Date(now)
    twoDaysAgo.setDate(now.getDate() - 2)

    // Use course ID to generate a unique seed
    const seed = parseInt(course.id.toString().slice(-4)) || 0
    const daysOffset = (seed % 3) // Will give 0, 1, or 2 days

    const purchaseDate = new Date(twoDaysAgo)
    purchaseDate.setDate(twoDaysAgo.getDate() + daysOffset)

    return purchaseDate
  }

  const randomPurchaseDate = getRandomPurchaseDate()

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${minutes}m`
  }

  const toggleWishlist = () => {
    course.is_wishlisted ? removeFromWishlist(course) : addToWishlist(course)
  }

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
            <GraduationCapIcon size={12} className="mr-1.5" />
            <span>{course.level.toUpperCase()}</span>
          </div>

          {/* Course Stats */}
          <div className="absolute bottom-3 right-3 flex space-x-2 text-white text-xs">
            {course.duration_minutes && (
              <div className="flex items-center bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
                <ClockIcon size={12} className="mr-1.5" />
                <span>{formatDuration(course.duration_minutes)}</span>
              </div>
            )}
            <div className="flex items-center bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
              <UsersIcon size={12} className="mr-1.5" />
              <span>{course.students_count}</span>
            </div>
          </div>
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 shadow-md ${course.is_wishlisted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 backdrop-blur-sm hover:bg-white/40'
            }`}
          aria-label="Add to wishlist"
        >
          <HeartIcon size={18} className={`drop-shadow-md ${course.is_wishlisted ? 'text-white' : 'text-white'}`} />
        </button>
      </div>
      <CardContent className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50">
        <div className="flex items-center justify-between mb-2">
          {course.rating > 0 && <div className="flex items-center">
            {renderStars(course.rating)}
            <span className="text-xs font-medium text-slate-600 ml-2">{course.rating}
              <span
                className="text-slate-400">({course.reviews_count})
              </span>
            </span>
          </div>}

          <span
            className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600 flex items-center">
            <BookOpenIcon size={12} className="mr-1 text-orange-500" />
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
          {course.tags && (() => {
            const tags = course.tags.split(',')
            const visibleTags = tags.slice(0, 3)
            const remainingCount = tags.length - 3

            return (
              <>
                {visibleTags.map((tag, index) => {
                  // Generate a dynamic color based on the tag or index
                  const colors = [
                    'bg-blue-100 text-blue-800',
                    'bg-green-100 text-green-800',
                    'bg-purple-100 text-purple-800',
                    'bg-amber-100 text-amber-800',
                    'bg-rose-100 text-rose-800',
                    'bg-teal-100 text-teal-800'
                  ]
                  const colorClass = colors[index % colors.length]

                  return (
                    <span
                      key={index}
                      className={`px-2 py-0.5 ${colorClass} rounded-full text-xs font-medium`}
                    >
                      {tag.trim()}
                    </span>
                  )
                })}

                {remainingCount > 0 && (
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                    +{remainingCount} more
                  </span>
                )}
              </>
            )
          })()}
        </div>


        <div className="flex items-center space-x-3 py-3 border-t border-gray-100">
          <img
            src={course.author.image_url || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`}
            alt={course.author.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 leading-tight">{course.author.name}</p>
            <p className="text-xs text-slate-500">{course.author.role || 'Instructor'}</p>
            <div className="mt-1 flex items-center text-xs text-slate-500">
              <Calendar className="w-3 h-3 mr-1" />
              <span>Last purchased {randomPurchaseDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-900 text-lg">
              ${course.price}
            </div>
            {course.discount_price && course.discount_price > 0 && (
              <div className="text-xs text-slate-500 line-through">${course.discount_price}</div>
            )}
          </div>

          {course.is_enrolled ? (
            <Link href={getFirstChapterLink()}>
              <Button
                variant="default"
                size="sm"
                className="rounded-full font-medium bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-md shadow-emerald-500/20 px-5"
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
                    className="relative group overflow-hidden rounded-full font-medium border-emerald-900/20 hover:border-emerald-900/30 px-5"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-900/5 via-slate-900/5 to-rose-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative bg-gradient-to-r from-emerald-900 via-slate-900 to-rose-900 bg-clip-text text-transparent">
                      Edit Course
                    </span>
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
