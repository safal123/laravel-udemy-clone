import {Course, User} from "@/types";
import {Card, CardContent, CardHeader} from "@/Components/ui/card";
import {Button} from "@/Components/ui/button";
import {Link, usePage} from "@inertiajs/react";
import {HeartIcon} from "lucide-react";
import {UserAvatar} from "@/Components/shared/UserAvatar";

const CourseCard = ({ course }: { course: Course }) => {
  // @ts-ignore
  const {purchased_courses} = usePage().props.auth.user || {} as Course[]
  const hasPurchased = purchased_courses?.some((c: Course) => c.id === course.id)
  return (
    <Card
      className={'shadow-xl hover:shadow-2xl transition duration-300 border-2 border-transparent hover:border-2 rounded-2xl hover:border-gray-400'}>
      <CardHeader className={'p-0'}>
        <Link href={route('courses.show', course.id)}>
          <img
            src={course.image_url}
            alt={course.title}
            className={'w-full h-64 object-cover rounded-t-xl'}
          />
        </Link>
      </CardHeader>
      <CardContent className={'mt-2 p-0'}>
        <div className={'px-4 py-4'}>
          <div className={'flex items-center justify-between'}>
            <p className={'text-gray-900 text-xl font-semibold'}>{course.title}</p>
            <span className={'text-gray-100 text-xs bg-gray-800 rounded-xl px-2 py-0.5'}>
              {course.chapters_count} Lessons | {course.duration} Hours
            </span>
          </div>
          <div className={'mt-2 flex gap-2 items-center mb-3'}>
            <UserAvatar src={''} fallback={'SP'}/>
            <div className={'flex flex-col text-sm text-yellow-700'}>
              <span>Author:</span>
              <Link href={'/'} className={'underline'}>
                {course?.author?.name || 'Safal Pokharel'}
              </Link>
            </div>
          </div>
          <div className={'mt-1'}>
            {!hasPurchased ?
              <div className={'flex items-center justify-between'}>
                <Link
                  href={route('payment.show', {
                    course: course.id,
                    price: course.price
                  })}>
                  <Button variant={'outline'} className={'font-semibold tracking-wide'}>
                    Enroll Now for ${course.price}
                  </Button>
                </Link>
                <Button className={'bg-gradient text-white ml-auto hover:text-green-400'} variant={'outline'}>
                  <HeartIcon size={24}/>
                </Button>
              </div>
              :
              <Link href={route('courses.show', course.id)}>
                <Button className={'bg-gradient'}>
                  Start Learning
                </Button>
              </Link>
            }
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard;
