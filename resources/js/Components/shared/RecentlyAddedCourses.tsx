import { Course } from "@/types";
import { Button } from "@/Components/ui/button"
import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion';
import CourseCard from "@/Components/shared/CourseCard"

interface RecentlyAddedCoursesProps {
  courses: Course[];
  addToWishlist: (courseId: string) => void;
}

export default function RecentlyAddedCourses({ courses, addToWishlist }: RecentlyAddedCoursesProps) {
  // Animation variants for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="inline-block text-sm font-medium text-orange-600 mb-2 tracking-wide">EXPAND YOUR KNOWLEDGE</div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Recently Added <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Courses</span>
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl">
              Discover our latest additions to help you master new skills and advance your career with expert-led instruction.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-slate-300 text-slate-700 hover:border-orange-300 hover:text-orange-600 px-4"
            >
              View All
            </Button>
            <div className="hidden md:flex items-center space-x-1 border border-slate-200 rounded-full p-1">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-slate-600 hover:text-orange-600 px-3 text-xs"
              >
                Most Popular
              </Button>
              <Button
                variant="default"
                size="sm"
                className="rounded-full bg-white text-slate-800 hover:bg-white shadow-sm px-3 text-xs"
              >
                New Releases
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-slate-600 hover:text-orange-600 px-3 text-xs"
              >
                Top Rated
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {courses?.map((course: Course) => (
            <motion.div
              key={course.id}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <CourseCard course={course} addToWishlist={addToWishlist} />
            </motion.div>
          ))}
        </motion.div>

        {/* "View More" button when there are many courses */}
        {courses.length > 0 && (
          <div className="mt-12 text-center">
            <Link href={"/courses"}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-slate-300 hover:border-orange-300 hover:text-orange-600 px-8"
              >
                Browse All Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
