import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Course, PageProps } from '@/types'
import { Head, Link, usePage } from '@inertiajs/react'

export default function Dashboard({auth}: PageProps) {
  const courses = usePage<{ courses: Course[] }>().props.courses
  return (
    <DashboardLayout>
      <Head title="Student Dashboard"/>

      <div className="p-4 sm:p-8 ">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">My Courses</h2>
          </CardHeader>
          <CardContent>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
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
                  </CardHeader>
                  <CardFooter>
                    <Button>
                      Continue Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
