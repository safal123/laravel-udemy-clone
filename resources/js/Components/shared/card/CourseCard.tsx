import {Course, PageProps} from "@/types";
import {Card, CardContent, CardHeader} from "@/Components/ui/card";
import {Button} from "@/Components/ui/button";
import {Link, usePage} from "@inertiajs/react";
import {DollarSignIcon, HeartIcon, StarHalfIcon, StarIcon, User2Icon, VideoIcon} from "lucide-react";
import {UserAvatar} from "@/Components/shared/UserAvatar";

const CourseCard = ({ course }: { course: Course }) => {
  const {purchased_courses, id: userId} = usePage<PageProps>().props.auth.user || {}
  const hasPurchased = purchased_courses?.some((c: Course) => c.id === course.id)
  const isAuthor = course.author.id === userId
  const canEnroll = !hasPurchased && !isAuthor
  return (
    <Card
      className={'bg-gray-800 border-none'}>
      <CardHeader className={'p-0'}>
        <Link href={route('courses.show', course.slug)}>
          <img
            src={course.image_url}
            alt={course.title}
            className={'w-full h-64 object-cover rounded-t-lg'}
          />
        </Link>
      </CardHeader>
      <CardContent className={'p-0'}>
        <div className={'px-4 py-4'}>
          <div className={'flex items-center'}>
            {[...Array(4)].map((_, i) => <StarIcon size={16} fill={'green'} className={'text-green-500'}/>)}
            <StarHalfIcon size={16} fill={'green'} className={'text-gray-500'}/>
            <span className={'text-green-100 text-xs bg-green-500 rounded-xl px-2 py-0.5 font-semibold'}>
              {4.5}
            </span>
          </div>
          <div className={'flex items-center justify-between'}>
            <p className={'text-gray-100 text-medium font-semibold'}>
              {course.title}
            </p>
            <span className={'text-green-700 text-xs bg-green-100 rounded-xl px-2 py-0.5 font-semibold'}>
              {course.chapters_count}
              {course.chapters_count > 1 ? ' Chapters' : ' Chapter'}
            </span>
          </div>
          <div className={'mt-2 flex gap-2 items-center mb-3'}>
            <UserAvatar src={''} fallback={'SP'}/>
            <div className={'flex flex-col text-sm text-yellow-700'}>
              <span className={"text-xs"}>Author</span>
              <Link href={'/'} className={'underline'}>
                {course?.author?.name}
              </Link>
            </div>
          </div>
          <div className={'flex flex-col gap-1 mb-4'}>
            <div className={'flex items-center gap-2'}>
              <VideoIcon size={20} className={'text-gray-100'}/>
              <span className={'text-gray-100 text-xs'}>
                20 Videos
              </span>
            </div>
            <div className={'flex items-center gap-2'}>
              <User2Icon size={20} className={'text-gray-100'}/>
              <span className={'text-gray-100 text-xs'}>
                2500+ Students
              </span>
            </div>
          </div>
          <div className={'mt-1'}>
            {canEnroll ?
              <div className={'flex items-center justify-between'}>
                <Link
                  href={route('payment.show', {
                    course: course.id,
                    price: course.price
                  })}>
                  <Button
                    className={'font-semibold tracking-wide'}>
                    <DollarSignIcon size={16} className={'text-white'}/>
                    Enroll Now for ${course.price}
                  </Button>
                </Link>
                <Button>
                  <HeartIcon size={24}/>
                </Button>
              </div>
              :
              <>
                {isAuthor ?
                  <Link href={route('teachers.courses.edit', course.id)}>
                    <Button className={'bg-gradient'}>
                      Manage Course
                    </Button>
                  </Link>
                  :
                  <Link href={route('courses.show', course.id)}>
                    <Button className={'bg-gradient'}>
                      Continue Learning
                    </Button>
                  </Link>}
              </>
            }
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard;
