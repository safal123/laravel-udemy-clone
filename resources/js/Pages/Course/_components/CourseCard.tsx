import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Course } from "@/types";
import { Link } from "@inertiajs/react";


const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group h-full flex flex-col border-gray-200 dark:border-gray-700 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <Button
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          asChild
        >
          <Link href={route('courses.show', course.slug)}>
            View Details
          </Link>
        </Button>
      </div>

      <div className="relative">
        <img
          src={'/images/default-course-image.jpg'}
          alt={course.title}
          className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <CardContent className="p-4 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
          {course.title}
        </h3>

        <div className="mt-auto">
          {course.discount_price ? (
            <div className="flex items-center">
              <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">${course.discount_price}</span>
              <span className="ml-2 text-sm line-through text-gray-500">${course.price}</span>
            </div>
          ) : (
            <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">${course.price}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
