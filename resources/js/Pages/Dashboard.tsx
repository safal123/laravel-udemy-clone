import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course, PageProps } from '@/types'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { toast } from 'sonner'

export default function Dashboard({auth}: PageProps) {
  const courses = usePage<{ courses: Course[] }>().props.courses
  const remove = (wishlist: any) => {
    router.delete(route('wishlists.destroy', {wishlist: wishlist.id}), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Course removed from wishlist')
      },
      onError: (errors) => {
        toast.error(errors.error || 'An error occurred')
      }
    })
  }
  return (
    <DashboardLayout>
      <Head title="Student Dashboard"/>

      <div className="p-4 sm:p-8 flex flex-col space-y-4">
        <Card className={'bg-purple-50/90'}>
          <CardHeader className={'border-b'}>
            <h2 className="text-lg font-semibold">
              My Purchased Courses
            </h2>
          </CardHeader>
          <CardContent>
            {courses.length > 0 ?
              <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4'}>
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <Link href={`/courses/${course.slug}/chapters/${course.chapters[0].id}`}>
                        <img
                          src={course.image_url}
                          alt={course.title}
                          className={'w-full h-56 object-cover rounded-lg'}
                        />
                      </Link>
                      <p className={'text-lg font-semibold mt-4'}>
                        {course.title}
                      </p>
                    </CardHeader>
                    <CardFooter>
                      <Button>
                        Continue Learning
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div> :

              <div className={'mt-4 bg-green-50 text-green-800 p-4 rounded-lg'}>
                <p>No courses purchased</p>
              </div>
            }
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={'border-b'}>
            <h2 className="text-lg font-semibold">
              My Wishlist
            </h2>
          </CardHeader>
          <CardContent>
              {auth.user.wishlists.length > 0 ?
                <div className={'mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'}>
                  {auth.user.wishlists.map((wishlist) => (
                    <Card key={wishlist.course.id}>
                      <CardHeader>
                        <Link href={`/`}>
                          <img
                            src={wishlist.course.image_url}
                            alt={wishlist.course.title}
                            className={'w-full h-56 object-cover rounded-lg'}
                          />
                        </Link>
                        <p className={'text-lg font-semibold'}>
                          {wishlist.course.title}
                        </p>
                      </CardHeader>
                      <CardFooter>
                        <Button
                          onClick={() => remove(wishlist)}
                        >
                          Remove from Wishlist
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                : <div className={'mt-4'}>
                  <p>No courses in wishlist</p>
                </div>
              }
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
