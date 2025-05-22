import { Button } from '@/Components/ui/button';
import { Course } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import CourseCard from '@/Components/shared/CourseCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RecentlyAddedCoursesProps {
  courses: {
    newReleases: Course[];
    mostPopular: Course[];
    topRated: Course[];
  };
  addToWishlist: (courseId: string) => void;
}

export default function RecentlyAddedCourses({ courses, addToWishlist }: RecentlyAddedCoursesProps) {
  const [activeCategory, setActiveCategory] = useState('newReleases');

  const categories = {
    newReleases: { label: 'New Releases', data: courses.newReleases },
    mostPopular: { label: 'Most Popular', data: courses.mostPopular },
    topRated: { label: 'Top Rated', data: courses.topRated }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Featured Courses</h2>
              <p className="mt-1 text-slate-600">Explore our most in-demand courses</p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.get(route('courses.index'))}
                className="rounded-full border-slate-200 text-slate-700 hover:border-orange-200 hover:text-orange-600 px-4"
              >
                View All
              </Button>
              <div className="hidden md:flex items-center space-x-1 border border-slate-200 rounded-full p-1 bg-white">
                {Object.entries(categories).map(([key, { label }]) => {
                  const isActive = activeCategory === key;
                  return (
                    <Button
                      key={key}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveCategory(key)}
                      className={cn(
                        "relative rounded-full px-3 text-xs transition-all duration-200",
                        isActive
                          ? "text-orange-100 hover:text-orange-400"
                          : "text-slate-600 hover:text-orange-600"
                      )}
                    >
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-orange-50 rounded-full shadow-sm -z-10"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories[activeCategory as keyof typeof categories].data.map((course: Course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CourseCard
                    key={course.id}
                    course={course}
                    addToWishlist={() => addToWishlist(course.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
