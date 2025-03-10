import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Course } from '@/types'
import { Link } from '@inertiajs/react'
import { BookAIcon, Edit2Icon, HandIcon, HeartIcon, LifeBuoyIcon, Star, Tv2Icon, Videotape } from 'lucide-react'

type CourseCardProps = {
  course: Course
  addToWishlist: (course: Course) => void
}

const CourseCard = ({course, addToWishlist}: CourseCardProps) => {
  const RATING = 4.5
  const TOTAL_RATINGS = 100
  const VIDEO_DURATION = '5 hours'

  const truncateTitle = (title: string, maxLength: number = 20) =>
    title.length > maxLength ? `${title.substring(0, maxLength)}...` : title

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < Math.round(rating)
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )

  const getFirstChapterLink = () =>
    `/courses/${course.slug}/chapters/${course.chapters[0].id}`

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardHeader className="p-0 flex-shrink-0">
        <Link href={`/courses/${course.slug}`}>
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </Link>
      </CardHeader>

      <CardContent className="p-4 flex flex-col flex-grow">
        <CardTitle className="text-lg font-semibold flex-shrink-0">
          {truncateTitle(course.title)}
        </CardTitle>

        <div className="mt-2 flex items-center flex-shrink-0">
          {renderStars(RATING)}
          <span className="ml-2 text-sm text-gray-600">
            {RATING} ({TOTAL_RATINGS} ratings)
          </span>
        </div>

        <ul className="mt-4 space-y-2 text-gray-600 text-sm flex-shrink-0">
          <li className="flex items-center">
            <Videotape size={16}/>
            <span className="ml-2">{VIDEO_DURATION} on-demand video</span>
          </li>
          <li className="flex items-center">
            <BookAIcon size={16}/>
            <span className="ml-2">{course.chapters.length} lectures</span>
          </li>
          <li className="flex items-center">
            <LifeBuoyIcon size={16}/>
            <span className="ml-2">Full lifetime access</span>
          </li>
        </ul>

        <div className="mt-4 flex items-center">
          {course.is_enrolled ? (
            <Link href={getFirstChapterLink()} className={'w-full'}>
              <Button variant="outline" className={'w-full'}>
                Continue Learning
                <HandIcon size={16} className={'ml-2'}/>
              </Button>
            </Link>
          ) : (
            <>
              {course.is_author ?
                <Link href={`/teachers/courses/${course.id}/edit`} className={'w-full'}>
                  <Button variant="ghost" className={'w-full'}>
                    <Edit2Icon size={16} className={'mr-2'}/>
                    Edit Course
                  </Button>
                </Link> :
                <Link href={`/courses/${course.slug}`} className={'w-full'}>
                  <Button className={'w-full'}>
                    Enroll now for ${course.price}
                  </Button>
                </Link>
              }
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
