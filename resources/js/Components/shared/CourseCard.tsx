import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Link } from '@inertiajs/react'

type CourseCardProps = {
  course: any
  addToWishlist: (course: any) => void
}

const CourseCard = ({course, addToWishlist}: CourseCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <Link href={`/courses/${course.slug}`}>
          <img src={course.image_url} alt={course.title} className="w-full h-48 object-cover rounded-t-lg"/>
        </Link>
      </CardHeader>
      <CardContent>
        <CardTitle>
          <div className={'text-lg font-semibold'}>
            {course.title.length > 50 ? course.title.substring(0, 20) + '...' : course.title}
          </div>
        </CardTitle>
        <CardDescription className={'my-2'}>
          {course.description.length > 100 ? course.description.substring(0, 100) + '...' : course.description}
        </CardDescription>
        <div className="mt-4 flex justify-between items-center">
          {!course.is_enrolled &&
            <span className="text-lg font-semibold">
              ${course.price}
            </span>
          }
          {course.is_enrolled ?
            <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
              <Button variant={'outline'}>
                Continue
              </Button>
            </Link> :
            <button
              onClick={() => addToWishlist(course)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Add to Wishlist
            </button>
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
