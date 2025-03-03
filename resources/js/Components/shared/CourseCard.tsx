import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Link } from '@inertiajs/react'
import { BookAIcon, HeartIcon, LifeBuoyIcon, Star, Tv2Icon, Videotape } from 'lucide-react'

type CourseCardProps = {
  course: {
    id: string;
    slug: string;
    title: string;
    image_url: string;
    price: number;
    rating: number;
    is_wishlisted: boolean;
    is_purchased: boolean;
    chapters: { id: string }[];
    is_author: boolean;
  };
  addToWishlist: (course: any) => void;
};

const CourseCard = ({course, addToWishlist}: CourseCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <Link href={`/courses/${course.slug}`}>
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold">
          {course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title}
        </CardTitle>

        {/* Ratings */}
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < Math.round(5) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {4.5} ({100} ratings)
          </span>
        </div>
        <ul className="mt-4 space-y-2 text-gray-600 text-sm">
          <li className="flex items-center">
            <Videotape size={16}/>
            <span className={'ml-2'}>
              5 hours on-demand video
            </span>
          </li>
          <li className="flex items-center">
            <BookAIcon size={16}/>
            <span className={'ml-2'}>
              {course?.chapters.length} lectures
            </span>
          </li>
          <li className="flex items-center">
            <LifeBuoyIcon size={16}/>
            <span className={'ml-2'}>
              Full lifetime access
            </span>
          </li>
          <li className="flex items-center">
            <Tv2Icon size={16}/>
            <span className={'ml-2'}>
              Access on mobile and TV
            </span>
          </li>
        </ul>

        {/* Price or Purchase Status */}
        <div className="mt-4 flex justify-between items-center">
          {course.is_purchased ? (
            <span className="text-green-600 font-semibold">Purchased</span>
          ) : (
            <span className="text-lg font-semibold">${course.price}</span>
          )}

          {/* Action Buttons */}
          {!course.is_author ? <div className="flex gap-2">
              {course.is_purchased ? (
                <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                  <Button variant="outline">Continue</Button>
                </Link>
              ) : (
                <>
                  <Button
                    size={'sm'}
                    variant={course.is_wishlisted ? 'destructive' : 'default'}
                    onClick={() => addToWishlist(course)}
                  >
                    <HeartIcon size={18}/>
                  </Button>
                </>
              )}
            </div> :
            <Button>
              <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                Preview Course
              </Link>
            </Button>
          }
        </div>
        <div className={'mt-4'}>
          {!course.is_author && !course.is_purchased ?
            <Button size={'sm'} className={'w-full'}>
              <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                Enroll Now for ${course.price}
              </Link>
            </Button>:
            <Button asChild size={'sm'} variant={'outline'} className={'w-full'}>
              <Link href={`/teachers/courses/${course.id}/edit`}>
                Edit Course
              </Link>
            </Button>
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
