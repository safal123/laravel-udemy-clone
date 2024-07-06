import {Course} from "@/types";
import {Card, CardContent, CardHeader} from "@/Components/ui/card";
import {Button} from "@/Components/ui/button";
import {Link, usePage} from "@inertiajs/react";

const CourseCard = ({ course }: { course: Course }) => {
  // @ts-ignore
  const {courses} = usePage().props.auth
  const hasPurchased = courses.some((c: Course) => c.id === course.id)
  return (
    <Card>
      <CardHeader>
        <Link href={route('courses.show', course.id)}>
          <img
            src={course.image_url}
            alt={course.title}
            className={'w-full h-64 object-cover rounded-md'}
          />
        </Link>
      </CardHeader>
      <CardContent>
        <p className={'text-gray-900 text-3xl font-semibold'}>{course.title}</p>
        <div className={'flex gap-2 justify-between items-center mt-4'}>
          {!hasPurchased ?
            <>
              <Link href={route('payment.show', {
                course: course.id,
                price: course.price
              })}>
                <Button className={'mt-4'}>
                  Enroll Now for ${course.price}
                </Button>
              </Link>
              <Button className={'mt-4'} variant={'secondary'}>
                Add to Wishlist
              </Button>
            </>
            :
            <Link href={route('courses.show', course.id)}>
              <Button className={'mt-4 bg-gradient'}>
                View Course
              </Button>
            </Link>
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard;
